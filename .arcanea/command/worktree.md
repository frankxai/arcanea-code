---
name: worktree
description: Manage git worktrees for parallel Guardian sessions
---

# /worktree — Parallel Session Isolation

Manage isolated git worktrees for parallel agent work.

## Commands

### /worktree create <name>
Create a new isolated worktree for an agent session.
- Creates `.git/worktrees/<name>/`
- Checks out branch `worktree/<name>` from current HEAD
- Returns the worktree path for agent use

### /worktree list
List all active worktrees with their branch and status.

### /worktree merge <name>
Merge a worktree branch back into the current branch.
- Merges `worktree/<name>` into HEAD
- Cleans up the worktree

### /worktree cleanup
Remove all stale/orphaned worktrees.

## Usage Pattern
When a Guardian needs to work in parallel:
1. `/worktree create guardian-draconia-task-123`
2. Agent works in isolated worktree
3. `/worktree merge guardian-draconia-task-123`

Each Guardian gets their own isolated workspace. No file conflicts.
