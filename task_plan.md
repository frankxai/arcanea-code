# Arcanea Code — Overnight Autonomous Build Plan

**Goal:** Transform arcanea-code from a rebranded fork into a fully operational Guardian-powered AI coding CLI with integrated superintelligence, creative agents, skill system, and CI/CD.

**Mode:** AUTONOMOUS — 8 hours, no user interaction. Execute, iterate, test, validate.

**Created:** 2026-03-22 03:30
**Status:** IN PROGRESS

---

## WAVE 1: Merge & Stabilize (30 min)
**Status:** `pending`

- [ ] Merge PR #11 (dev-v2 → dev) or force-push dev-v2 as new dev
- [ ] Verify clean state on dev-v2
- [ ] Run initial build test to establish baseline

## WAVE 2: Superintelligence Integration (2 hours)
**Status:** `pending`

Port from claude-arcanea and create native arcanea-code intelligence layer:

### 2A: Intelligence OS Core
- [ ] Create `packages/opencode/src/arcanea/` directory
- [ ] Port intelligence hierarchy (Arcanea → Lumina → Guardians → Luminors)
- [ ] Port multi-AGI routing table (opus/sonnet/haiku per task type)
- [ ] Port task detection patterns (regex → guardian + model routing)
- [ ] Port proactive behavior rules (anticipation, creative initiative, quality elevation)
- [ ] Create `packages/opencode/src/arcanea/intelligence.ts`

### 2B: Creative Agent Registry
- [ ] Port 10 creative agent types (lorekeeper, visualist, composer, publisher, council, architect, worldbuilder, chronicler, ritualist, oracle)
- [ ] Port full prompt templates for each agent
- [ ] Create `packages/opencode/src/arcanea/agents.ts`

### 2C: Creative Domain Router
- [ ] Port 5 creative domains (code, lore, art, music, publishing)
- [ ] Port file pattern → domain detection
- [ ] Port keyword → guardian routing
- [ ] Create `packages/opencode/src/arcanea/router.ts`

### 2D: Guardian System Prompt Builder
- [ ] Build dynamic system prompt that includes Guardian context
- [ ] Inject intelligence hierarchy into every session
- [ ] Wire into session/prompt.ts or chat.message hook
- [ ] Create `packages/opencode/src/arcanea/prompt-builder.ts`

## WAVE 3: oh-my-arcanea Agent Port (2 hours)
**Status:** `pending`

Port the 11 production agents from oh-my-arcanea:

### 3A: Core Agents
- [ ] Port Sisyphus (persistent task worker) → `.arcanea/agent/sisyphus.md`
- [ ] Port Hephaestus (code forge) → `.arcanea/agent/hephaestus.md`
- [ ] Port Oracle (research/knowledge) → `.arcanea/agent/oracle.md`
- [ ] Port Prometheus (innovation/creative) → `.arcanea/agent/prometheus.md`
- [ ] Port Metis (strategic planning) → `.arcanea/agent/metis.md`
- [ ] Port Momus (code review/critique) → `.arcanea/agent/momus.md`

### 3B: Specialist Agents
- [ ] Port Librarian (context management) → `.arcanea/agent/librarian.md`
- [ ] Port Explore (codebase navigation) → `.arcanea/agent/explore.md`
- [ ] Port Atlas (architecture analysis) → `.arcanea/agent/atlas.md`
- [ ] Port Multimodal-Looker (visual analysis) → `.arcanea/agent/multimodal-looker.md`
- [ ] Port Sisyphus-Junior (lightweight runner) → `.arcanea/agent/sisyphus-junior.md`

### 3C: Agent Type Definitions
- [ ] Create TypeScript interface for agent configs
- [ ] Create agent registry with all 21 agents (10 Guardians + 11 Workers)
- [ ] Wire into arcanea-code's agent system

## WAVE 4: Skill System Integration (1.5 hours)
**Status:** `pending`

### 4A: Built-in Skills
- [ ] Create `.arcanea/skill/` structure matching opencode skill format
- [ ] Port top 15 skills from claude-arcanea/oh-my-arcanea:
  - scaffold, refactor, optimize, review, debug, architect
  - council, guardian, lore, voice-check
  - tdd, commit, docs, deploy, test
- [ ] Each skill as markdown with frontmatter (trigger, description, prompt)

### 4B: Command System
- [ ] Port /guardian command (invoke specific guardian)
- [ ] Port /council command (multi-guardian deliberation)
- [ ] Port /lore command (universe query)
- [ ] Port /voice-check command (voice consistency)
- [ ] Create /swarm command (parallel agent execution)
- [ ] Create /route command (show which guardian handles what)

## WAVE 5: Theme & TUI Customization (1 hour)
**Status:** `pending`

### 5A: Arcanea Cosmic Theme
- [ ] Enhance the arcanea.json TUI theme with proper cosmic colors
- [ ] Add Guardian-colored status indicators
- [ ] Custom startup banner (ASCII art or styled text)
- [ ] Gate-level indicator in prompt

### 5B: Configuration Files
- [ ] Create default `arcanea.jsonc` with full Guardian setup
- [ ] Create example project config
- [ ] Create `.arcanea/glossary/` with Arcanea terminology

## WAVE 6: CI/CD & Build System (1 hour)
**Status:** `pending`

### 6A: GitHub Actions
- [ ] Create typecheck workflow
- [ ] Create test workflow
- [ ] Create build workflow (multi-platform binaries)
- [ ] Update existing workflows with ARCANEA branding

### 6B: Build Scripts
- [ ] Update build script for arcanea-code binary name
- [ ] Create install.sh for curl-based installation
- [ ] Verify multi-platform binary build config

## WAVE 7: Testing & Validation (30 min)
**Status:** `pending`

- [ ] Run typecheck across all packages
- [ ] Test Guardian agent loading from .arcanea/agent/
- [ ] Test skill loading from .arcanea/skill/
- [ ] Test command loading from .arcanea/command/
- [ ] Verify arcanea.jsonc config loading
- [ ] Verify ARCANEA_* env var support
- [ ] Test theme loading

## WAVE 8: Documentation & Polish (30 min)
**Status:** `pending`

- [ ] Update CONTRIBUTING.md with Arcanea-specific guidance
- [ ] Create AGENTS.md with full agent registry documentation
- [ ] Update issue #2 with integration status
- [ ] Final commit and push
- [ ] Update all GitHub issues with progress

---

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|

## Key Decisions
| Decision | Rationale |
|----------|-----------|
| Port as markdown agents, not TypeScript | OpenCode uses .md agent definitions — simpler, more compatible |
| Dual env var support | ARCANEA_* priority + OPENCODE_* fallback for backward compat |
| Fresh .arcanea/ directory | Clean separation from upstream .opencode/ |
| Intelligence layer as package subdir | packages/opencode/src/arcanea/ — embedded, not external |
