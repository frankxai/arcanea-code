# oh-my-arcanea Integration Architecture

## Overview

oh-my-arcanea (v4.0.0) is the plugin harness for Arcanea Code. It extends OpenCode with
Guardian-routed multi-agent orchestration via the `@opencode-ai/plugin` interface.

## Current Integration Status

### Fully Ported (as markdown agents)
- 11 production agents: Sisyphus, Hephaestus, Oracle, Prometheus, Metis, Momus,
  Librarian, Explore, Atlas, Multimodal-Looker, Sisyphus-Junior

### Partially Ported (behaviors captured as skills/commands)
- Agent routing → Intelligence OS router + Guardian agents
- Effort adjustment → Skill-based model tier recommendations
- Slash command detection → /guardian, /council, /swarm commands
- Context preservation → CLAUDE.md + arcanea.jsonc instructions

### Not Yet Ported (requires TypeScript plugin integration)

#### High-Value Hooks (60 total in oh-my-arcanea)
| Hook | Purpose | Port Strategy |
|------|---------|---------------|
| anthropic-effort | Adjust model effort based on task complexity | Wire into Intelligence OS routing |
| compaction-context-injector | Preserve important context during compaction | Skill-based reminder |
| context-window-monitor | Track token usage, warn at limits | Agent instruction |
| edit-error-recovery | Auto-retry failed edits with corrections | Agent behavior rule |
| delegate-task-retry | Retry failed agent tasks with guidance | Agent behavior rule |
| auto-slash-command | Detect and execute skill triggers | Native skill system |
| agent-usage-reminder | Remind about available agents | Agent instruction |
| directory-agents-injector | Load agents from project directory | Already native (.arcanea/agent/) |
| directory-readme-injector | Inject README context | Already via InstructionPrompt |

#### Tools (18 total)
| Tool | Purpose | Port Strategy |
|------|---------|---------------|
| delegate-task | Spawn sub-agents | Native Task tool |
| ast-grep | AST-based code search | Shell command |
| background-task | Run tasks in background | Native Task tool |
| session-manager | Manage sessions | Native session system |
| skill | Load and execute skills | Native skill system (.arcanea/skill/) |
| skill-mcp | MCP-based skills | Native MCP system |
| lsp | Language server integration | Native LSP |
| glob/grep | File search | Native tools |

## Integration Plan

### Phase 1: Behavior Capture (Done)
Port agent behaviors and prompts as markdown definitions.

### Phase 2: Plugin Bridge (Next)
Create `packages/opencode/src/arcanea/plugin-bridge.ts` that:
1. Loads oh-my-arcanea as an optional dependency
2. Bridges its hooks into the native hook system
3. Falls back gracefully when not installed

### Phase 3: Native Hooks (Future)
Re-implement the highest-value hooks natively:
1. Effort adjustment via Intelligence OS router
2. Context preservation during compaction
3. Edit error recovery patterns
4. Agent retry with escalation

### Phase 4: Full Native (Future)
All oh-my-arcanea functionality as native arcanea-code features.
