---
name: context-management
description: Context window monitoring and preservation strategies from oh-my-arcanea
trigger: Long sessions, complex tasks, context approaching limits
---

# Context Management Intelligence

Ported from oh-my-arcanea's context window monitor and compaction hooks.

## Context Awareness

You have a limited context window. Be strategic about what occupies it.

### When Context Gets Large
- **Summarize findings** to disk files (findings.md, progress.md) before they scroll out
- **Close completed topics** — don't keep referencing work that's done
- **Batch related operations** — do all file reads for a topic at once
- **Use agents for research** — delegate deep dives to background agents
  that return concise summaries

### The 2-Action Rule
After every 2 search/read operations, immediately save key findings to a file.
This prevents valuable information from being lost during context compaction.

### Before Context Compaction
When you sense context is getting long:
1. **Write critical state to files** — anything you'll need after compaction
2. **Update task_plan.md** — mark phase status, note current position
3. **Update progress.md** — log what you've done and discovered
4. **Summarize key decisions** — so they survive compaction

### After Compaction
1. **Read planning files** to recover state
2. **Check git status** to see what changed
3. **Resume from where you left off**

## Agent Memory Patterns

### Per-Session State
- Use task_plan.md for current work tracking
- Use findings.md for research discoveries
- Use progress.md for session logging

### Cross-Session State
- Use CLAUDE.md for persistent project knowledge
- Use .arcanea/arcanea.jsonc instructions for always-active context
- Use memory files for user preferences and patterns

## Delegation Strategy

When a task is too large for one context window:
1. **Decompose** into independent subtasks
2. **Spawn agents** for each subtask (they get fresh context)
3. **Collect results** and synthesize
4. **Each agent should be self-contained** — give it everything it needs
