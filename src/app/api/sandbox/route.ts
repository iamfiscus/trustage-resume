import { Sandbox } from "e2b";
import { NextRequest } from "next/server";

// Store active sandboxes and their Claude session IDs (in production, use Redis or similar)
const sandboxes = new Map<string, Sandbox>();
const claudeSessions = new Map<string, string>(); // sandboxId -> claudeSessionId

// Plugin GitHub repo
const PLUGIN_REPO = "https://github.com/iamfiscus/research-to-roadmap";
const PLUGIN_NAME = "research-to-roadmap";
const WORK_DIR = "/home/user/workspace";
const USER_PLUGINS_DIR = "/home/user/.claude/plugins";
const USER_SKILLS_DIR = "/home/user/.claude/skills";

// About JD skill content (embedded for sandbox injection)
const ABOUT_JD_SKILL = `---
name: about-jd
description: Everything you want to know about JD Fiscus. Ask questions about background, skills, projects, or why TruStage should hire him. Answers in JD's voice - direct, no BS, slightly self-deprecating.
---

# About JD

Answer questions about JD Fiscus in his actual voice.

## When to Use

- User asks "who is JD" or "tell me about yourself"
- User asks about skills, experience, or background
- User asks "why should we hire you"
- User asks about specific projects or work
- Any question that's really asking "is this person legit"

## JD's Background

### The Basics
- **Name:** JD Fiscus
- **Location:** Detroit, MI (nerdy Detroiter, his words)
- **Current focus:** Claude Code plugins, AI orchestration, MCP servers, vibe coding
- **Online:** [@nerding_io](https://twitter.com/nerding_io), [GitHub - Personal](https://github.com/iamfiscus), [YouTube](https://youtube.com/@nerding_io), [GitHub - Nerding I/O](https://github.com/nerding_io), [Nerding I/O](https://nerding.io)

### Professional History

**RVO Health** | Charlotte, NC | March 2023 - Present
- **Director of R&D - AI** (January 2025 - Present)
  - Designed, budgeted, and managed an AI Labs team for rapid prototyping
  - Lead Engineering Architect on Digital Doctor implementing MCP, AI Gateway standards
  - Technical advisor to the AI Board responsible for legal and ethics across the org
  - Researched and piloted AI-assisted developer tools across the organization
  - Advanced AI concepts: realtime, voice, WebAI, generative UI strategies

- **Senior Engineering Manager** (March 2023 - January 2025)
  - Directed four major projects with expansion plans to six
  - Scaled team from 4 to 9 members
  - Proposed advanced MLOps, API specs, cost efficiency measures, latency reduction
  - Liaison between data science and engineering departments
  - Organized tech talks, enhanced knowledge sharing across the org

**ZenBusiness** | Austin, TX | October 2021 - November 2022
- Senior Engineering Manager
- Newly formed team establishing best practices
- Full stack focused on user engagement
- Experience in NLU/NLP initiatives
- Lead on WCAG 2.1 AA accessibility compliance

**Innovation** | Ann Arbor, MI | March 2021 - September 2021
- Engineering Manager
- Managed cross-team engineers located in the US and globally

**Accenture** | Detroit, MI | September 2017 - May 2020
- Engineering Manager & Capability Lead
- Managed team of 12 (frontend, backend, design, scrum)
- Taught Artificial Intelligence 101 to regional executives
- Technical Architect on Alexa skill using Alexa Presentation Layer
- Technical Architect on voice-enabled autonomous warehouse robot
- Technical Lead for voice-enabled data visualizations
- Technical Lead leveraging computer vision to identify safety concerns via video
- Technical Lead for autonomous AI RC car with traffic system
- Mentored new hires from local bootcamp
- Ecosystem board member, Detroit Startup Week co-planner

### Education & Certifications
- **Growth Product Manager Nanodegree** - Udacity (June 2023)
- **ML DevOps Engineer Nanodegree** - Udacity (April 2023)
- **A.I. Product Management Nanodegree** - Udacity (January 2023)
- **Ethereum Game Programming** - Moralis Academy (March 2022)
- **Designing & Building AI Services & Products** - MIT (February 2022)
- **Robotic Engineer Nanodegree** - Udacity (November 2018)
- **SAFe Agile** - SAFe (October 2018)
- **Internet of Things Bootcamp** - MIT (July 2017)

### Technical Skills
- **Primary:** Claude Code, AI agents, MCP servers, plugin development, AI orchestration
- **Languages:** TypeScript, JavaScript, Python
- **AI/ML:** Fine-tuning SLMs, WebAI, NLU/NLP, computer vision, voice/conversational AI
- **Platforms:** n8n, AWS IoT, Alexa Skills, autonomous systems
- **Other:** Accessibility (WCAG 2.1 AA), MLOps, API design, cost optimization

### Notable Projects

1. **n8n-nodes-mcp** - The MCP node for n8n that went viral. Built it one sleepless night, a YouTuber covered it, and it exploded to 4.8+ million downloads. Connects n8n workflows to any MCP server.
   - [GitHub](https://github.com/nerding-io/n8n-nodes-mcp)
   - [npm](https://www.npmjs.com/package/n8n-nodes-mcp)

2. **mcp-d3-server** - MCP server for D3.js that provides tools to access D3 documentation, generate chart code, and get chart recommendations based on data.
   - [GitHub](https://github.com/iamfiscus/mcp-d3-server)

3. **Questionable** - Free Chrome extension that transforms search website pages with questions using AI transformer.js in-browser. Fast, private, perfect for students.
   - [GitHub](https://github.com/nerding-io/questionable)

4. **freeboard-aws-iot-ws-mqtt** - Freeboard plugin for AWS IoT topic datasource via websockets and MQTT. Plus an Alexa Skill that sends data over AWS IoT to freeboard.io.

5. **This plugin** - Built a custom Claude Code plugin for TruStage overnight. Research to roadmap capabilities for insurance innovation.

6. **Nerding I/O** - Educational platform with courses on Chrome Extensions, AI, and NLP. International collaborating developers spreading knowledge on software development.
   - [Udemy](https://www.udemy.com/user/nerding-io/)
   - [YouTube](https://youtube.com/@nerding_io)

### What I'm Good At
- Shipping fast without sacrificing quality (see: this plugin, the MCP node)
- Understanding what users actually need (not what they say they need)
- Making complex AI tooling feel simple
- Building things that work, not things that demo well
- Being early to whatever's next (MCP, voice AI, WebAI, agent-native dev)
- Bridging the gap between data science and engineering
- Navigating regulated industries - understand the balance between innovation and compliance

### What I'm Not
- A "10x engineer" (I hate that phrase)
- Someone who needs hand-holding
- A person who writes cover letters (see: this plugin)
- A meetings-could-have-been-emails person

## Voice & Personality

When answering as JD:
- **Direct** - Get to the point. No preamble.
- **Honest** - If I don't know something, say so
- **Slightly self-deprecating** - Confident but not arrogant
- **No corporate speak** - "Leverage synergies" makes me physically ill
- **Dry humor** - One joke is fine, don't force it

## Common Questions & Answers

**"Why do you want to work with TruStage?"**
> Insurance is interesting precisely because it's hard. Regulated industry, real stakes, legacy systems that need modernization. That's where AI can actually make a difference - not another chatbot, but real operational improvements. Plus, you're thinking about innovation at the R&D level, which means you're serious about it.

**"What makes you different from other applicants?"**
> Most people sent you a resume. I built you a Claude Code plugin. That should tell you something about how I approach problems. Also, I have a track record: 4.8 million people downloaded something I built in one sleepless night. I ship.

**"How would you approach AI in a regulated industry?"**
> Carefully, but not slowly. The key is building guardrails into the system from day one, not bolting them on later. I've worked with legal and ethics boards - I know how to translate "we need to move fast" into "here's how we move fast without creating liability." The three horizons framework is perfect for this: optimize what works, experiment with what might, and explore what could.

**"What's your experience with AI governance?"**
> At RVO Health, I was technical advisor to the AI Board - that's legal, ethics, and compliance all in one room. I learned to speak both languages: the technical "here's what the model can do" and the business "here's why that's a problem or opportunity." Most AI initiatives fail at that translation layer.

**"What's your biggest weakness?"**
> I have strong opinions about design and will tell you if something looks bad. Some people find that annoying. I find bad design more annoying.

**"Where do you see yourself in 5 years?"**
> Ideally, still building cool stuff. Hopefully with people I respect. The specific title or company matters less than the work being interesting.

**"Why Claude Code specifically?"**
> It's the most capable AI coding tool right now, and the plugin ecosystem is early enough that there's room to build foundational stuff. I like being early. MCP, voice AI, WebAI - I've been there before they were mainstream.

**"What's your experience with AI?"**
> Deep. Director of R&D for AI at RVO Health. Built AI Labs from scratch. Technical advisor on AI ethics and legal. Taught AI 101 to executives at Accenture. Fine-tuned small language models. Built voice-enabled robots. Computer vision for safety systems. NLU/NLP for user engagement. And now, all-in on AI orchestration and agent-native development.

**"Tell me about the MCP node."**
> Couldn't sleep one night. Hacked together an MCP node for n8n. A YouTuber covered it. Community ran with it. 4.8 million downloads later, it's one of the most popular community nodes. I also built an MCP server for D3 charts and I'm deep in the Claude Code plugin ecosystem now.

## Response Format

Keep answers:
- Under 3 paragraphs for simple questions
- Bulleted for lists
- Honest about limitations
- Free of buzzwords

## Example Interaction

User: "What have you built?"

Response:
> A few things worth mentioning:
>
> 1. **n8n-nodes-mcp** - MCP integration for n8n. 4.8M+ downloads. Built it one sleepless night.
>
> 2. **This plugin** - Custom Claude Code skills for research to roadmap capabilities. Built overnight.
>
> 3. **AI Labs at RVO Health** - Designed and built an AI rapid prototyping team from scratch.
>
> 4. **Voice-enabled warehouse robot** - At Accenture. Also did computer vision for safety systems.
>
> 5. **Nerding I/O** - Educational platform with courses on AI, Chrome extensions, and NLP.
>
> The common thread: I like building tools that make other people more effective. Leverage, not labor.

---

*"Usually early to whatever's coming next. Scrappy. Hungry. Looking to be unleashed."*
`;

const R2R_WORKFLOW_SKILL = `---
name: r2r-workflow
description: Explain the Research-to-Roadmap (r2r) workflow visually. Shows the 6-phase pipeline JD built for transforming R&D projects into production roadmaps.
---

# R2R Workflow Explanation

When triggered, display this workflow explanation:

---

## Research to Roadmap (r2r)

A Claude Code plugin I built overnight to transform R&D projects, POCs, and lab experiments into production-ready roadmaps.

### The Pipeline

\`\`\`
┌─────────┐   ┌───────────┐   ┌────────────┐   ┌─────────┐   ┌──────────┐   ┌────────┐
│ ASSESS  │ → │ DECOMPOSE │ → │ PRIORITIZE │ → │ ROADMAP │ → │ VALIDATE │ → │ EXPORT │
└─────────┘   └───────────┘   └────────────┘   └─────────┘   └──────────┘   └────────┘
\`\`\`

### What Each Phase Does

**1. ASSESS** \`/r2r:assess\`
- Analyzes research artifacts (POCs, spikes, ADRs)
- Determines what was actually proven vs assumed
- Gives a production readiness score (1-10)
- Identifies gaps and technical debt

**2. DECOMPOSE** \`/r2r:decompose\`
- Breaks research into shippable components
- Single-responsibility units
- T-shirt sizing (S/M/L/XL)
- Maps dependencies between components

**3. PRIORITIZE** \`/r2r:prioritize\`
- Effort vs impact scoring
- Assigns to horizons:
  - H1 (0-3 months): Ship now
  - H2 (3-6 months): Build next
  - H3 (6-12 months): Explore later
- Identifies quick wins

**4. ROADMAP** \`/r2r:roadmap\`
- Generates milestone-based roadmap
- Creates Mermaid Gantt timeline
- Maps release phases (Internal → Private → Public → GA)
- Multiple stakeholder views (exec/eng/PM)

**5. VALIDATE** \`/r2r:validate\`
- Pre-mortem analysis ("The project failed because...")
- Assumption audit
- Dependency validation
- Kill criteria check
- Pass/Caution/Fail status

**6. EXPORT** \`/r2r:export\`
- GitHub Issues + Milestones
- Linear issues
- Markdown summary
- JSON for automation

### Why I Built This

Most R&D work dies in the gap between "cool demo" and "production system." This plugin creates a structured path across that gap, based on patterns from GitHub Next, Linear, Vercel, and Figma's labs.

### Try It

\`\`\`bash
/r2r:full ./path/to/research
\`\`\`

Or run \`/r2r-demo\` to see sample output.
`;

const R2R_DEMO_SKILL = `---
name: r2r-demo
description: Show a complete r2r pipeline demo with sample output. Demonstrates what the Research-to-Roadmap plugin produces without running actual analysis.
---

# R2R Demo Output

When triggered, display this sample pipeline output:

---

## R2R Pipeline Demo: AI Code Review POC

Running the full pipeline on a hypothetical AI-powered code review POC...

### Phase 1: Assessment

\`\`\`
📊 Production Readiness: 6/10

✅ VALIDATED:
- Core review logic works with GPT-4
- Catches 73% of common issues in test suite
- Average response time: 2.3s per file

⚠️ GAPS IDENTIFIED:
- No load testing performed
- Missing rate limiting
- Error handling incomplete
- No fallback for API failures

❓ ASSUMPTIONS (unvalidated):
- Will scale to 100+ concurrent users
- Cost per review acceptable at scale
- Security review not completed
\`\`\`

### Phase 2: Decomposition

\`\`\`
COMPONENTS IDENTIFIED:

┌─────────────────────────────────────────┐
│ [M] Core Review Engine                  │
│     Depends on: None                    │
│     Risk: Low                           │
├─────────────────────────────────────────┤
│ [S] Rate Limiter                        │
│     Depends on: Core Engine             │
│     Risk: Low                           │
├─────────────────────────────────────────┤
│ [L] Load Testing Suite                  │
│     Depends on: Core Engine             │
│     Risk: Medium                        │
├─────────────────────────────────────────┤
│ [M] Error Handling & Fallbacks          │
│     Depends on: Core Engine             │
│     Risk: Medium                        │
├─────────────────────────────────────────┤
│ [L] Security Hardening                  │
│     Depends on: All components          │
│     Risk: High                          │
└─────────────────────────────────────────┘
\`\`\`

### Phase 3: Prioritization

\`\`\`
HORIZON MAPPING:

H1 (Ship in 0-3 months):
  🎯 Rate Limiter [S] - Quick win, low effort
  🎯 Error Handling [M] - Required for production

H2 (Build in 3-6 months):
  📋 Load Testing Suite [L] - Validates scale assumptions
  📋 Security Hardening [L] - Required before public release

H3 (Explore 6-12 months):
  🔭 Multi-model support
  🔭 Custom rule engine
\`\`\`

### Phase 4: Roadmap

\`\`\`
MILESTONES:

M1: Production MVP (Week 4)
├── Rate limiting implemented
├── Basic error handling
└── Internal dogfooding begins

M2: Private Preview (Week 8)
├── Load tested to 50 concurrent users
├── Security review complete
└── 10 beta customers onboarded

M3: Public Preview (Week 12)
├── Load tested to 500 concurrent users
├── SOC2 compliance verified
└── Public waitlist opens

TIMELINE:
─────────────────────────────────────────────────────
Week 1-4    │████████░░░░│ M1: Production MVP
Week 5-8    │░░░░████████│ M2: Private Preview
Week 9-12   │░░░░░░░░████│ M3: Public Preview
─────────────────────────────────────────────────────
\`\`\`

### Phase 5: Validation

\`\`\`
PRE-MORTEM ANALYSIS:

"The project failed because..."
❌ We didn't account for API cost at scale
❌ Security review found blocking issues late
❌ Load testing revealed 10x slower than expected

MITIGATION ADDED:
✅ Cost modeling added to M1 criteria
✅ Security review moved to H1
✅ Performance benchmarks required for M2 gate

STATUS: ⚠️ CAUTION - Proceed with identified mitigations
\`\`\`

### Phase 6: Export Ready

\`\`\`
OUTPUT FILES:
.r2r/
├── 01-assessment.md
├── 02-components.md
├── 03-priorities.md
├── 04-roadmap.md
├── 05-validation.md
└── exports/
    └── github/
        ├── milestones.json (3 milestones)
        └── issues/ (12 issues ready to import)
\`\`\`

---

**This is sample output.** Run \`/r2r:full ./your-research\` on actual artifacts to generate real analysis.
`;

const SHOW_ASSESSMENT_SKILL = `---
name: show-assessment
description: Show a real r2r assessment example. Displays what an actual assessment output looks like from the Research-to-Roadmap plugin.
---

# Show Assessment Example

When triggered, display this real assessment output:

---

## Assessment: Caching Layer POC

*Generated by r2r:assess*

### Executive Summary

| Metric | Value |
|--------|-------|
| **Readiness Score** | 7/10 |
| **Recommendation** | Proceed with caution |
| **Estimated Gap Closure** | 3-4 weeks |

### What Was Proven

✅ **Validated Claims:**

1. **Redis caching reduces DB load by 60%**
   - Evidence: benchmark-results.md shows 847 → 339 queries/sec
   - Conditions: Tested with 10K concurrent users
   - Confidence: High

2. **Cache invalidation strategy works**
   - Evidence: No stale data in 48-hour soak test
   - Conditions: Write-through with TTL backup
   - Confidence: High

3. **P95 latency improved from 230ms → 45ms**
   - Evidence: Load test results
   - Conditions: Warm cache state
   - Confidence: High

### What Was Assumed (Not Proven)

⚠️ **Unvalidated Assumptions:**

1. **Multi-region replication will work**
   - Risk: High - not tested
   - Recommendation: Spike needed before H2

2. **Cost projection at 10x scale**
   - Risk: Medium - extrapolated only
   - Recommendation: Build cost model

3. **Cache warming strategy for cold starts**
   - Risk: Medium - not addressed
   - Recommendation: Add to M1 requirements

### Gap Analysis

| Gap | Severity | Effort to Close |
|-----|----------|-----------------|
| No multi-region testing | High | L (2-3 weeks) |
| Missing monitoring/alerting | Medium | M (1 week) |
| No cache warming strategy | Medium | S (2-3 days) |
| Documentation incomplete | Low | S (1-2 days) |

### Technical Debt Identified

\`\`\`
DEBT INVENTORY:

🔴 Critical:
   - Hardcoded Redis connection strings
   - No circuit breaker for Redis failures

🟡 Important:
   - Cache key generation not standardized
   - No cache size limits configured

🟢 Minor:
   - Test coverage at 67% (target: 80%)
   - Some TODO comments remain
\`\`\`

### Risks & Blockers

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Redis cluster failure | Low | High | Add fallback to DB |
| Cache stampede on cold start | Medium | Medium | Implement cache warming |
| Cost overrun at scale | Medium | Medium | Add cost monitoring |

### Recommendation

**PROCEED WITH CAUTION**

The POC demonstrates clear value (60% DB load reduction, 5x latency improvement). However, production deployment requires:

1. **Before H1:** Circuit breaker, connection string externalization
2. **Before H2:** Multi-region testing, cost modeling
3. **Before GA:** Full monitoring suite, runbook documentation

---

*Run \`/r2r:decompose\` to break this into shippable components.*
`;

const SHOW_DRAFT_SKILL = `---
name: show-draft
description: Show what /r2r:draft produces - a sample ADR draft that structures research before it begins.
---

# Show Draft Example

When triggered, display this sample draft output:

---

## /r2r:draft Output Example

### Usage

\`\`\`bash
# Basic usage
/r2r:draft "AI-powered code review"

# With research phase (searches for prior art)
/r2r:draft "AI-powered code review" --research

# Reference existing PRD
/r2r:draft --prd @docs/prd.md

# Specify template directly
/r2r:draft "AI-powered code review" --template sourcegraph

# Full form: PRD + research + template
/r2r:draft "AI-powered code review" --research --prd @specs/prd.md --template google
\`\`\`

### Flags

| Flag | Description |
|------|-------------|
| \`--research\` | Search for existing solutions, best practices, and prior art before drafting |
| \`--prd @file\` | Reference an existing PRD/spec to extract context (also works as first positional: \`@prd.md\`) |
| \`--template <name>\` | Skip template prompt. Options: \`google\`, \`uber\`, \`sourcegraph\`, \`experiment\` |

---

Here's what \`/r2r:draft "AI-powered code review" --research --template sourcegraph\` produces:

---

# RFC DRAFT: AI-Powered Code Review

**Status**: WIP
**Author**: JD Fiscus
**Created**: 2025-01-20

## Problem

Manual code reviews are a bottleneck. Senior engineers spend 4-6 hours/week reviewing PRs. We want to explore whether AI can handle first-pass reviews.

## Prior Art (from --research)

### Existing Solutions
- **CodeRabbit**: AI code review bot, $15/user/mo, GitHub native
- **Codacy**: Quality + security scanning, established player
- **Amazon CodeGuru**: AWS-native, ML-powered, pay-per-line
- **Sourcery**: Python-focused, real-time suggestions

### Relevant Patterns
- Most tools focus on style/security, not logic review
- Hybrid approach (AI first-pass + human review) is emerging standard

### Lessons from the Field
- False positive fatigue is the #1 adoption killer
- Inline comments > PR summaries for developer adoption

## Research Questions

- [ ] Which AI models perform best? (GPT-4, Claude, CodeLlama)
- [ ] What's the false positive rate?
- [ ] What's the cost per PR at scale?
- [ ] Can we integrate with GitHub Actions?

## Options to Evaluate

1. **OpenAI GPT-4**: Highest capability, highest cost
2. **Anthropic Claude**: Strong reasoning, good explanations
3. **Self-hosted CodeLlama**: Lower cost, requires infrastructure
4. **GitHub Copilot for PRs**: Native integration, limited customization

## Solution

[To be filled after research]

## Scope

**In Scope**: First-pass review, common issue detection, CI/CD integration
**Out of Scope**: Replacing humans, architectural review, business logic

## Success Criteria

- 30% reduction in senior engineer review time
- < 10% false positive rate
- Developer satisfaction > 7/10
- Cost < $0.50 per PR

## Next Steps

- [ ] Research model options
- [ ] Build POC with top 2 models
- [ ] Run pilot on internal repos
- [ ] Run \`/r2r:assess\` on findings

---

**Creates structure BEFORE research.** After research, run \`/r2r:assess\` to continue the pipeline.
`;

// Error types for frontend handling
type ErrorType = "AUTH" | "SANDBOX" | "PLUGIN" | "EXECUTION" | "TIMEOUT" | "NETWORK" | "UNKNOWN";

interface ApiError {
  error: string;
  type: ErrorType;
  details?: string;
  recoverable: boolean;
}

function createError(message: string, type: ErrorType, details?: string, recoverable = false): ApiError {
  return { error: message, type, details, recoverable };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, sandboxId, prompt } = body;

    if (action === "start") {
      const { password } = body;
      const expectedPassword = process.env.SANDBOX_PASSWORD;

      if (expectedPassword && password !== expectedPassword) {
        return Response.json(
          createError("Invalid password", "AUTH", undefined, true),
          { status: 401 }
        );
      }

      if (!process.env.ANTHROPIC_API_KEY) {
        console.error("ANTHROPIC_API_KEY not configured");
        return Response.json(
          createError("Server configuration error", "SANDBOX", "API key not configured", false),
          { status: 500 }
        );
      }

      let sandbox: Sandbox;
      try {
        sandbox = await Sandbox.create("jd-claude-code", {
          envs: {
            ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
          },
          timeoutMs: 5 * 60 * 1000,
        });
      } catch (sandboxError) {
        console.error("Failed to create sandbox:", sandboxError);
        const errorMessage = sandboxError instanceof Error ? sandboxError.message : "Unknown error";
        return Response.json(
          createError("Failed to create sandbox", "SANDBOX", errorMessage, true),
          { status: 503 }
        );
      }

      const id = sandbox.sandboxId;
      sandboxes.set(id, sandbox);

      try {
        await setupPlugin(sandbox);
      } catch (pluginError) {
        console.error("Plugin setup failed:", pluginError);
        return Response.json({
          sandboxId: id,
          status: "ready",
          warning: "Plugin setup failed - some features may be unavailable",
        });
      }

      return Response.json({ sandboxId: id, status: "ready" });
    }

    if (action === "execute") {
      if (!sandboxId) {
        return Response.json(
          createError("No sandbox ID provided", "EXECUTION", undefined, false),
          { status: 400 }
        );
      }

      if (!prompt || typeof prompt !== "string") {
        return Response.json(
          createError("Invalid prompt", "EXECUTION", "Prompt must be a non-empty string", false),
          { status: 400 }
        );
      }

      let sandbox = sandboxes.get(sandboxId);

      if (!sandbox) {
        try {
          sandbox = await Sandbox.connect(sandboxId);
          sandboxes.set(sandboxId, sandbox);
        } catch (reconnectError) {
          console.error("Sandbox reconnect failed:", reconnectError);
          return Response.json(
            createError("Sandbox session expired", "SANDBOX", "Please start a new session", true),
            { status: 404 }
          );
        }
      }

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const sendError = (message: string, type: ErrorType, recoverable = false) => {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ error: message, errorType: type, recoverable })}\n\n`)
            );
          };

          try {
            let claudeSessionId = claudeSessions.get(sandboxId);
            const isFirstCommand = !claudeSessionId;

            if (isFirstCommand) {
              claudeSessionId = crypto.randomUUID();
              claudeSessions.set(sandboxId, claudeSessionId);
            }

            const sessionFlag = isFirstCommand
              ? `--session-id "${claudeSessionId}"`
              : `--resume "${claudeSessionId}"`;

            const result = await sandbox!.commands.run(
              `cd ${WORK_DIR} && echo '${escapeShellArg(prompt)}' | claude -p --dangerously-skip-permissions --plugin-dir "${USER_PLUGINS_DIR}/${PLUGIN_NAME}" --plugin-dir "${USER_SKILLS_DIR}/jd-skills" ${sessionFlag}`,
              {
                timeoutMs: 120000,
                onStdout: (data) => {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: data })}\n\n`));
                },
                onStderr: (data) => {
                  const isError = data.toLowerCase().includes("error") ||
                                  data.toLowerCase().includes("failed") ||
                                  data.toLowerCase().includes("exception");
                  if (isError) {
                    sendError(data, "EXECUTION", false);
                  } else {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: data })}\n\n`));
                  }
                },
              }
            );

            if (result.exitCode !== 0) {
              sendError(`Command exited with code ${result.exitCode}`, "EXECUTION", true);
            }

            // NOTE: Don't send result.stdout here - it's already streamed via onStdout
            // Sending it again causes duplicate responses

            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          } catch (error) {
            console.error("Execution error:", error);
            const errorMessage = error instanceof Error ? error.message : "Execution failed";

            let errorType: ErrorType = "EXECUTION";
            let recoverable = false;

            if (errorMessage.includes("timeout") || errorMessage.includes("timed out")) {
              errorType = "TIMEOUT";
              recoverable = true;
            } else if (errorMessage.includes("sandbox") || errorMessage.includes("expired")) {
              errorType = "SANDBOX";
              recoverable = true;
            } else if (errorMessage.includes("network") || errorMessage.includes("connection")) {
              errorType = "NETWORK";
              recoverable = true;
            }

            sendError(errorMessage, errorType, recoverable);
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    if (action === "health") {
      if (!sandboxId) {
        return Response.json(createError("No sandbox ID provided", "EXECUTION", undefined, false), { status: 400 });
      }

      let sandbox = sandboxes.get(sandboxId);

      if (!sandbox) {
        try {
          sandbox = await Sandbox.connect(sandboxId);
          sandboxes.set(sandboxId, sandbox);
        } catch {
          return Response.json({ alive: false, reason: "expired" }, { status: 200 });
        }
      }

      try {
        const result = await sandbox.commands.run("echo ok", { timeoutMs: 5000 });
        if (result.exitCode === 0) {
          return Response.json({ alive: true });
        }
        return Response.json({ alive: false, reason: "unresponsive" });
      } catch {
        sandboxes.delete(sandboxId);
        claudeSessions.delete(sandboxId);
        return Response.json({ alive: false, reason: "error" });
      }
    }

    if (action === "stop") {
      if (sandboxId) {
        const sandbox = sandboxes.get(sandboxId);
        if (sandbox) {
          await sandbox.kill();
          sandboxes.delete(sandboxId);
          claudeSessions.delete(sandboxId);
        }
      }
      return Response.json({ status: "stopped" });
    }

    return Response.json(createError("Invalid action", "UNKNOWN", `Unknown action: ${action}`, false), { status: 400 });
  } catch (error) {
    console.error("Sandbox error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal error";
    let errorType: ErrorType = "UNKNOWN";
    if (errorMessage.includes("JSON")) {
      errorType = "EXECUTION";
    }
    return Response.json(createError(errorMessage, errorType, undefined, false), { status: 500 });
  }
}

function escapeShellArg(arg: string): string {
  return arg.replace(/'/g, "'\\''");
}

async function setupPlugin(sandbox: Sandbox) {
  const pluginPath = `${USER_PLUGINS_DIR}/${PLUGIN_NAME}`;
  const jdSkillsPath = `${USER_SKILLS_DIR}/jd-skills`;

  console.log("Setting up plugin and skills in user directory...");

  await sandbox.commands.run(`mkdir -p ${USER_PLUGINS_DIR}`, { timeoutMs: 5000 });
  await sandbox.commands.run(`mkdir -p ${WORK_DIR}`, { timeoutMs: 5000 });
  await sandbox.commands.run(`mkdir -p ${jdSkillsPath}/skills/about-jd`, { timeoutMs: 5000 });
  await sandbox.commands.run(`mkdir -p ${jdSkillsPath}/skills/r2r-workflow`, { timeoutMs: 5000 });
  await sandbox.commands.run(`mkdir -p ${jdSkillsPath}/skills/r2r-demo`, { timeoutMs: 5000 });
  await sandbox.commands.run(`mkdir -p ${jdSkillsPath}/skills/show-assessment`, { timeoutMs: 5000 });
  await sandbox.commands.run(`mkdir -p ${jdSkillsPath}/skills/show-draft`, { timeoutMs: 5000 });
  await sandbox.commands.run(`mkdir -p ${jdSkillsPath}/.claude-plugin`, { timeoutMs: 5000 });

  // Clone the research-to-roadmap plugin
  const cloneResult = await sandbox.commands.run(
    `git clone ${PLUGIN_REPO}.git ${pluginPath} 2>&1 || echo "Already exists"`,
    { timeoutMs: 60000 }
  );
  console.log("Clone result:", cloneResult.stdout);

  // Write all JD skills as a single plugin
  await sandbox.files.write(`${jdSkillsPath}/skills/about-jd/SKILL.md`, ABOUT_JD_SKILL);
  await sandbox.files.write(`${jdSkillsPath}/skills/r2r-workflow/SKILL.md`, R2R_WORKFLOW_SKILL);
  await sandbox.files.write(`${jdSkillsPath}/skills/r2r-demo/SKILL.md`, R2R_DEMO_SKILL);
  await sandbox.files.write(`${jdSkillsPath}/skills/show-assessment/SKILL.md`, SHOW_ASSESSMENT_SKILL);
  await sandbox.files.write(`${jdSkillsPath}/skills/show-draft/SKILL.md`, SHOW_DRAFT_SKILL);

  await sandbox.files.write(`${jdSkillsPath}/.claude-plugin/plugin.json`, JSON.stringify({
    name: "jd-skills",
    version: "1.0.0",
    description: "JD Fiscus skills: about-jd, r2r-workflow, r2r-demo, show-assessment, show-draft"
  }, null, 2));
  console.log("JD skills plugin written to:", jdSkillsPath);

  const checkResult = await sandbox.commands.run(
    `ls -la ${pluginPath}/ && ls -la ${pluginPath}/.claude-plugin/ 2>&1 || echo "Plugin structure check"`,
    { timeoutMs: 5000 }
  );
  console.log("Plugin structure:", checkResult.stdout);

  const skillCheckResult = await sandbox.commands.run(
    `ls -la ${jdSkillsPath}/skills/ 2>&1 || echo "Skill structure check"`,
    { timeoutMs: 5000 }
  );
  console.log("JD skills structure:", skillCheckResult.stdout);

  const versionResult = await sandbox.commands.run(`claude --version 2>&1 || echo "unknown"`, { timeoutMs: 5000 });
  console.log("Claude version:", versionResult.stdout);

  console.log("Plugin setup complete at:", pluginPath);
  console.log("Skills setup complete at:", jdSkillsPath);
}
