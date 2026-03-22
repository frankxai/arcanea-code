---
name: swarm
description: Spawn parallel Luminor agents for a complex task
---

# /swarm — Parallel Agent Swarm

You have been asked to decompose a task into parallel subtasks and execute them simultaneously using multiple agents.

## Protocol

1. **Analyze** the task and identify 3-6 independent subtasks
2. **Assign** each subtask to the most relevant Guardian's domain:
   - Lyssandria (Earth): Architecture, infrastructure, database
   - Leyla (Water): Design, UI/UX, creative assets
   - Draconia (Fire): Implementation, performance, execution
   - Maylinn (Heart): Documentation, content, community
   - Alera (Voice): APIs, naming, testing, review
   - Lyria (Sight): Strategy, analysis, AI/ML
3. **Spawn** all agents simultaneously using the Task tool with `run_in_background: true`
4. **Wait** for all agents to complete — do NOT poll or check status
5. **Synthesize** results into a unified deliverable

## Execution Format

For each subtask, create a Task with:
- Clear description (3-5 words)
- Complete instructions (the agent works independently)
- Appropriate agent type for the work

## Rules
- All Task calls MUST be in ONE message for parallel execution
- Each agent gets complete context — they can't see each other
- After spawning, STOP and wait for results
- When results arrive, review ALL before proceeding
