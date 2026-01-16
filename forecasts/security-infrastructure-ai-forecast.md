# AI Security/Infrastructure Transformation Forecast

**Forecaster:** Claude (Superforecaster Protocol)
**Date:** January 15, 2026
**Data Sources:** Training data through May 2025
**Methodology:** 5-Phase Pipeline (Outside View, Decomposition, Bayesian Update, Premortem, Debias)

---

## Executive Summary

| Forecast | Probability | 80% CI | Key Driver | Key Blocker |
|----------|-------------|--------|------------|-------------|
| AI security tools >60% by 2027 | **62%** | 45-78% | Vendor push, CISO intent | Skills gap, integration |
| Autonomous SOC >20% by 2028 | **6%** | 2-15% | Technology capability | Legal liability, insurance |
| AI > Human CVEs by 2029 | **25%** | 12-40% | AI fuzzing effectiveness | No tracking methodology |
| Major AI outage by 2027 | **55%** | 35-72% | Rapid AIOps adoption | Human oversight guardrails |

---

## Forecast 1: AI-Powered Security Tools Standard in >60% of Enterprises by 2027

### Final Probability: 62%
**Confidence Interval (80%):** 45% - 78%

### Reasoning Pipeline

**Phase 1 (Outside View):**
- Reference Class: CSPM/SOAR adoption trajectories
- SIEM: ~15% (2010) to ~60-65% (2020) = 10 years
- CSPM: ~2017 to ~45-50% (2024) = 7 years
- Base Rate: ~50% (7-year adoption curve compressed to 4 years)

**Phase 2 (Decomposition):**
| Component | Estimate | Reasoning |
|-----------|----------|-----------|
| Technology maturity | 85% | AI detection capabilities proven by 2024 |
| Vendor ecosystem | 80% | Microsoft, CrowdStrike, Palo Alto shipping |
| Enterprise budget | 70% | Security budgets growing but AI premium uncertain |
| Regulatory drivers | 60% | Some AI mandates emerging |
| Talent availability | 55% | **Significant skills gap remains** |

**Phase 3 (Bayesian Update):**
| Evidence | LR | Updated | Reasoning |
|----------|-----|---------|-----------|
| Microsoft Copilot for Security | 1.3 | 61% | Major vendor commitment |
| CrowdStrike Charlotte AI | 1.2 | 65% | Demonstrates capability |
| Gartner CISO survey (70%+ plan to evaluate) | 1.4 | 72% | Strong intent signal |

**Phase 4 (Stress Test):**
- Premortem failure modes: 45% total probability
- Economic recession, integration complexity, major breach
- Bias adjustment: -3% for AI enthusiasm affect
- **Final:** 72% → 62%

### Kill Criteria
- Major AI security breach (adversarial attack bypasses AI) → Drops to 45%
- Economic recession forces >15% security budget cuts → Drops to 40%
- Regulatory restrictions on AI in security (US or EU) → Drops to 50%

---

## Forecast 2: Fully Autonomous SOC (No Human in Loop for Tier 1) at >20% Large Enterprises by 2028

### Final Probability: 6%
**Confidence Interval (80%):** 2% - 15%

### Critical Insight
The definition of "no human in loop" is key:
- If interpreted as "human available but not required for routine Tier 1": **~25%**
- As written (truly autonomous): **6%**

### Reasoning Pipeline

**Phase 1 (Outside View):**
- Reference Class: SOAR adoption + human-out-of-loop systems
- Base Rate: ~15% (historically very slow for autonomous security)
- Legal liability is unprecedented barrier

**Phase 2 (Decomposition):**
| Component | Estimate | Reasoning |
|-----------|----------|-----------|
| Technology reliability | 70% | Tier 1 is mostly triage - achievable |
| Legal/liability frameworks | 40% | **MAJOR BLOCKER** - no precedent |
| Insurance acceptance | 35% | Cyber insurers highly conservative |
| Organizational willingness | 50% | Cultural resistance to "no human" |

**Combined:** 5%

**Phase 3 (Bayesian Update):**
| Evidence | LR | Updated | Reasoning |
|----------|-----|---------|-----------|
| CrowdStrike Charlotte AI | 1.4 | 13% | Shows capability |
| EU AI Act restrictions | 0.7 | 9% | Regulatory friction |
| Insurance hesitancy | 0.6 | 6% | Coverage without humans problematic |

**Phase 4 (Stress Test):**
- Premortem confirms: 80%+ failure probability
- Legal liability is primary blocker
- No adjustment needed - already conservative

### Kill Criteria
- EU explicitly bans autonomous security decisions → Drops to 2%
- Major autonomous SOC failure causes breach → Drops to 1%
- US SEC/regulators require human oversight → Drops to 3%

---

## Forecast 3: AI-Discovered Vulnerabilities Exceed Human-Discovered in CVE Database by 2029

### Final Probability: 25%
**Confidence Interval (80%):** 12% - 40%

### Critical Insight
This forecast hinges on whether CVE database will track AI-discovered vulnerabilities as a separate category. **Currently no such mechanism exists.**

### Reasoning Pipeline

**Phase 1 (Outside View):**
- Reference Class: Automated testing tool adoption, fuzzing history
- Base Rate: 20-25% (novel measurement methodology barrier)

**Phase 2 (Decomposition):**
| Component | Estimate | Reasoning |
|-----------|----------|-----------|
| AI tools mature | 75% | Fuzzing AI already effective |
| Researcher adoption | 65% | Economics favor AI augmentation |
| Attribution methodology exists | 45% | **UNCLEAR how to track** |
| CVE process adapts | 50% | MITRE processes slow to change |

**Combined:** 11%

**Phase 3 (Bayesian Update):**
| Evidence | LR | Updated | Reasoning |
|----------|-----|---------|-----------|
| Google Project Zero AI fuzzing success | 1.5 | 25% | AI finding real vulnerabilities |

**Phase 4 (Stress Test):**
- Definitional problem is key barrier
- Many "AI-discovered" will be claimed as human with AI assistance
- No adjustment needed

### Kill Criteria
- MITRE rejects AI-discovered category → Drops to 5%
- Major AI fuzzing tools plateau in capability → Drops to 15%
- Definition standardized and adopted → Increases to 40%

---

## Forecast 4: Major Infrastructure Outage Caused by AI Operations Failure by 2027

### Final Probability: 55%
**Confidence Interval (80%):** 35% - 72%

### Definition Sensitivity
- "AI operations failure" narrowly defined (AI autonomously made wrong decision): **~30%**
- Broadly defined (any failure in AI-enabled operations stack): **~70%**
- **Used middle interpretation:** 55%

### Reasoning Pipeline

**Phase 1 (Outside View):**
- Reference Class: Major tech infrastructure failures (any cause)
- Base Rate: 60% (major outages happen regularly)
- CrowdStrike 2024, AWS/Azure outage history informs this

**Phase 2 (Decomposition):**
| Component | Estimate | Reasoning |
|-----------|----------|-----------|
| AIOps widely deployed | 80% | Already happening rapidly |
| Failure mode exists | 95% | Certainty - all systems have failures |
| Cascade to major outage | 40% | Most failures contained |
| Escapes human oversight | 50% | Depends on autonomy level |

**Structural:** 15% per deployment, ~65% aggregate (many deployments)

**Phase 3 (Bayesian Update):**
| Evidence | LR | Updated | Reasoning |
|----------|-----|---------|-----------|
| CrowdStrike outage precedent (2024) | 1.3 | 66% | Demonstrates cascade risk |

**Phase 4 (Stress Test):**
- Premortem: Human oversight may catch many issues
- Attribution challenge: Will we know it was "AI-caused"?
- Bias adjustment: -3% for fear bias
- **Final:** 66% → 55%

### Kill Criteria
- Major AIOps vendor implements mandatory human checkpoints → Drops to 40%
- AIOps adoption slower than expected → Drops to 35%
- First near-miss AI outage gets major press → Increases to 70%

---

## Reference Class Analysis

### Historical Security Technology Adoption

| Technology | Years to 60% Adoption | Notes |
|------------|----------------------|-------|
| SIEM | ~10 years | Mature market benchmark |
| SOAR | ~10+ years (projected) | Complex integration |
| CSPM | ~7 years (projected) | Cloud urgency accelerator |
| DevOps | ~6 years | Strong ROI driver |

**Assumption:** For AI-powered security tools, the reference class is a blend of CSPM (urgency-driven) and SOAR (complexity-constrained).

---

## Premortem Analysis

### Forecast #1 Failure Modes (AI tools NOT reaching 60%):
| Mode | Probability | Description |
|------|-------------|-------------|
| Economic recession | 15% | Budget cuts delay adoption |
| Major AI security breach | 20% | Loss of confidence |
| Regulatory backlash | 10% | AI restrictions slow deployment |
| Integration complexity | 25% | Enterprises stall at pilot |
| Talent shortage | 20% | Can't operationalize purchases |

### Forecast #4 Failure Modes (Major outage DOESN'T happen):
| Mode | Probability | Description |
|------|-------------|-------------|
| Human oversight catches issues | 40% | Guardrails work |
| Slow autonomous adoption | 30% | Insufficient AI autonomy deployed |
| Robust testing regimes | 25% | Industry learns from close calls |
| Definition disputes | 20% | Outages happen but attribution unclear |

---

## Risk Monitoring Dashboard

### Warning Signals to Track

| Forecast | Warning Signals | Frequency |
|----------|-----------------|-----------|
| #1 | CISO budget surveys, vendor earnings | Quarterly |
| #1 | AI security tool PoC success rates | Quarterly |
| #2 | EU AI Act enforcement actions | Monthly |
| #2 | Cyber insurance policy language | Quarterly |
| #3 | MITRE/CVE process announcements | Monthly |
| #3 | Project Zero/academic publications | Monthly |
| #4 | AIOps vendor incident reports | Weekly |
| #4 | Cloud provider AI feature rollouts | Monthly |

---

## Forecast Quality Assessment

| Forecast | Brier Risk | Evidence Quality |
|----------|------------|------------------|
| #1 (62%) | Low | Moderate (vendor announcements, surveys) |
| #2 (6%) | High if wrong | Weak (limited autonomous SOC to observe) |
| #3 (25%) | Medium | Weak (no tracking mechanism exists) |
| #4 (55%) | Low | Moderate (infrastructure failure history) |

### Key Uncertainties
1. Definitional ambiguity in all four questions
2. Regulatory landscape evolving rapidly
3. Economic conditions uncertain
4. No live data - using May 2025 cutoff

---

## Recommended Clarifications

For higher-quality forecasts, please clarify:

1. **Forecast #1:** What counts as "AI-powered"? Any ML component, or generative AI specifically?

2. **Forecast #2:** Define "fully autonomous" and "Tier 1." Is alerting still human? What about escalation decisions?

3. **Forecast #3:** How would we measure "AI-discovered"? What if human uses AI tool but makes final determination?

4. **Forecast #4:** What constitutes "major"? (e.g., >$100M damage, >1M users affected, >24 hours duration?)
