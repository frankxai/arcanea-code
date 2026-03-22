/**
 * Arcanea Worktree Manager
 *
 * Provides git worktree isolation for parallel Guardian sessions.
 * Each agent session gets its own worktree, preventing file conflicts
 * during parallel execution.
 *
 * This module wraps git worktree commands in a Guardian-aware API so
 * that the orchestrator can spin up isolated workspaces, track which
 * Guardian owns each worktree, and tear everything down cleanly when
 * the session ends.
 */

import { execSync } from "child_process"
import path from "path"
import fs from "fs"

export interface WorktreeInfo {
  /** Short identifier for this worktree */
  name: string
  /** Absolute path to the worktree directory */
  path: string
  /** Git branch backing this worktree (e.g. worktree/guardian-draconia-42) */
  branch: string
  /** Optional Guardian assigned to this worktree */
  guardian?: string
  /** ISO-8601 timestamp of creation */
  createdAt: string
}

export interface WorktreeCreateOptions {
  /** Name for the worktree (used as branch suffix) */
  name: string
  /** Optional Guardian assignment */
  guardian?: string
  /** Base branch to create from (defaults to HEAD) */
  baseBranch?: string
  /** Working directory of the main repo */
  cwd?: string
}

export interface WorktreeMergeOptions {
  /** Name of the worktree to merge */
  name: string
  /** Working directory of the main repo */
  cwd?: string
  /** Delete branch after merge (default true) */
  deleteBranch?: boolean
}

/**
 * Resolve the worktree storage directory for a given repo root.
 * Worktrees are stored under `.git/arcanea-worktrees/` to keep them
 * separate from the standard git worktree list location.
 */
function worktreeRoot(cwd: string): string {
  return path.join(cwd, ".git", "arcanea-worktrees")
}

/**
 * Create a new git worktree for an isolated agent session.
 *
 * @throws {Error} If the git worktree command fails
 */
export function createWorktree(options: WorktreeCreateOptions): WorktreeInfo {
  const cwd = options.cwd || process.cwd()
  const branchName = `worktree/${options.name}`
  const worktreePath = path.join(worktreeRoot(cwd), options.name)

  // Ensure parent directory exists
  fs.mkdirSync(path.dirname(worktreePath), { recursive: true })

  // Create worktree with a new branch from the specified base
  const base = options.baseBranch || "HEAD"
  execSync(`git worktree add -b "${branchName}" "${worktreePath}" ${base}`, {
    cwd,
    stdio: "pipe",
  })

  return {
    name: options.name,
    path: worktreePath,
    branch: branchName,
    guardian: options.guardian,
    createdAt: new Date().toISOString(),
  }
}

/**
 * List all active arcanea-managed worktrees.
 *
 * Filters the full git worktree list to only those whose branch starts
 * with `refs/heads/worktree/`, matching the convention used by
 * {@link createWorktree}.
 */
export function listWorktrees(cwd?: string): WorktreeInfo[] {
  const dir = cwd || process.cwd()
  const output = execSync("git worktree list --porcelain", {
    cwd: dir,
    stdio: "pipe",
  }).toString()

  const worktrees: WorktreeInfo[] = []
  let current: Partial<WorktreeInfo> = {}

  for (const line of output.split("\n")) {
    if (line.startsWith("worktree ")) {
      // Flush previous entry
      if (current.path) {
        worktrees.push({
          name: current.name || path.basename(current.path),
          path: current.path,
          branch: current.branch || "",
          createdAt: current.createdAt || "",
        })
      }
      current = {
        path: line.slice("worktree ".length),
        name: path.basename(line.slice("worktree ".length)),
      }
    } else if (line.startsWith("branch ")) {
      current.branch = line.slice("branch ".length)
    }
  }

  // Flush final entry
  if (current.path) {
    worktrees.push({
      name: current.name || path.basename(current.path),
      path: current.path,
      branch: current.branch || "",
      createdAt: current.createdAt || "",
    })
  }

  // Only return arcanea-managed worktrees (branch pattern: worktree/*)
  return worktrees.filter((w) =>
    w.branch.startsWith("refs/heads/worktree/"),
  )
}

/**
 * Merge a worktree branch back into the current branch and clean up.
 *
 * Performs a no-ff merge so the worktree session is visible in history,
 * then removes the worktree directory and optionally deletes the branch.
 *
 * @throws {Error} If the merge or cleanup fails
 */
export function mergeWorktree(nameOrOptions: string | WorktreeMergeOptions, cwd?: string): void {
  const opts: WorktreeMergeOptions =
    typeof nameOrOptions === "string"
      ? { name: nameOrOptions, cwd }
      : nameOrOptions

  const dir = opts.cwd || cwd || process.cwd()
  const branchName = `worktree/${opts.name}`
  const worktreePath = path.join(worktreeRoot(dir), opts.name)

  // Merge the branch with a descriptive commit message
  execSync(
    `git merge "${branchName}" --no-ff -m "merge: ${opts.name} worktree session"`,
    { cwd: dir, stdio: "pipe" },
  )

  // Remove the worktree
  execSync(`git worktree remove "${worktreePath}" --force`, {
    cwd: dir,
    stdio: "pipe",
  })

  // Delete the branch unless explicitly told not to
  if (opts.deleteBranch !== false) {
    execSync(`git branch -d "${branchName}"`, {
      cwd: dir,
      stdio: "pipe",
    })
  }
}

/**
 * Clean up all stale/orphaned worktrees.
 *
 * Runs `git worktree prune` first, then checks each remaining
 * arcanea-managed worktree for a missing directory and force-removes it.
 *
 * @returns The number of stale worktrees that were cleaned up
 */
export function cleanupWorktrees(cwd?: string): number {
  const dir = cwd || process.cwd()

  // Let git remove entries whose directories no longer exist
  execSync("git worktree prune", { cwd: dir, stdio: "pipe" })

  const remaining = listWorktrees(dir)
  let cleaned = 0

  for (const wt of remaining) {
    if (!fs.existsSync(wt.path)) {
      try {
        execSync(`git worktree remove "${wt.path}" --force`, {
          cwd: dir,
          stdio: "pipe",
        })
        cleaned++
      } catch {
        // Already pruned or otherwise gone — not an error
      }
    }
  }

  return cleaned
}
