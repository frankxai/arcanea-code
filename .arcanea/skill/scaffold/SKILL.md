---
name: scaffold
description: Project scaffolding for Next.js App Router with Arcanean Design System and Supabase
trigger: "scaffold", "create project", "init", "new app", "bootstrap"
gate: Foundation
guardian: Lyssandria
element: Earth
---

# Scaffold — Foundation Gate (Lyssandria)

> *"Every realm begins with a single stone placed with intention."*

## When to Activate

Activate when the task involves:
- Creating a new project or application
- Setting up a new module or feature area
- Bootstrapping development environment
- Initializing a new package in the monorepo

## Instructions

### Next.js App Router Structure

Always scaffold with the App Router pattern:

```
app/
  (marketing)/          # Public pages group
    page.tsx            # Landing
    about/page.tsx
  (app)/                # Authenticated area
    layout.tsx          # With auth guard
    dashboard/page.tsx
  api/                  # API routes
    auth/[...nextauth]/route.ts
  layout.tsx            # Root layout
  globals.css
```

### Required Setup Steps

1. **TypeScript Config** — Strict mode enabled, paths configured for `@/` imports.
2. **Tailwind CSS** — Include Arcanean design tokens:
   - Colors: Void `#0a0a0f`, Crystal `#7fffd4`, Fire `#ff6b35`, Gold `#ffd700`, Cosmic `#78a6ff`
   - Fonts: Cinzel for headings, Crimson Pro for body
3. **Supabase Client** — Initialize with `@supabase/ssr` for server components.
4. **Environment Variables** — Create `.env.local.example` (never `.env` with real values).
5. **ESLint + Prettier** — Consistent formatting from the start.

### File Templates

Every new component file:
```typescript
// Server Component (default)
export default function ComponentName() {
  return <div>...</div>;
}

// Client Component (only when needed)
'use client';
import { useState } from 'react';
export default function InteractiveComponent() { ... }
```

Every new API route:
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Validate input
  // Process
  // Return typed response
  return NextResponse.json({ data });
}
```

### Monorepo Conventions

- Packages live in `packages/` with `@arcanea/` scope
- Apps live in `apps/` — each is a deployable unit
- Shared types in `packages/types/`
- Shared UI in `packages/ui/`

### Checklist Before Done

- [ ] `pnpm install` succeeds
- [ ] `pnpm build` succeeds
- [ ] `.env.local.example` created with all required vars (no real values)
- [ ] TypeScript strict mode enabled
- [ ] Tailwind configured with Arcanean tokens
- [ ] Basic layout renders without errors
