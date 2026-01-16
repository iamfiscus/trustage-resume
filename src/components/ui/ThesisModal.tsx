"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ThesisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const thesisContent = `# The Trust Moat in an AI-First Insurance Future

**JD Fiscus**
*Director of Research & Development*

---

## The Contrarian View

Everyone in insurance innovation is asking the same question: *How do we deploy AI faster?*

I believe this is the wrong question.

The right question is: *How do we deploy AI in ways that deepen customer trust?*

In a world where every carrier will have access to the same foundation models, the same automation platforms, and the same predictive capabilities, technology becomes table stakes. The sustainable competitive advantage isn't who adopts AI first—it's who earns the right to use customer data in increasingly intimate ways.

**Trust is the moat.**

---

## The Technology Landscape: What's Coming

Having worked across healthcare, insurance, startups, and enterprise consulting, I've observed technology waves from multiple vantage points. The next decade will bring simultaneous disruptions:

**Generative AI & Agentic Systems**
We're moving from AI as a tool to AI as an actor. Agentic commerce—where AI agents negotiate, purchase, and manage on behalf of customers—will fundamentally reshape distribution. Customers won't compare quotes; their agents will. The question becomes: which carriers will those agents trust?

**Edge Intelligence (WebAI)**
AI computation is moving to the edge—browsers, devices, and local environments. This enables real-time, privacy-preserving intelligence. Customers can receive personalized guidance without surrendering their data to centralized systems. Carriers who master this will offer better experiences with *less* data exposure.

**Embedded & Contextual Insurance**
Insurance will increasingly be invisible—woven into the moments of need rather than sold as standalone products. Buying a home, booking travel, joining the gig economy. The carrier that earns ecosystem trust becomes the default.

**Predictive Prevention**
The shift from indemnification to prevention accelerates. IoT, telematics, and behavioral data enable carriers to help customers avoid losses, not just pay for them. But this requires customers to share intimate data about their homes, vehicles, and health. They'll only do this with carriers they trust.

---

## Why Trust Becomes the Strategic Differentiator

Here's the paradox: the more powerful AI becomes, the more trust matters.

**Data access is permission-based.** The carriers with the richest behavioral data will build the best models. But customers grant data access based on trust—not technology prowess.

**Algorithmic decisions demand transparency.** As AI makes or influences underwriting, claims, and pricing decisions, regulators and customers will demand explainability. Carriers who treat this as a compliance burden will lose to those who see it as a trust-building opportunity.

**Human moments still matter.** When a customer's home floods or a family member dies, they don't want to interact with an optimized chatbot. They want empathy. The carriers who preserve human connection at critical moments will differentiate.

**Mistakes are amplified.** One viral story of AI denying a legitimate claim can undo years of brand building. Responsible innovation isn't just ethical—it's strategic.

---

## A Three Horizons Framework for Trust-Centered Innovation

### Horizon 1: Trust-Preserving Efficiency (0-2 years)
Deploy AI to improve operations while *increasing* transparency. Automate back-office processes, accelerate claims, enhance underwriting—but give customers visibility into how decisions are made. Build trust through speed *and* explainability.

**Example initiatives:**
- Explainable AI dashboards for claims decisions
- Real-time status transparency for customers
- AI-assisted (not AI-replaced) customer service

### Horizon 2: Trust-Enabled Personalization (2-5 years)
Earn the right to deeper personalization through demonstrated trustworthiness. Customers who trust us will share more data, enabling better products, fairer pricing, and preventive services.

**Example initiatives:**
- Opt-in behavioral data programs with clear value exchange
- Privacy-preserving edge AI for sensitive use cases
- Partnerships with trusted ecosystem players (healthcare, financial planning)

### Horizon 3: Trust as Platform (5-10 years)
Become the trusted infrastructure layer for agentic commerce and embedded insurance. When AI agents negotiate on behalf of customers, they'll route to carriers with established trust credentials.

**Example initiatives:**
- Machine-readable trust certifications for AI agents
- Open APIs that demonstrate responsible data practices
- Industry consortia for ethical AI standards

---

## Why I'm the Right Leader for This

My career has been an unusual combination that prepares me for this moment:

**AI/ML depth with business translation.** I've built and deployed machine learning systems that delivered measurable outcomes—not just technical demonstrations. I understand both the capabilities and the limitations.

**Healthcare and insurance domain expertise.** These regulated industries share a core challenge: using data to serve customers while navigating complex compliance requirements. I've learned that constraints drive creativity.

**Startup speed meets enterprise scale.** At startups, I learned to run rapid experiments and kill ideas fast. At Accenture, I learned to scale innovation across complex organizations. Both muscles matter for R&D leadership.

**Innovation pipeline builder.** I've created systematic approaches to evaluate emerging technologies, run proof-of-concepts, and transition successful pilots to production. Innovation isn't magic—it's process.

---

## The Opportunity at TruStage

TruStage's mission—making a brighter financial future accessible to everyone—is fundamentally about trust. You serve credit unions and their members, organizations built on member relationships, not transactional efficiency.

This creates a unique opportunity. While competitors race to automate, TruStage can lead on *responsible* automation. While others extract maximum data, TruStage can demonstrate data stewardship. While the industry optimizes for efficiency, TruStage can optimize for member trust.

The technology will evolve. The carriers who earn trust will compound their advantages with each wave.

I want to help build that future.

---

*This thesis reflects my current perspective and would evolve through deeper engagement with TruStage's strategic priorities, customer research, and team insights.*`;

function parseMarkdown(content: string) {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let inList = false;

  lines.forEach((line, index) => {
    // Headers
    if (line.startsWith('# ')) {
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4 ml-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      elements.push(
        <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
          {line.replace('# ', '')}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4 ml-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      elements.push(
        <h2 key={index} className="text-2xl font-semibold text-gray-900 mt-8 mb-4 first:mt-0">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4 ml-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      elements.push(
        <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          {line.replace('### ', '')}
        </h3>
      );
    }
    // Horizontal rule
    else if (line.trim() === '---') {
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4 ml-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      elements.push(<hr key={index} className="my-6 border-gray-300" />);
    }
    // List items
    else if (line.trim().startsWith('- ')) {
      inList = true;
      currentList.push(line.replace('- ', '').trim());
    }
    // Bold text
    else if (line.includes('**')) {
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4 ml-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      const parts = line.split(/(\*\*.*?\*\*)/);
      const formatted = parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      });
      elements.push(
        <p key={index} className="text-gray-700 mb-4 leading-relaxed">
          {formatted}
        </p>
      );
    }
    // Italic text (lines starting with *)
    else if (line.trim().startsWith('*') && line.trim().endsWith('*') && line.trim().length > 2) {
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4 ml-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      elements.push(
        <p key={index} className="text-gray-600 italic mb-4">
          {line.replace(/^\*|\*$/g, '')}
        </p>
      );
    }
    // Regular paragraphs
    else if (line.trim()) {
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4 ml-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      // Check for inline bold/italic
      if (line.includes('**') || line.includes('*')) {
        const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/);
        const formatted = parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
            return <em key={i} className="italic">{part.slice(1, -1)}</em>;
          }
          return <span key={i}>{part}</span>;
        });
        elements.push(
          <p key={index} className="text-gray-700 mb-4 leading-relaxed">
            {formatted}
          </p>
        );
      } else {
        elements.push(
          <p key={index} className="text-gray-700 mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
    }
    // Empty lines
    else {
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4 ml-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
    }
  });

  // Handle any remaining list
  if (inList && currentList.length > 0) {
    elements.push(
      <ul key="final-list" className="list-disc list-inside space-y-1 mb-4 ml-4">
        {currentList.map((item, i) => (
          <li key={i} className="text-gray-700">{item}</li>
        ))}
      </ul>
    );
  }

  return elements;
}

export function ThesisModal({ isOpen, onClose }: ThesisModalProps) {
  const [content, setContent] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (isOpen) {
      setContent(parseMarkdown(thesisContent));
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-10 bg-white rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Personal Innovation Thesis</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6 md:p-8">
              <div className="max-w-3xl mx-auto prose prose-sm">
                {content}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
