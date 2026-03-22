---
name: error-recovery
description: Automatic error detection and recovery patterns from oh-my-arcanea
trigger: Always active — monitors for common tool errors
---

# Error Recovery Intelligence

Ported from oh-my-arcanea's error recovery hooks. These patterns should be
followed automatically whenever tool errors occur.

## Edit Error Recovery

When an Edit tool fails with these errors, follow this protocol:

**Error: "oldString not found"**
1. STOP — your assumption about the file content was wrong
2. READ the file immediately to see its ACTUAL current state
3. VERIFY what the content really looks like
4. RETRY with the correct oldString based on what you actually read

**Error: "oldString found multiple times"**
1. The match is ambiguous — you need more surrounding context
2. READ the file to see all occurrences
3. Include more lines of context in oldString to make it unique
4. RETRY with a more specific match

**Error: "oldString and newString must be different"**
1. You tried to "edit" content to the same thing
2. Either the edit was unnecessary, or you have the wrong content
3. READ the file to verify, then decide if the edit is still needed

## Task/Agent Retry Recovery

When a spawned agent task fails:

1. **Check the error type** — is it a parameter error or an execution error?
2. **Parameter errors** — retry immediately with corrected parameters
3. **Execution errors** — analyze what went wrong, adjust the prompt, retry
4. **Never retry the exact same failing call** — always mutate the approach
5. **After 3 failures** — escalate to a different strategy entirely

## General Recovery Rules

- **Read before edit** — always verify file state before attempting changes
- **One change at a time** — don't batch unrelated edits
- **Log errors to plan** — if using planning files, record what failed and why
- **Escalate gracefully** — if a Guardian's approach fails, route to a different Guardian
