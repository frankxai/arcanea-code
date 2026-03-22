# Arcanea Code — Fork Rebuild Master Plan

**Goal:** Fresh rebase onto latest upstream opencode (1,143 commits ahead), re-apply Arcanea branding, integrate oh-my-arcanea, establish sustainable upstream sync workflow.

**Strategy:** NUCLEAR REBASE — reset to upstream/dev HEAD, then cherry-pick/re-apply our 6 Arcanea commits adapted to the new Effect.ts codebase. This avoids 38 merge conflicts.

**Created:** 2026-03-22
**Status:** IN PROGRESS

---

## Phase 1: Fresh Base (reset to upstream HEAD)
**Status:** `pending`
**Branch:** `dev-v2`

- [ ] Create `dev-v2` branch from `upstream/dev` HEAD
- [ ] Verify clean build/typecheck on fresh upstream
- [ ] Document upstream's current architecture (Effect.ts services)

## Phase 2: Guardian Intelligence Layer (re-apply commit b04388e)
**Status:** `pending`

- [ ] Copy `.arcanea/agent/*.md` (10 Guardian definitions)
- [ ] Copy `.arcanea/themes/arcanea.json` (cosmic theme)
- [ ] Copy `.arcanea/command/` (guardian, council, lore, voice-check)
- [ ] Copy `.arcanea/skill/` and `.arcanea/tool/`
- [ ] Update `opencode.json` → `arcanea.json` for new codebase structure
- [ ] Commit: "feat: Guardian intelligence layer — 10 agents, cosmic theme"

## Phase 3: Core Rebrand (re-apply commit 083673c adapted to Effect.ts)
**Status:** `pending`

Key files to rebrand (adapted for Effect.ts service pattern):
- [ ] `packages/opencode/src/global/index.ts` — app identity → "arcanea-code"
- [ ] `packages/opencode/src/flag/flag.ts` — OPENCODE_* → ARCANEA_* env vars
- [ ] `packages/opencode/src/config/config.ts` — .opencode/ → .arcanea/
- [ ] `packages/opencode/src/storage/db.ts` — database path
- [ ] `packages/opencode/src/cli/` — CLI references
- [ ] `packages/opencode/src/server/server.ts` — server identity
- [ ] `packages/opencode/src/installation/index.ts` — install paths
- [ ] `packages/opencode/src/provider/` — user-agent strings
- [ ] `bin/opencode` → `bin/arcanea-code`
- [ ] All TSX components referencing OPENCODE_* flags
- [ ] `package.json` root — name → arcanea-code
- [ ] Commit: "feat: opencode → arcanea-code rebrand for Effect.ts codebase"

## Phase 4: CI/CD Pipeline Rebrand (re-apply commit 41b4ec3)
**Status:** `pending`

- [ ] `.github/workflows/*.yml` — OPENCODE_* → ARCANEA_* env vars
- [ ] Repo checks: anomalyco/opencode → frankxai/arcanea-code
- [ ] Script version resolver update
- [ ] Install script (install.sh)
- [ ] Commit: "feat: CI pipeline rebrand — ARCANEA_* env vars"

## Phase 5: Guardian Council (re-apply from 41b4ec3)
**Status:** `pending`

- [ ] `council.ts` — 5 Guardians parallel via Promise.all + generateText
- [ ] Shinkami synthesis layer
- [ ] `/council` command integration
- [ ] Commit: "feat: Guardian Council — 5 Guardians deliberate in parallel"

## Phase 6: Naming & README (re-apply commits 5a70bb7 + 14804fc)
**Status:** `pending`

- [ ] Binary: arcanea-code
- [ ] README.md with Living Intelligence narrative
- [ ] Update all 15 translated READMEs
- [ ] Commit: "feat: Arcanea Code identity — README, binary, branding"

## Phase 7: Upstream Sync Workflow (NEW — sustainable future sync)
**Status:** `pending`

- [ ] Create `.github/workflows/upstream-sync.yml` — weekly auto-fetch
- [ ] Create `scripts/sync-upstream.sh` — conflict detection + notification
- [ ] Document rebase strategy in CONTRIBUTING.md
- [ ] Set up branch protection for `dev-v2`
- [ ] Commit: "feat: automated upstream sync workflow"

## Phase 8: oh-my-arcanea Integration Planning (prep for issue #2)
**Status:** `pending`

- [ ] Audit oh-my-arcanea plugin interface against new Effect.ts services
- [ ] Map 11 agents to arcanea-code agent system
- [ ] Map 44 hooks to arcanea-code hook system
- [ ] Map 26 tools to arcanea-code tool registry
- [ ] Create integration architecture document
- [ ] Commit: "docs: oh-my-arcanea integration architecture"

## Phase 9: Push & PR
**Status:** `pending`

- [ ] Force-push `dev-v2` (or create PR from dev-v2 → dev)
- [ ] Verify CI passes
- [ ] Update GitHub issues with new branch references
- [ ] Close/update issue #1 (upstream sync)

---

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|

## Key Files Modified
| File | Phase | Change |
|------|-------|--------|

## Architecture Notes
- Upstream now uses Effect.ts for service layer (effectify pattern)
- Services: Pty, ToolRegistry, Plugin, Command all effectified
- Our branding touches 121 files, 1593 insertions across 6 commits
- oh-my-arcanea: 143K LOC, 11 agents, 44 hooks, 26 tools, Bun runtime
