---
name: database
description: Database design with PostgreSQL, Supabase, RLS policies, and migration patterns
trigger: "database", "schema", "migration", "supabase", "sql", "table", "rls"
gate: Foundation
guardian: Lyssandria
element: Earth
---

# Database — Foundation Gate (Lyssandria)

> *"The deep roots of Kaelith hold all memory. What is stored with care endures through every cycle of the Arc."*

## When to Activate

Activate when the task involves:
- Designing or modifying database schemas
- Writing SQL migrations
- Configuring Row Level Security policies
- Optimizing queries or indexes
- Setting up Supabase features (Auth, Realtime, Storage)

## Instructions

### Schema Design Principles

1. **Normalize first, denormalize for performance.** Start at 3NF. Add materialized views or denormalized columns only when queries prove slow.
2. **UUIDs for primary keys.** Use `gen_random_uuid()` as default.
3. **Timestamps on every table.** Always include `created_at` and `updated_at` with triggers.
4. **Soft deletes.** Use `deleted_at` timestamp instead of `DELETE` for user-facing data.
5. **Enums as check constraints**, not PostgreSQL ENUM types (easier to migrate).

### Table Naming

- Snake_case, plural: `user_profiles`, `gate_progress`, `world_elements`
- Junction tables: `user_worlds`, `element_gates`
- Prefix audit tables: `audit_user_actions`

### Row Level Security (RLS)

Every table with user data MUST have RLS enabled:

```sql
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users read own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);
```

**RLS Checklist:**
- SELECT: Who can read? Own data? Public data? Role-based?
- INSERT: Who can create? Validate foreign keys match auth.uid().
- UPDATE: Who can modify? Only own records? Admin override?
- DELETE: Who can delete? Prefer soft deletes.

### Migration Patterns

```sql
-- Always reversible
-- UP
ALTER TABLE users ADD COLUMN display_name TEXT;

-- DOWN
ALTER TABLE users DROP COLUMN display_name;
```

- One concern per migration file
- Name format: `YYYYMMDDHHMMSS_description.sql`
- Never modify a deployed migration — create a new one
- Test migrations against a copy of production data

### Indexing Strategy

- Index all foreign keys
- Index columns used in WHERE clauses
- Use partial indexes for filtered queries: `WHERE deleted_at IS NULL`
- Use GIN indexes for JSONB columns and full-text search
- Monitor with `pg_stat_user_indexes` — drop unused indexes

### Supabase-Specific

- Use `supabase gen types typescript` to keep TypeScript types in sync
- Leverage Realtime subscriptions for live data (chat, notifications)
- Use Edge Functions for complex server-side logic
- Storage buckets for user uploads with RLS on the bucket
