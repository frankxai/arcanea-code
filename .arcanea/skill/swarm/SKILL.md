---
name: swarm
description: Swarm orchestration — multi-agent coordination with hierarchical-mesh topology
trigger: "swarm", "parallel", "multi-agent", "orchestrate", "spawn agents"
gate: Source
guardian: Shinkami
element: Void/Spirit
---

# Swarm — Source Gate (Shinkami)

> *"As Shinkami holds all Gates in unity, the Swarm weaves many minds into a single purpose."*

## When to Activate

Activate when the task involves:
- Work that can be parallelized across multiple agents
- Large refactoring spanning many files
- Building multiple features simultaneously
- Complex tasks requiring specialized roles

## Instructions

### Swarm Topology

Use **hierarchical-mesh** topology:
- One coordinator (Shinkami role) manages task distribution
- Specialist agents work in parallel on their domains
- Agents can communicate peer-to-peer for cross-cutting concerns
- Results flow back to coordinator for synthesis

### Initialization

```bash
npx @claude-flow/cli@latest swarm init \
  --topology hierarchical \
  --max-agents 8 \
  --strategy specialized
```

### Agent Roles

Define clear, non-overlapping responsibilities:

| Role | Responsibility | Max Agents |
|------|---------------|------------|
| Coordinator | Task distribution, synthesis | 1 |
| Coder | Implementation | 2-3 |
| Reviewer | Quality checks | 1 |
| Tester | Test writing | 1 |
| Researcher | Context gathering | 1 |

### Spawning Protocol

1. **Define all tasks upfront** before spawning any agent
2. **Spawn all agents in one message** — never one at a time
3. **Each agent gets complete instructions** — do not assume shared context
4. **Use `run_in_background: true`** for all agent tasks
5. **After spawning, STOP** — do not poll or check status

### Agent Instructions Template

Each agent must receive:
```
ROLE: [specific role]
TASK: [exact deliverable]
FILES: [which files to read/modify]
CONSTRAINTS: [what NOT to touch]
OUTPUT: [expected deliverable format]
DEPENDENCIES: [what must be done before/after]
```

### Coordination Patterns

**Fan-Out / Fan-In**: Coordinator distributes tasks, collects results, synthesizes.
```
Coordinator → [Agent A, Agent B, Agent C] → Coordinator synthesizes
```

**Pipeline**: Output of one agent feeds the next.
```
Researcher → Coder → Reviewer → Tester
```

**Peer Review**: Agents review each other's work.
```
Coder A ←→ Coder B (cross-review)
```

### Memory Sharing

Agents coordinate through shared memory:
```bash
# Store shared context
npx @claude-flow/cli@latest memory store \
  --key "swarm/shared/api-contracts" \
  --value '{"endpoints": [...]}' \
  --namespace coordination

# Agents retrieve shared context
npx @claude-flow/cli@latest memory retrieve \
  --key "swarm/shared/api-contracts" \
  --namespace coordination
```

### Anti-Patterns

- **Too many agents**: More than 8 creates coordination overhead that exceeds the parallel benefit
- **Vague instructions**: "Make it better" is not a task. Be specific.
- **Shared file conflicts**: Never assign two agents to modify the same file
- **Polling**: Never check agent status in a loop. Wait for results.
- **Sequential spawning**: Spawning agents one at a time defeats the purpose of a swarm
