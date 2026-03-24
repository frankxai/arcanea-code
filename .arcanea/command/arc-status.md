---
name: arc-status
description: Show Arcanea Code system status — Guardians, skills, agents
---

# /arc-status — Arcanea Code System Status

Display the current system status:

## Report Format

### Guardian Swarm
List all 10 Guardians and their status (active — they're always active as a swarm).

### Loaded Agents
Count and list agents from `.arcanea/agent/`:
- Guardian agents (10)
- Worker agents (from oh-my-arcanea)
- Utility agents
- Creative agents

### Active Skills
Count and list skills from `.arcanea/skill/`:
- By Gate assignment
- Total skill count

### Available Commands
List commands from `.arcanea/command/`:
- Total command count

### Intelligence OS
- Router: active (18 routing rules)
- Prompt builder: active
- Session injector: active
- Worktree manager: available

### Environment
- ARCANEA_* env vars detected
- Provider configured (yes/no)
- Theme: arcanea
