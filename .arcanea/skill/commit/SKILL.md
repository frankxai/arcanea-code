---
name: commit
description: Git commit workflow — conventional commits, meaningful messages, branch strategy
trigger: "commit", "push", "git", "branch", "merge"
gate: Voice
guardian: Alera
element: Wind
---

# Commit — Voice Gate (Alera)

> *"Words spoken at the Voice Gate echo through all time. A commit message is a promise to your future self."*

## When to Activate

Activate when the task involves:
- Creating git commits
- Writing commit messages
- Managing branches
- Preparing code for push or PR

## Instructions

### Conventional Commit Format

```
type(scope): concise description

Optional body explaining WHY, not WHAT.
The diff shows what changed — the message explains the reasoning.

Co-Authored-By: claude-flow <ruv@ruv.net>
```

### Commit Types

| Type | When |
|------|------|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `style` | Formatting, whitespace (no logic change) |
| `docs` | Documentation only |
| `test` | Adding or updating tests |
| `chore` | Build, tooling, config changes |
| `sec` | Security fix or hardening |

### Scope Examples

- `feat(gates)`: Gate progression feature
- `fix(auth)`: Authentication bug fix
- `refactor(chat)`: Chat module restructure
- `perf(images)`: Image loading optimization

### Message Quality Rules

1. **Imperative mood.** "Add gate progress" not "Added gate progress"
2. **Under 72 characters** for the subject line
3. **No period** at the end of the subject line
4. **Body explains why** the change was necessary, not what changed
5. **Reference issues** when applicable: `Closes #123`

### Pre-Commit Checklist

Before committing, verify:
- [ ] `pnpm build` succeeds
- [ ] Tests pass
- [ ] No `console.log` left in production code
- [ ] No secrets or `.env` files staged
- [ ] No unintended files staged (`git status` check)
- [ ] Commit message follows conventional format

### Branch Strategy

- `main` — Production. Always deployable.
- `dev-*` — Development branches for features or sprints
- `fix/*` — Hotfix branches
- `feat/*` — Feature branches

### What NOT to Commit

- `.env` files with real values
- `node_modules/`
- Build artifacts (`dist/`, `.next/`)
- Large binary files
- Editor-specific config (`.vscode/settings.json` with personal prefs)
- Temporary debug code
