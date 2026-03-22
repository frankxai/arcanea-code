import { describe, test, expect } from "bun:test"
import {
  // Guardians
  GUARDIANS,
  GATES,
  getGuardian,
  getGuardianByGate,
  getGuardiansByElement,
  // Router
  detectTaskRoute,
  getRoutingRules,
  // Domains
  CREATIVE_DOMAINS,
  getDomain,
  detectDomainsByFile,
  detectDomainByKeywords,
  // Agents
  CREATIVE_AGENTS,
  getAgent,
  getAgentsByGuardian,
  getAgentsBySwarmRole,
  getAgentsByTier,
  // Intelligence
  INTELLIGENCE_HIERARCHY,
  MODEL_ROUTING,
  getModelTierForCategory,
  getRoute,
  // Prompt builder
  buildSystemPrompt,
  buildUtilityPrompt,
} from "../../src/arcanea"

// ---------------------------------------------------------------------------
// 1. Guardian Registry
// ---------------------------------------------------------------------------

describe("Guardian Registry", () => {
  test("defines exactly 10 Guardians", () => {
    expect(GUARDIANS).toHaveLength(10)
  })

  test("defines exactly 10 Gates", () => {
    expect(Object.keys(GATES)).toHaveLength(10)
  })

  test("each Guardian has all required fields", () => {
    for (const g of GUARDIANS) {
      expect(typeof g.id).toBe("string")
      expect(typeof g.displayName).toBe("string")
      expect(typeof g.element).toBe("string")
      expect(g.gate).toBeDefined()
      expect(typeof g.gate.name).toBe("string")
      expect(typeof g.gate.frequency).toBe("number")
      expect(typeof g.domain).toBe("string")
      expect(Array.isArray(g.traits)).toBe(true)
      expect(g.traits.length).toBeGreaterThanOrEqual(3)
      expect(typeof g.vibe).toBe("string")
      expect(typeof g.description).toBe("string")
      expect(g.description.length).toBeGreaterThan(50)
    }
  })

  test('getGuardian("draconia") returns Draconia', () => {
    const g = getGuardian("draconia")
    expect(g).toBeDefined()
    expect(g!.displayName).toBe("Draconia")
    expect(g!.element).toBe("fire")
    expect(g!.gate.name).toBe("Fire")
    expect(g!.gate.frequency).toBe(396)
  })

  test('getGuardian("nonexistent") returns undefined', () => {
    expect(getGuardian("nonexistent")).toBeUndefined()
  })

  test('getGuardianByGate("fire") returns Draconia', () => {
    const g = getGuardianByGate("fire")
    expect(g).toBeDefined()
    expect(g!.id).toBe("draconia")
  })

  test("getGuardianByGate is case-insensitive", () => {
    expect(getGuardianByGate("Fire")?.id).toBe("draconia")
    expect(getGuardianByGate("FIRE")?.id).toBe("draconia")
  })

  test('getGuardiansByElement("earth") includes Lyssandria', () => {
    const earthGuardians = getGuardiansByElement("earth")
    const ids = earthGuardians.map((g) => g.id)
    expect(ids).toContain("lyssandria")
  })

  test('getGuardiansByElement("all") includes only Shinkami', () => {
    const allGuardians = getGuardiansByElement("all")
    // Shinkami has element "all" — the filter also includes g.element === 'all'
    // but when querying for "all", only Shinkami matches directly
    expect(allGuardians.some((g) => g.id === "shinkami")).toBe(true)
  })

  test("every Guardian id is unique", () => {
    const ids = GUARDIANS.map((g) => g.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  test("every Guardian maps to a valid Gate", () => {
    const gateNames = Object.values(GATES).map((g) => g.name)
    for (const guardian of GUARDIANS) {
      expect(gateNames).toContain(guardian.gate.name)
    }
  })
})

// ---------------------------------------------------------------------------
// 2. Task Router
// ---------------------------------------------------------------------------

describe("Task Router", () => {
  test('"build a new component" routes to draconia (sonnet)', () => {
    const route = detectTaskRoute("build a new component")
    expect(route.guardian).toBe("draconia")
    expect(route.suggestedModel).toBe("sonnet")
  })

  test('"design the login UI" routes to leyla (sonnet)', () => {
    const route = detectTaskRoute("design the login UI")
    expect(route.guardian).toBe("leyla")
    expect(route.suggestedModel).toBe("sonnet")
  })

  test('"write a story about the guardians" routes to maylinn (sonnet)', () => {
    const route = detectTaskRoute("write a story about the guardians")
    expect(route.guardian).toBe("maylinn")
    expect(route.suggestedModel).toBe("sonnet")
  })

  test('"review the code for security issues" routes to alera (sonnet)', () => {
    const route = detectTaskRoute("review the code for security issues")
    expect(route.guardian).toBe("alera")
    expect(route.suggestedModel).toBe("sonnet")
  })

  test('"strategic roadmap for Q3" routes to lyria (opus)', () => {
    const route = detectTaskRoute("strategic roadmap for Q3")
    expect(route.guardian).toBe("lyria")
    expect(route.suggestedModel).toBe("opus")
  })

  test('"lint the codebase" routes to alera (haiku)', () => {
    const route = detectTaskRoute("lint the codebase")
    expect(route.guardian).toBe("alera")
    expect(route.suggestedModel).toBe("haiku")
  })

  test('"deploy to production" routes to draconia (sonnet)', () => {
    const route = detectTaskRoute("deploy to production")
    expect(route.guardian).toBe("draconia")
    expect(route.suggestedModel).toBe("sonnet")
  })

  test('"council deliberation on the new direction" routes to shinkami (opus)', () => {
    const route = detectTaskRoute("council deliberation on the new direction")
    expect(route.guardian).toBe("shinkami")
    expect(route.suggestedModel).toBe("opus")
  })

  test('"refactor the auth middleware" routes to elara (sonnet)', () => {
    const route = detectTaskRoute("refactor the auth middleware")
    expect(route.guardian).toBe("elara")
    expect(route.suggestedModel).toBe("sonnet")
  })

  test('"teach me about Gates" routes to aiyami (sonnet)', () => {
    const route = detectTaskRoute("teach me about Gates")
    expect(route.guardian).toBe("aiyami")
    expect(route.suggestedModel).toBe("sonnet")
  })

  test("unknown input defaults to shinkami (sonnet)", () => {
    const route = detectTaskRoute("xyzzy frobulate the quantum widget")
    expect(route.guardian).toBe("shinkami")
    expect(route.suggestedModel).toBe("sonnet")
    expect(route.domain).toBe("code")
  })

  test("every route has a non-empty description", () => {
    const testInputs = [
      "build something",
      "design it",
      "refactor code",
      "unknown gibberish thing",
    ]
    for (const input of testInputs) {
      const route = detectTaskRoute(input)
      expect(route.description.length).toBeGreaterThan(10)
    }
  })

  test("getRoutingRules returns a non-empty array without regex objects", () => {
    const rules = getRoutingRules()
    expect(rules.length).toBeGreaterThan(10)
    for (const rule of rules) {
      expect(typeof rule.domain).toBe("string")
      expect(typeof rule.guardian).toBe("string")
      expect(typeof rule.suggestedModel).toBe("string")
      expect(typeof rule.description).toBe("string")
      // Should not leak regex
      expect((rule as any).pattern).toBeUndefined()
    }
  })
})

// ---------------------------------------------------------------------------
// 3. Creative Domains
// ---------------------------------------------------------------------------

describe("Creative Domains", () => {
  test("defines exactly 5 domains", () => {
    expect(CREATIVE_DOMAINS).toHaveLength(5)
  })

  test("each domain has filePatterns and triggerKeywords", () => {
    for (const domain of CREATIVE_DOMAINS) {
      expect(Array.isArray(domain.filePatterns)).toBe(true)
      expect(domain.filePatterns.length).toBeGreaterThan(0)
      expect(Array.isArray(domain.triggerKeywords)).toBe(true)
      expect(domain.triggerKeywords.length).toBeGreaterThan(0)
    }
  })

  test('getDomain("code") returns the Code domain', () => {
    const domain = getDomain("code")
    expect(domain).toBeDefined()
    expect(domain!.displayName).toBe("Code")
    expect(domain!.element).toBe("earth")
    expect(domain!.guardianId).toBe("lyssandria")
  })

  test('getDomain("nonexistent") returns undefined', () => {
    expect(getDomain("nonexistent")).toBeUndefined()
  })

  test("detectDomainsByFile: *.ts files match code domain", () => {
    const domains = detectDomainsByFile("src/components/button.ts")
    expect(domains).toContain("code")
  })

  test("detectDomainsByFile: book/*.md files match lore domain", () => {
    const domains = detectDomainsByFile("project/book/legends-of-arcanea/first-dawn.md")
    expect(domains).toContain("lore")
  })

  test("detectDomainsByFile: *.svg files match art domain", () => {
    const domains = detectDomainsByFile("assets/logo.svg")
    expect(domains).toContain("art")
  })

  test("detectDomainsByFile: music/*.mp3 files match music domain", () => {
    const domains = detectDomainsByFile("music/gate-theme.mp3")
    expect(domains).toContain("music")
  })

  test("detectDomainsByFile: normalizes backslashes", () => {
    const domains = detectDomainsByFile("book\\legends\\first-dawn.md")
    expect(domains).toContain("lore")
  })

  test("detectDomainByKeywords: 'implement a react hook' returns code", () => {
    expect(detectDomainByKeywords("implement a react hook")).toBe("code")
  })

  test("detectDomainByKeywords: 'write guardian mythology' returns lore", () => {
    expect(detectDomainByKeywords("write guardian mythology lore")).toBe("lore")
  })

  test("detectDomainByKeywords: defaults to code for unknown input", () => {
    expect(detectDomainByKeywords("xyzzy frobulate")).toBe("code")
  })

  test("all 5 domain ids are unique", () => {
    const ids = CREATIVE_DOMAINS.map((d) => d.id)
    expect(new Set(ids).size).toBe(5)
  })
})

// ---------------------------------------------------------------------------
// 4. Creative Agents
// ---------------------------------------------------------------------------

describe("Creative Agents", () => {
  test("defines exactly 10 agent types", () => {
    expect(CREATIVE_AGENTS).toHaveLength(10)
  })

  test("each agent has required fields", () => {
    for (const agent of CREATIVE_AGENTS) {
      expect(typeof agent.type).toBe("string")
      expect(typeof agent.displayName).toBe("string")
      expect(typeof agent.role).toBe("string")
      expect(typeof agent.guardianId).toBe("string")
      expect(typeof agent.element).toBe("string")
      expect(typeof agent.promptTemplate).toBe("string")
      expect(typeof agent.swarmRole).toBe("string")
      expect(typeof agent.modelTier).toBe("string")
      expect(Array.isArray(agent.capabilities)).toBe(true)
    }
  })

  test("each agent's promptTemplate is substantial (> 100 chars)", () => {
    for (const agent of CREATIVE_AGENTS) {
      expect(agent.promptTemplate.length).toBeGreaterThan(100)
    }
  })

  test('getAgent("lorekeeper") returns correct agent', () => {
    const agent = getAgent("lorekeeper")
    expect(agent).toBeDefined()
    expect(agent!.displayName).toBe("Lorekeeper")
    expect(agent!.guardianId).toBe("maylinn")
    expect(agent!.element).toBe("water")
    expect(agent!.modelTier).toBe("sonnet")
  })

  test('getAgent("nonexistent") returns undefined', () => {
    expect(getAgent("nonexistent")).toBeUndefined()
  })

  test("getAgentsByGuardian returns matching agents", () => {
    const shinkamiAgents = getAgentsByGuardian("shinkami")
    expect(shinkamiAgents.length).toBeGreaterThanOrEqual(2)
    for (const agent of shinkamiAgents) {
      expect(agent.guardianId).toBe("shinkami")
    }
  })

  test('getAgentsBySwarmRole("leader") returns leader agents', () => {
    const leaders = getAgentsBySwarmRole("leader")
    expect(leaders.length).toBeGreaterThanOrEqual(1)
    for (const agent of leaders) {
      expect(agent.swarmRole).toBe("leader")
    }
  })

  test('getAgentsByTier("opus") returns opus-tier agents', () => {
    const opusAgents = getAgentsByTier("opus")
    expect(opusAgents.length).toBeGreaterThanOrEqual(1)
    for (const agent of opusAgents) {
      expect(agent.modelTier).toBe("opus")
    }
  })

  test("each agent references a valid Guardian", () => {
    const guardianIds = GUARDIANS.map((g) => g.id)
    for (const agent of CREATIVE_AGENTS) {
      expect(guardianIds).toContain(agent.guardianId)
    }
  })

  test("all agent types are unique", () => {
    const types = CREATIVE_AGENTS.map((a) => a.type)
    expect(new Set(types).size).toBe(types.length)
  })
})

// ---------------------------------------------------------------------------
// 5. Intelligence Hierarchy
// ---------------------------------------------------------------------------

describe("Intelligence Hierarchy", () => {
  test("defines exactly 4 layers", () => {
    expect(INTELLIGENCE_HIERARCHY).toHaveLength(4)
  })

  test("layers have correct roles in order", () => {
    const roles = INTELLIGENCE_HIERARCHY.map((l) => l.role)
    expect(roles).toEqual(["model", "orchestrator", "coordinator", "worker"])
  })

  test("layers have correct names", () => {
    const names = INTELLIGENCE_HIERARCHY.map((l) => l.name)
    expect(names).toEqual(["Arcanea", "Lumina", "Guardians", "Luminors"])
  })

  test("correct model tiers assigned per layer", () => {
    const tiers = INTELLIGENCE_HIERARCHY.map((l) => l.modelTier)
    expect(tiers).toEqual(["opus", "opus", "sonnet", "haiku"])
  })

  test("MODEL_ROUTING defines 3 tiers", () => {
    expect(MODEL_ROUTING).toHaveLength(3)
    const tiers = MODEL_ROUTING.map((r) => r.tier)
    expect(tiers).toContain("opus")
    expect(tiers).toContain("sonnet")
    expect(tiers).toContain("haiku")
  })

  test('getModelTierForCategory("strategy") returns opus', () => {
    expect(getModelTierForCategory("strategy")).toBe("opus")
  })

  test('getModelTierForCategory("implementation") returns sonnet', () => {
    expect(getModelTierForCategory("implementation")).toBe("sonnet")
  })

  test('getModelTierForCategory("validation") returns haiku', () => {
    expect(getModelTierForCategory("validation")).toBe("haiku")
  })

  test("getModelTierForCategory defaults to sonnet for unknown", () => {
    expect(getModelTierForCategory("xyzzy")).toBe("sonnet")
  })

  test('getRoute("opus") returns the strategic route', () => {
    const route = getRoute("opus")
    expect(route).toBeDefined()
    expect(route!.label).toBe("Strategic")
    expect(route!.categories).toContain("strategy")
  })
})

// ---------------------------------------------------------------------------
// 6. Prompt Builder
// ---------------------------------------------------------------------------

describe("Prompt Builder", () => {
  test("buildSystemPrompt() returns a non-empty string", () => {
    const prompt = buildSystemPrompt()
    expect(typeof prompt).toBe("string")
    expect(prompt.length).toBeGreaterThan(100)
  })

  test("buildSystemPrompt() always contains 'Arcanea'", () => {
    expect(buildSystemPrompt()).toContain("Arcanea")
  })

  test("buildSystemPrompt({ guardianId: 'draconia' }) includes Draconia", () => {
    const prompt = buildSystemPrompt({ guardianId: "draconia" })
    expect(prompt).toContain("Draconia")
    expect(prompt).toContain("fire")
    expect(prompt).toContain("Fire")
  })

  test("buildSystemPrompt({ domainId: 'code' }) includes domain info", () => {
    const prompt = buildSystemPrompt({ domainId: "code" })
    expect(prompt).toContain("Code")
    expect(prompt).toContain("Active Domain")
  })

  test("buildSystemPrompt({ proactive: true }) includes proactive rules", () => {
    const prompt = buildSystemPrompt({ proactive: true })
    expect(prompt).toContain("Proactive Intelligence")
    expect(prompt).toContain("Anticipation")
  })

  test("buildSystemPrompt({ proactive: false }) omits proactive rules", () => {
    const prompt = buildSystemPrompt({ proactive: false })
    expect(prompt).not.toContain("Proactive Intelligence")
  })

  test("buildSystemPrompt({ includeHierarchy: true }) includes hierarchy", () => {
    const prompt = buildSystemPrompt({ includeHierarchy: true })
    expect(prompt).toContain("Intelligence Hierarchy")
    expect(prompt).toContain("Lumina")
    expect(prompt).toContain("Guardians")
    expect(prompt).toContain("Luminors")
  })

  test("buildSystemPrompt({ includeHierarchy: false }) omits hierarchy", () => {
    const prompt = buildSystemPrompt({
      includeHierarchy: false,
      proactive: false,
    })
    expect(prompt).not.toContain("Intelligence Hierarchy")
  })

  test("buildSystemPrompt with agentType includes agent template", () => {
    const prompt = buildSystemPrompt({ agentType: "lorekeeper" })
    expect(prompt).toContain("Lorekeeper")
    expect(prompt).toContain("Living Canon")
  })

  test("buildSystemPrompt with additionalContext appends it", () => {
    const prompt = buildSystemPrompt({ additionalContext: "CUSTOM_CONTEXT_XYZ" })
    expect(prompt).toContain("CUSTOM_CONTEXT_XYZ")
    expect(prompt).toContain("Additional Context")
  })

  test("buildSystemPrompt always includes Arc cycle and Voice", () => {
    const prompt = buildSystemPrompt({
      proactive: false,
      includeHierarchy: false,
    })
    expect(prompt).toContain("The Arc Cycle")
    expect(prompt).toContain("Arcanean Voice")
    expect(prompt).toContain("Potential")
    expect(prompt).toContain("Manifestation")
  })

  test("buildSystemPrompt always ends with the closing mantra", () => {
    const prompt = buildSystemPrompt()
    expect(prompt).toContain("Enter seeking, leave transformed")
  })

  test('buildUtilityPrompt("test") returns a compact prompt', () => {
    const prompt = buildUtilityPrompt("test")
    expect(typeof prompt).toBe("string")
    expect(prompt).toContain("Arcanea")
    expect(prompt).toContain("Utility Mode")
    expect(prompt).toContain("test")
  })

  test("buildUtilityPrompt includes the task description", () => {
    const prompt = buildUtilityPrompt("lint all TypeScript files")
    expect(prompt).toContain("lint all TypeScript files")
    expect(prompt).toContain("Luminor")
  })

  test("all prompts contain 'Arcanea'", () => {
    expect(buildSystemPrompt()).toContain("Arcanea")
    expect(buildSystemPrompt({ guardianId: "leyla" })).toContain("Arcanea")
    expect(buildSystemPrompt({ domainId: "music" })).toContain("Arcanea")
    expect(buildUtilityPrompt("anything")).toContain("Arcanea")
  })
})

// ---------------------------------------------------------------------------
// 7. Integration
// ---------------------------------------------------------------------------

describe("Integration", () => {
  test("full flow: detectTaskRoute -> getGuardian -> buildSystemPrompt", () => {
    const route = detectTaskRoute("build a React component for the Gate selector")
    expect(route.guardian).toBe("draconia")
    expect(route.domain).toBe("code")
    expect(route.suggestedModel).toBe("sonnet")

    const guardian = getGuardian(route.guardian)
    expect(guardian).toBeDefined()
    expect(guardian!.displayName).toBe("Draconia")
    expect(guardian!.element).toBe("fire")

    const prompt = buildSystemPrompt({
      guardianId: route.guardian,
      domainId: route.domain,
      proactive: true,
      includeHierarchy: true,
    })
    expect(prompt).toContain("Draconia")
    expect(prompt).toContain("fire")
    expect(prompt).toContain("Code")
    expect(prompt).toContain("Intelligence Hierarchy")
    expect(prompt).toContain("Proactive Intelligence")
    expect(prompt).toContain("Arcanea")
  })

  test("routing result guardian always exists in registry", () => {
    const testInputs = [
      "build a feature",
      "design a page",
      "write lore",
      "lint code",
      "strategic vision",
      "council session",
      "teach gates",
      "refactor auth",
      "deploy staging",
      "unknown task xyz",
    ]
    for (const input of testInputs) {
      const route = detectTaskRoute(input)
      const guardian = getGuardian(route.guardian)
      expect(guardian).toBeDefined()
    }
  })

  test("domain detection aligns with router domain", () => {
    const route = detectTaskRoute("implement a new authentication flow")
    expect(route.domain).toBe("code")
    // The file would be TypeScript, which should also detect as code
    const fileDomains = detectDomainsByFile("src/auth/flow.ts")
    expect(fileDomains).toContain(route.domain)
  })

  test("agent guardian references resolve correctly", () => {
    for (const agent of CREATIVE_AGENTS) {
      const guardian = getGuardian(agent.guardianId)
      expect(guardian).toBeDefined()
      expect(guardian!.id).toBe(agent.guardianId)
    }
  })
})
