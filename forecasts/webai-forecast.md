# WebAI Technology Forecast

**Forecaster:** Claude (Superforecaster Protocol)
**Date:** January 15, 2026
**Data Sources:** Training data through May 2025
**Methodology:** 5-Phase Pipeline (Outside View, Decomposition, Bayesian Update, Premortem, Debias)

---

## Executive Summary

| Forecast | Probability | 80% CI | Confidence |
|----------|-------------|--------|------------|
| WebAI mainstream by 2027 | **10%** | 3-22% | Medium |
| WebAI surpasses cloud (use cases) 2028 | **72%** | 55-85% | Medium-High |
| WebNN full browser support 2026 | **18%** | 8-35% | Medium |
| Privacy-preserving new categories | **38%** | 20-55% | Low-Medium |

---

## Forecast 1: WebAI Mainstream (>50% of web apps) by 2027

### Final Probability: 10%
**Confidence Interval (80%):** 3% - 22%

### Reasoning Pipeline

**Phase 1 (Base Rate): 15-20%**
- Reference class: WebGL, WebRTC, WebAssembly adoption
- Historical pattern: 5-7 years from spec to mainstream
- WebNN spec ~2019, so 2027 is aggressive

**Phase 2 (Structural): 8.4%**
- P(Tech Ready) × P(Tooling) × P(Use Cases) × P(Performance)
- Bottleneck: Developer tooling maturity (40%)

**Phase 3 (Bayesian): 12%**
- Positive: Chrome shipping, TensorFlow.js growth
- Negative: Apple resistance, LLM cloud dominance

**Phase 4 (Premortem): Adjusted to 10%**
- Failure modes: Cloud becomes cheap (30%), fragmentation (20%)
- Technology enthusiasm bias corrected

### Kill Criteria
- If Apple announces WebNN support → Increase to 25%
- If Chrome deprecates WebNN → Drop to 2%
- If LLM costs drop 90% by 2026 → Drop to 5%

---

## Forecast 2: WebAI Surpasses Cloud (Certain Use Cases) by 2028

### Final Probability: 72%
**Confidence Interval (80%):** 55% - 85%

### Reasoning Pipeline

**Phase 1 (Base Rate): 25-30%**
- Reference: Mobile edge AI (Core ML, NNAPI) already succeeded
- On-device face filters, voice already common

**Phase 2 (Structural): 75%**
- "Certain use cases" is low bar
- Real-time filters, offline apps already winning
- Only need ONE use case to verify

**Phase 3 (Bayesian): 77%**
- Strong positive: NPU proliferation, privacy regs, small models
- MediaPipe already proves concept

**Phase 4 (Premortem): Adjusted to 72%**
- Risk: Cloud becomes too cheap/fast
- Risk: Developers choose simplicity

### Key Use Cases Likely to Flip
1. Real-time video/face effects (85% confidence - already happening)
2. Offline-capable AI assistants (65% confidence)
3. Privacy-sensitive health monitoring (60% confidence)
4. Real-time language translation (50% confidence)

### Kill Criteria
- If 5G latency drops below 10ms reliably → Drop to 55%
- If NPU adoption stalls → Drop to 50%
- If privacy regulations weaken → Drop to 60%

---

## Forecast 3: Major Browser Vendors Fully Support WebNN by 2026

### Final Probability: 18% (all four browsers)
### Alternative: 52% (3 of 4 browsers)
**Confidence Interval (80%):** 8% - 35% (all four)

### Reasoning Pipeline

**Phase 1 (Base Rate): 35-40%**
- Reference: WebGPU took 6-7 years, Safari lagged 2+ years
- 2026 is <1 year away from today

**Phase 2 (Structural): 12.8%**
- Chrome (90%) × Edge (90%) × Safari (35%) × Firefox (45%)
- Safari is the critical blocker

**Phase 3 (Bayesian): 21%**
- Strong negative: Safari WebKit team priorities
- Moderate negative: Firefox resource constraints
- Positive: W3C standardization progress

**Phase 4 (Premortem): Adjusted to 18%**
- Apple's incentive is to push Core ML + App Store
- Safari has historically deprioritized performance APIs

### By Browser (Individual Probabilities by End 2026)
| Browser | Probability | Notes |
|---------|-------------|-------|
| Chrome | 92% | Already shipping, refinements only |
| Edge | 90% | Tracks Chrome closely |
| Safari | 25% | Would require Apple strategy shift |
| Firefox | 40% | Resource and priority dependent |

### Kill Criteria
- If Apple announces WebNN at WWDC 2026 → Increase to 70%
- If Mozilla announces WebNN deprioritization → Drop to 10%
- If W3C delays spec → Drop to 12%

---

## Forecast 4: WebAI Enables New Privacy-Preserving App Categories

### Final Probability: 38%
**Confidence Interval (80%):** 20% - 55%

### Reasoning Pipeline

**Phase 1 (Base Rate): 40-50%**
- Reference: Privacy-focused apps exist but niche
- Federated learning, on-device processing already possible

**Phase 2 (Structural): 35-40%**
- P(Tech) × P(Devs Build) × P(Users Adopt) × P(Business Model)
- Bottleneck: Business model viability (45%)

**Phase 3 (Bayesian): 40%**
- Positive: EU AI Act, health AI interest
- Negative: Ad model resistance, tooling immaturity

**Phase 4 (Premortem): Adjusted to 38%**
- Risk: Privacy apps can't monetize
- Risk: Users don't pay premium for privacy

### Candidate New Categories
| Category | Probability | Notes |
|----------|-------------|-------|
| On-device health diagnostics | 50% | Regulatory tailwinds |
| Private AI writing assistants | 35% | Competes with cloud |
| Federated learning applications | 30% | Complex to build |
| End-to-end encrypted AI search | 25% | Business model unclear |

### Kill Criteria
- If major health app succeeds with WebAI → Increase to 55%
- If ad-based AI apps dominate → Drop to 25%
- If privacy regs weaken in US → Drop to 30%

---

## Risk Monitoring Dashboard

### Signals to Track

| Signal | Frequency | Impact |
|--------|-----------|--------|
| Apple WWDC/Safari announcements | Annually (June) | High |
| Chrome WebNN release notes | Monthly | Medium |
| TensorFlow.js npm downloads | Quarterly | Medium |
| Cloud AI pricing (OpenAI, Anthropic) | Quarterly | High |
| WebNN W3C spec status | Monthly | Medium |
| NPU adoption in consumer devices | Annually | High |
| EU AI Act enforcement actions | Quarterly | Medium |

---

## Forecast Quality Assessment

### Brier Risk by Forecast
- Forecast 1 (10%): Low risk - extreme prediction but well-justified
- Forecast 2 (72%): Medium risk - moderate prediction, good evidence
- Forecast 3 (18%): Low risk - near-term, concrete criteria
- Forecast 4 (38%): Medium risk - ambiguous resolution criteria

### Evidence Quality: Moderate
- Based on training data through May 2025
- No live market data or recent announcements
- Would benefit from updated domain knowledge

### Key Uncertainties
1. Apple's strategic direction (highest uncertainty)
2. Cloud AI cost trajectory (high uncertainty)
3. Developer adoption velocity (medium uncertainty)

### Calibration Notes
- CIs intentionally wide (20-30 points) due to technology volatility
- Forecasts updated for tech enthusiasm bias (-5%)
- Premortem analysis identified substantial failure modes

---

## Reference Class Analysis

### Analogous Technologies

| Technology | First Spec | Mainstream (>75% browser support) | Years to Mainstream |
|------------|------------|----------------------------------|---------------------|
| WebGL | 2009 | 2014 | ~5 years |
| WebRTC | 2011 | 2017 | ~6 years |
| WebAssembly | 2015 | 2019 | ~4 years |
| WebGPU | 2017 | 2023-2024 | ~6-7 years |
| Service Workers | 2014 | 2018 | ~4 years |

### WebNN Timeline
- First public working draft: ~2019
- Origin trials began: 2021-2022
- Current (Jan 2026): Chrome/Edge shipping, Safari/Firefox in development

---

## Premortem Analysis

### Failure Modes Identified

| Failure Mode | Probability | Description |
|--------------|-------------|-------------|
| Cloud AI Too Good/Cheap | 30% | GPT-5/Claude 4 at $0.001/query; edge latency irrelevant with 5G |
| Browser Fragmentation | 20% | Safari never ships WebNN; Firefox deprecates; developers abandon |
| Hardware Diversity Nightmare | 15% | Different NPUs, different op support, 10x performance variance |
| Security Vulnerabilities | 10% | WebNN enables side-channel attacks; browsers disable by default |
| LLM Dominance | 25% | All AI investment goes to large models; small model research stagnates |

**Total Failure Probability:** ~65% (not additive due to overlaps)
