"use client";

import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Error types from backend
type ErrorType = "AUTH" | "SANDBOX" | "PLUGIN" | "EXECUTION" | "TIMEOUT" | "NETWORK" | "UNKNOWN";

interface ApiError {
  error: string;
  type: ErrorType;
  details?: string;
  recoverable: boolean;
}

interface TerminalLine {
  type: "input" | "output" | "error" | "system" | "warning";
  content: string;
  timestamp?: Date;
  errorType?: ErrorType;
  recoverable?: boolean;
}

type ConnectionState = "disconnected" | "authenticating" | "connecting" | "connected" | "error";

// Error message mapping for user-friendly display
const ERROR_MESSAGES: Record<ErrorType, { title: string; hint: string }> = {
  AUTH: { title: "Authentication Error", hint: "Check your password and try again." },
  SANDBOX: { title: "Sandbox Error", hint: "The sandbox session may have expired. Try reconnecting." },
  PLUGIN: { title: "Plugin Error", hint: "Some features may be unavailable." },
  EXECUTION: { title: "Execution Error", hint: "The command failed to execute." },
  TIMEOUT: { title: "Timeout", hint: "The operation took too long. Try a simpler request." },
  NETWORK: { title: "Network Error", hint: "Check your internet connection." },
  UNKNOWN: { title: "Error", hint: "Something went wrong." },
};

interface InteractiveTerminalProps {
  title?: string;
  className?: string;
  placeholder?: string;
}

export interface TerminalHandle {
  sendCommand: (command: string) => void;
  setInputAndFocus: (text: string) => void;
  reconnect: () => void;
}

const HEALTH_CHECK_INTERVAL = 30000; // 30 seconds

export const InteractiveTerminal = forwardRef<TerminalHandle, InteractiveTerminalProps>(
  ({ title = "~/sandbox", className = "", placeholder = "Type a message..." }, ref) => {
    const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected");
    const [password, setPassword] = useState("");
    const [validatedPassword, setValidatedPassword] = useState<string | null>(null);
    const [sandboxId, setSandboxId] = useState<string | null>(null);
    const [lines, setLines] = useState<TerminalLine[]>([]);
    const [currentInput, setCurrentInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [loadingTime, setLoadingTime] = useState(0);

    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Health check to verify sandbox is still alive
    useEffect(() => {
      if (connectionState !== "connected" || !sandboxId) return;

      const checkHealth = async () => {
        try {
          const response = await fetch("/api/sandbox", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "health", sandboxId }),
          });

          const data = await response.json();

          if (!data.alive) {
            setConnectionState("error");
            setSandboxId(null);
            addLine("warning", `Session expired (${data.reason || "unknown"}). Click Reconnect to start a new session.`);
          }
        } catch {
          // Network error - don't immediately disconnect, could be temporary
          console.warn("Health check failed - network issue");
        }
      };

      const intervalId = setInterval(checkHealth, HEALTH_CHECK_INTERVAL);

      return () => clearInterval(intervalId);
    }, [connectionState, sandboxId]);

    // Track loading time
    useEffect(() => {
      if (isProcessing) {
        setLoadingTime(0);
        loadingTimerRef.current = setInterval(() => {
          setLoadingTime((t) => t + 1);
        }, 1000);
      } else {
        if (loadingTimerRef.current) {
          clearInterval(loadingTimerRef.current);
          loadingTimerRef.current = null;
        }
        setLoadingTime(0);
      }
      return () => {
        if (loadingTimerRef.current) {
          clearInterval(loadingTimerRef.current);
        }
      };
    }, [isProcessing]);

    // Auto-scroll to bottom when new lines are added
    useEffect(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, [lines]);

    // Focus input when connected
    useEffect(() => {
      if (connectionState === "connected" && inputRef.current) {
        inputRef.current.focus();
      }
    }, [connectionState]);

    // Focus password input when disconnected
    useEffect(() => {
      if (connectionState === "disconnected" && passwordInputRef.current) {
        passwordInputRef.current.focus();
      }
    }, [connectionState]);

    const addLine = useCallback((type: TerminalLine["type"], content: string, errorType?: ErrorType, recoverable?: boolean) => {
      setLines((prev) => [...prev, { type, content, timestamp: new Date(), errorType, recoverable }]);
    }, []);

    // Helper to add error message with proper formatting
    const addErrorMessage = useCallback((error: string, errorType: ErrorType = "UNKNOWN", recoverable = false) => {
      const errorInfo = ERROR_MESSAGES[errorType];
      const content = recoverable
        ? `${errorInfo.title}: ${error}\n💡 ${errorInfo.hint}`
        : `${errorInfo.title}: ${error}`;

      addLine("error", content, errorType, recoverable);
    }, [addLine]);

    const handleAuthenticate = async (e?: React.FormEvent, useStoredPassword = false) => {
      e?.preventDefault();

      const authPassword = useStoredPassword ? validatedPassword : password;
      if (!authPassword?.trim()) return;

      setConnectionState("authenticating");
      setError(null);

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        const response = await fetch("/api/sandbox", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "start", password: authPassword }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        if (!response.ok) {
          const apiError = data as ApiError;
          if (apiError.type === "AUTH") {
            setError("Invalid password. Please try again.");
            setConnectionState("disconnected");
            setPassword("");
          } else {
            setError(apiError.error || "Failed to connect");
            setConnectionState("error");
          }
          return;
        }

        setSandboxId(data.sandboxId);
        setConnectionState("connected");
        setValidatedPassword(authPassword);
        addLine("system", "Connected to sandbox. Type your message and press Enter.");
        if (data.warning) {
          addLine("warning", data.warning);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          setError("Connection timed out. Please try again.");
        } else {
          setError("Network error. Please try again.");
        }
        setConnectionState("error");
      }
    };

    const sendCommand = useCallback(async (command: string) => {
      if (!command.trim() || isProcessing || !sandboxId) return;

      const input = command.trim();
      setCurrentInput("");
      setIsProcessing(true);

      // Add to history
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);

      // Add input line
      addLine("input", input);

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 150000); // 2.5 min timeout

        const response = await fetch("/api/sandbox", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "execute",
            sandboxId,
            prompt: input,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Check for non-streaming error responses
        if (!response.ok && response.headers.get("content-type")?.includes("application/json")) {
          const errorData = await response.json() as ApiError;

          if (errorData.type === "SANDBOX" && errorData.recoverable) {
            setConnectionState("error");
            setSandboxId(null);
          }

          addErrorMessage(errorData.error, errorData.type, errorData.recoverable);
          setIsProcessing(false);
          return;
        }

        // Handle streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          addErrorMessage("Failed to read response", "EXECUTION", false);
          setIsProcessing(false);
          return;
        }

        let buffer = "";
        let hasReceivedContent = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // SSE events are separated by double newlines
          const events = buffer.split("\n\n");
          buffer = events.pop() || "";

          for (const event of events) {
            const lines = event.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") continue;

                try {
                  const parsed = JSON.parse(data);
                  if (parsed.content) {
                    hasReceivedContent = true;
                    setLines((prev) => {
                      const lastMsg = prev[prev.length - 1];
                      if (lastMsg && lastMsg.type === "output") {
                        return [
                          ...prev.slice(0, -1),
                          { ...lastMsg, content: lastMsg.content + parsed.content },
                        ];
                      }
                      return [...prev, { type: "output", content: parsed.content, timestamp: new Date() }];
                    });
                  }
                  if (parsed.error) {
                    const errorType = (parsed.errorType as ErrorType) || "EXECUTION";
                    const recoverable = parsed.recoverable ?? false;

                    if (errorType === "SANDBOX") {
                      setConnectionState("error");
                      setSandboxId(null);
                    }

                    addErrorMessage(parsed.error, errorType, recoverable);
                  }
                } catch {
                  // Ignore parse errors for incomplete chunks
                }
              }
            }
          }
        }

        if (!hasReceivedContent) {
          addLine("system", "Command completed with no output.");
        }
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            addErrorMessage("Request timed out", "TIMEOUT", true);
          } else if (err.message.includes("fetch") || err.message.includes("Failed to fetch")) {
            addErrorMessage("Lost connection to server", "NETWORK", true);
            setConnectionState("error");
          } else {
            addErrorMessage(err.message, "EXECUTION", false);
          }
        } else {
          addErrorMessage("Command failed", "UNKNOWN", false);
        }
      }

      setIsProcessing(false);
    }, [isProcessing, sandboxId, addLine, addErrorMessage]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      sendCommand(currentInput);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setCurrentInput("");
        }
      }
    };

    // Set input text and focus
    const setInputAndFocus = useCallback((text: string) => {
      setCurrentInput(text);
      inputRef.current?.focus();
    }, []);

    // Reconnect after sandbox expires
    const reconnect = useCallback(() => {
      setConnectionState("disconnected");
      setSandboxId(null);
      addLine("system", "Reconnecting...");
      handleAuthenticate(undefined, true);
    }, [validatedPassword]);

    // Copy text to clipboard
    const copyToClipboard = useCallback(async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        addLine("system", "Copied to clipboard");
      } catch {
        addLine("error", "Failed to copy to clipboard");
      }
    }, [addLine]);

    // Download text as file
    const downloadAsFile = useCallback((text: string, filename = "output.txt") => {
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, []);

    // Retry a command
    const retryCommand = useCallback((command: string) => {
      sendCommand(command);
    }, [sendCommand]);

    const handleDisconnect = async () => {
      if (sandboxId) {
        try {
          await fetch("/api/sandbox", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "stop", sandboxId }),
          });
        } catch {
          // Ignore errors on disconnect
        }
      }
      setSandboxId(null);
      setConnectionState("disconnected");
      setLines([]);
      setPassword("");
      setValidatedPassword(null);
      setError(null);
    };

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
      sendCommand,
      setInputAndFocus,
      reconnect,
    }));

    // Get loading message based on time elapsed
    const getLoadingMessage = () => {
      if (loadingTime < 3) return "Processing";
      if (loadingTime < 10) return `Working on it... ${loadingTime}s`;
      if (loadingTime < 30) return `Still thinking... ${loadingTime}s`;
      return `Taking a while... ${loadingTime}s`;
    };

    return (
      <motion.div
        className={`bg-[#faf8f5] border border-stone-200 rounded-lg overflow-hidden font-mono ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-stone-100/50 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                connectionState === "connected"
                  ? "bg-green-500"
                  : connectionState === "authenticating" || connectionState === "connecting"
                  ? "bg-yellow-500 animate-pulse"
                  : connectionState === "error"
                  ? "bg-red-500"
                  : "bg-stone-300"
              }`}
            />
            <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
            <span className="ml-3 text-xs text-stone-400">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            {connectionState === "connected" && (
              <span className="text-xs text-green-600">● connected</span>
            )}
            {connectionState === "error" && (
              <span className="text-xs text-red-500">● disconnected</span>
            )}
            {connectionState === "connected" && (
              <button
                onClick={handleDisconnect}
                className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
              >
                Disconnect
              </button>
            )}
          </div>
        </div>

        {/* Terminal content */}
        <div className="h-[400px] flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {connectionState === "disconnected" || connectionState === "authenticating" ? (
              <motion.div
                key="auth"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-8"
              >
                <div className="text-center mb-6">
                  <h3 className="text-stone-700 font-medium mb-2">Sandbox Access</h3>
                  <p className="text-stone-500 text-sm">Enter password to connect</p>
                </div>

                <form onSubmit={handleAuthenticate} className="w-full max-w-xs">
                  <input
                    ref={passwordInputRef}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    disabled={connectionState === "authenticating"}
                    className="w-full px-4 py-2 bg-white border border-stone-200 rounded-lg text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 disabled:opacity-50"
                  />

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 text-center"
                    >
                      {error}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={connectionState === "authenticating" || !password.trim()}
                    className="w-full mt-4 px-4 py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {connectionState === "authenticating" ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          Connecting
                        </motion.span>
                        <span className="inline-flex">
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                          >
                            .
                          </motion.span>
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                          >
                            .
                          </motion.span>
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                          >
                            .
                          </motion.span>
                        </span>
                      </span>
                    ) : (
                      "Connect"
                    )}
                  </button>
                </form>
              </motion.div>
            ) : connectionState === "error" ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-8"
              >
                <div className="text-center mb-6">
                  <h3 className="text-red-600 font-medium mb-2">Connection Error</h3>
                  <p className="text-stone-500 text-sm">{error || "Session disconnected"}</p>
                </div>
                <div className="flex gap-2">
                  {validatedPassword && (
                    <button
                      onClick={reconnect}
                      className="px-4 py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-800 transition-colors"
                    >
                      Reconnect
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setConnectionState("disconnected");
                      setError(null);
                      setLines([]);
                    }}
                    className="px-4 py-2 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors"
                  >
                    {validatedPassword ? "New Session" : "Try Again"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="terminal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col min-h-0"
              >
                {/* Output area - scrolls independently */}
                <div ref={terminalRef} className="flex-1 overflow-y-auto min-h-0 p-4 space-y-1">
                  {lines.map((line, i) => (
                    <div
                      key={i}
                      className={`group relative text-sm ${
                        line.type === "input"
                          ? "text-stone-600"
                          : line.type === "error"
                          ? "text-red-500"
                          : line.type === "warning"
                          ? "text-amber-600"
                          : line.type === "system"
                          ? "text-stone-400 italic"
                          : "text-stone-700"
                      }`}
                    >
                      <div className="flex">
                        <div className="flex-1 min-w-0 pr-2">
                          {line.type === "input" && <span className="text-stone-400 mr-2">$</span>}
                          {line.type === "output" && <span className="text-stone-300 mr-2">&gt;</span>}
                          {line.type === "error" && <span className="mr-2">✗</span>}
                          {line.type === "warning" && <span className="mr-2">⚠</span>}
                          <span className="whitespace-pre-wrap break-words">{line.content}</span>
                        </div>

                        {/* Action buttons on hover */}
                        <div className="sticky top-0 self-start hidden group-hover:flex items-center gap-1 bg-stone-100/95 border border-stone-200 rounded px-1.5 py-1 shadow-sm z-10 shrink-0">
                          {/* Copy button */}
                          <button
                            onClick={() => copyToClipboard(line.content)}
                            className="p-1 text-stone-400 hover:text-stone-600 transition-colors"
                            title="Copy"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>

                          {/* Retry button - input messages only */}
                          {line.type === "input" && (
                            <button
                              onClick={() => retryCommand(line.content)}
                              className="p-1 text-stone-400 hover:text-stone-600 transition-colors"
                              title="Retry"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            </button>
                          )}

                          {/* Download button - output and error messages */}
                          {(line.type === "output" || line.type === "error") && line.content.length > 50 && (
                            <button
                              onClick={() => downloadAsFile(line.content, `${line.type}-${Date.now()}.txt`)}
                              className="p-1 text-stone-400 hover:text-stone-600 transition-colors"
                              title="Download"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isProcessing && (
                    <div className="text-sm text-stone-400 flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>{getLoadingMessage()}</span>
                      {loadingTime >= 5 && (
                        <span className="text-xs text-stone-300">(Claude is working)</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Input area */}
                <form onSubmit={handleSubmit} className="border-t border-stone-200 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400 text-sm">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={placeholder}
                      disabled={isProcessing}
                      className="flex-1 bg-transparent text-sm text-stone-700 placeholder-stone-400 focus:outline-none disabled:opacity-50"
                    />
                    <motion.span
                      className="w-2 h-4 bg-stone-400"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }
);

InteractiveTerminal.displayName = "InteractiveTerminal";
