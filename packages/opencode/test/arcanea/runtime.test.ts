import { describe, test, expect } from "bun:test"
import { getIntelligenceContext, routeMessage } from "../../src/arcanea/runtime"

describe("arcanea.runtime", () => {
  test("getIntelligenceContext returns non-empty context", () => {
    const context = getIntelligenceContext();
    expect(context.length).toBeGreaterThan(100);
    expect(context).toContain("Arcanea");
    expect(context).toContain("Guardian");
  });

  test("routeMessage returns guardian and context for code task", () => {
    const result = routeMessage("build a React component");
    expect(result.guardian).toBe("draconia");
    expect(result.domain).toBe("code");
    expect(result.model).toBe("sonnet");
    expect(result.context).toContain("Draconia");
  });

  test("routeMessage returns guardian for design task", () => {
    const result = routeMessage("design the login page UI");
    expect(result.guardian).toBe("leyla");
    expect(result.domain).toBe("art");
  });

  test("routeMessage returns guardian for review task", () => {
    const result = routeMessage("review this pull request");
    expect(result.guardian).toBe("alera");
  });

  test("routeMessage returns guardian for strategy task", () => {
    const result = routeMessage("create a strategic roadmap");
    expect(result.guardian).toBe("lyria");
    expect(result.model).toBe("opus");
  });

  test("routeMessage defaults to shinkami for unknown", () => {
    const result = routeMessage("random unknown task xyz");
    expect(result.guardian).toBe("shinkami");
    expect(result.model).toBe("sonnet");
  });
});
