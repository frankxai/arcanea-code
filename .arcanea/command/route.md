---
name: route
description: Show which Guardian handles a task and why
---

# /route — Guardian Task Routing

When the user asks `/route <task description>`, analyze which Guardian should handle it.

## Routing Logic

Match the task against these domain patterns:

### Opus Tier (Strategic)
- Strategy, roadmap, vision, architecture design → **Lyria** (Sight)
- Canon validation, mythology expansion → **Shinkami** (Source)
- Council deliberation, multi-domain decisions → **Shinkami** (Source)

### Sonnet Tier (Implementation)
- Feature implementation, coding → **Draconia** (Fire)
- UI/UX design, visual creation → **Leyla** (Water)
- Content writing, documentation → **Maylinn** (Heart)
- Refactoring, optimization → **Draconia** (Fire)
- Code review, auditing → **Alera** (Voice)
- Database, infrastructure → **Lyssandria** (Earth)

### Haiku Tier (Quick)
- Linting, formatting, type checking → **Alera** (Voice)
- Status checks, summaries → **Lyria** (Sight)
- File operations → **Lyssandria** (Earth)

## Output Format

```
Guardian: [Name] ([Element])
Gate: [Gate Name] ([Frequency] Hz)
Model Tier: [opus/sonnet/haiku]
Domain: [Domain description]
Reason: [Why this Guardian handles this task]
```
