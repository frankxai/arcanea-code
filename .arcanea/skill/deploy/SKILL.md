---
name: deploy
description: Deployment to Vercel — environment variables, preview deployments, production releases
trigger: "deploy", "vercel", "production", "release", "hosting", "preview"
gate: Fire
guardian: Draconia
element: Fire
---

# Deploy — Fire Gate (Draconia)

> *"To release into the world is an act of courage. Draconia guards this gate — only the battle-tested may pass."*

## When to Activate

Activate when the task involves:
- Deploying to Vercel (preview or production)
- Configuring environment variables
- Setting up deployment pipelines
- Managing domains and DNS
- Troubleshooting deployment failures

## Instructions

### Pre-Deployment Checklist

- [ ] `pnpm build` succeeds locally with no errors
- [ ] All tests pass
- [ ] No TypeScript errors (`pnpm tsc --noEmit`)
- [ ] Environment variables documented in `.env.local.example`
- [ ] No secrets hardcoded in source
- [ ] Database migrations applied to target environment

### Environment Variables

**Never commit real values.** Use Vercel's environment variable UI or CLI:

```bash
# Set for production
vercel env add NEXT_PUBLIC_SUPABASE_URL production

# Set for preview
vercel env add SUPABASE_SERVICE_KEY preview
```

**Naming conventions:**
- `NEXT_PUBLIC_*` — Exposed to browser (safe for public values only)
- `SUPABASE_SERVICE_KEY` — Server-only, never prefixed with NEXT_PUBLIC

### Deployment Flow

```
Feature Branch → Preview Deployment → Review → Merge to main → Production
```

1. **Preview deployments** auto-created for every PR
2. **Review** the preview URL, check functionality
3. **Production** deploys on merge to `main`

### Vercel Configuration

```json
// vercel.json (only when needed)
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ]
}
```

### Troubleshooting Deployment Failures

1. **Build errors** — Check Vercel build logs. Most common: missing env vars, type errors ignored locally.
2. **Runtime errors** — Check Vercel Runtime Logs. Look for missing env vars at runtime.
3. **Edge function failures** — Check function size limits (1MB for Edge, 50MB for Serverless).
4. **Timeout issues** — Serverless functions timeout at 10s (Hobby) or 60s (Pro). Use streaming for long operations.

### Rollback

If production breaks:
```bash
# List recent deployments
vercel ls

# Promote a previous deployment to production
vercel promote <deployment-url>
```

### Domain Management

- Production: `arcanea.ai` (managed in Vercel)
- Preview: `*.vercel.app` (automatic)
- Custom preview domains possible via Vercel CLI
