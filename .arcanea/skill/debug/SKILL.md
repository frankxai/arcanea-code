---
name: debug
description: Debugging with the scientific method — hypothesis, test, verify, fix
trigger: "debug", "fix", "error", "bug", "broken", "crash", "failing", "issue"
gate: Sight
guardian: Lyria
element: Wind
---

# Debug — Sight Gate (Lyria)

> *"Lyria sees what others cannot. The debugger's gift is not cleverness — it is the patience to truly look."*

## When to Activate

Activate when the task involves:
- Investigating errors or unexpected behavior
- Fixing bugs reported by users or tests
- Diagnosing performance issues
- Understanding why code behaves differently than expected

## Instructions

### The Scientific Method of Debugging

**Never guess. Always hypothesize, test, verify.**

#### Step 1: Reproduce
- Can you make the bug happen reliably?
- What are the exact steps? What input triggers it?
- Does it happen in all environments or only specific ones?
- If you cannot reproduce it, gather more data before proceeding.

#### Step 2: Isolate
- **Narrow the scope.** Which file? Which function? Which line?
- **Binary search.** If unsure where the bug is, comment out half the code. Still broken? It is in the remaining half. Repeat.
- **Check recent changes.** `git log --oneline -20` and `git diff HEAD~5` to find what changed.

#### Step 3: Hypothesize
- Form a specific, testable hypothesis: "The error occurs because `user` is null when `fetchProfile` returns before auth completes."
- Write it down. A vague hunch is not a hypothesis.

#### Step 4: Test the Hypothesis
- Add targeted logging or breakpoints at the suspected location
- Modify the suspected cause and observe if behavior changes
- Write a failing test that captures the bug

#### Step 5: Fix
- Make the minimal change that fixes the root cause
- Do not fix symptoms — fix causes
- Add a test that would have caught this bug
- Verify the fix does not break other things

#### Step 6: Reflect
- Why did this bug exist? Missing validation? Race condition? Incorrect assumption?
- Could similar bugs exist elsewhere? Search for the same pattern.
- Should a lint rule or type constraint prevent this class of bug?

### Common Bug Categories

| Category | Symptoms | First Check |
|----------|----------|-------------|
| **Null/Undefined** | "Cannot read property of undefined" | Add optional chaining, check data flow |
| **Race Condition** | Intermittent failures, works on retry | Check async ordering, add loading states |
| **State Mismatch** | UI shows stale data | Check re-render triggers, state updates |
| **Type Coercion** | Unexpected comparisons | Use `===`, check TypeScript strict mode |
| **Env Variables** | Works locally, fails in deploy | Check Vercel env var configuration |
| **Import Errors** | Module not found | Check path casing (case-sensitive on Linux) |

### Tools

- **Browser DevTools**: Network tab for API issues, Console for errors, Sources for breakpoints
- **React DevTools**: Component tree, props/state inspection, profiler
- **`git bisect`**: Find the exact commit that introduced the bug
- **TypeScript compiler**: `pnpm tsc --noEmit` catches type errors the editor might miss
- **Vercel Logs**: Runtime logs for production issues

### Anti-Patterns

- **Shotgun debugging**: Making random changes hoping something works. Stop. Think.
- **Print-and-pray**: Adding `console.log` everywhere without a hypothesis. Be targeted.
- **Fix-and-forget**: Fixing without adding a test. The bug will return.
- **Blame-driven debugging**: "It must be the library's fault." Check your code first.
