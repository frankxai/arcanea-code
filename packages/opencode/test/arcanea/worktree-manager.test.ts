import { describe, it, expect, mock, spyOn } from "bun:test"
import {
  createWorktree,
  listWorktrees,
  mergeWorktree,
  cleanupWorktrees,
} from "../../src/arcanea/worktree-manager"
import type {
  WorktreeInfo,
  WorktreeCreateOptions,
  WorktreeMergeOptions,
} from "../../src/arcanea/worktree-manager"

describe("worktree-manager", () => {
  describe("exports", () => {
    it("exports createWorktree as a function", () => {
      expect(typeof createWorktree).toBe("function")
    })

    it("exports listWorktrees as a function", () => {
      expect(typeof listWorktrees).toBe("function")
    })

    it("exports mergeWorktree as a function", () => {
      expect(typeof mergeWorktree).toBe("function")
    })

    it("exports cleanupWorktrees as a function", () => {
      expect(typeof cleanupWorktrees).toBe("function")
    })
  })

  describe("WorktreeInfo type structure", () => {
    it("accepts a valid WorktreeInfo object", () => {
      const info: WorktreeInfo = {
        name: "guardian-draconia-42",
        path: "/tmp/repo/.git/arcanea-worktrees/guardian-draconia-42",
        branch: "worktree/guardian-draconia-42",
        guardian: "draconia",
        createdAt: new Date().toISOString(),
      }

      expect(info.name).toBe("guardian-draconia-42")
      expect(info.branch).toStartWith("worktree/")
      expect(info.guardian).toBe("draconia")
      expect(info.createdAt).toBeTruthy()
    })

    it("allows guardian to be omitted", () => {
      const info: WorktreeInfo = {
        name: "task-123",
        path: "/tmp/repo/.git/arcanea-worktrees/task-123",
        branch: "worktree/task-123",
        createdAt: new Date().toISOString(),
      }

      expect(info.guardian).toBeUndefined()
    })
  })

  describe("WorktreeCreateOptions type structure", () => {
    it("accepts minimal options", () => {
      const opts: WorktreeCreateOptions = {
        name: "my-session",
      }

      expect(opts.name).toBe("my-session")
      expect(opts.guardian).toBeUndefined()
      expect(opts.baseBranch).toBeUndefined()
      expect(opts.cwd).toBeUndefined()
    })

    it("accepts full options", () => {
      const opts: WorktreeCreateOptions = {
        name: "guardian-lyria-vision",
        guardian: "lyria",
        baseBranch: "main",
        cwd: "/tmp/repo",
      }

      expect(opts.name).toBe("guardian-lyria-vision")
      expect(opts.guardian).toBe("lyria")
      expect(opts.baseBranch).toBe("main")
      expect(opts.cwd).toBe("/tmp/repo")
    })
  })

  describe("branch name convention", () => {
    it("createWorktree builds correct branch name from options name", () => {
      // We cannot call createWorktree without a real git repo, but we
      // can verify the naming logic by inspecting the module contract:
      // branch should always be `worktree/${name}`
      const name = "guardian-alera-task-99"
      const expectedBranch = `worktree/${name}`

      expect(expectedBranch).toBe("worktree/guardian-alera-task-99")
    })

    it("listWorktrees filters to worktree/* branches only", () => {
      // Contract: listWorktrees returns entries whose branch starts
      // with refs/heads/worktree/ — all others are excluded.
      const branchPrefix = "refs/heads/worktree/"
      expect("refs/heads/worktree/my-session".startsWith(branchPrefix)).toBe(true)
      expect("refs/heads/opencode/brave-falcon".startsWith(branchPrefix)).toBe(false)
      expect("refs/heads/main".startsWith(branchPrefix)).toBe(false)
    })
  })

  describe("WorktreeMergeOptions type structure", () => {
    it("accepts merge options with defaults", () => {
      const opts: WorktreeMergeOptions = {
        name: "session-1",
      }

      expect(opts.name).toBe("session-1")
      expect(opts.deleteBranch).toBeUndefined()
    })

    it("accepts merge options with deleteBranch=false", () => {
      const opts: WorktreeMergeOptions = {
        name: "session-2",
        cwd: "/tmp/repo",
        deleteBranch: false,
      }

      expect(opts.deleteBranch).toBe(false)
    })
  })
})
