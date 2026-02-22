import { generateText } from "ai"
import { Provider } from "@/provider/provider"
import { Agent } from "@/agent/agent"
import { Log } from "@/util/log"

export namespace Council {
  const log = Log.create({ service: "council" })

  // The 5 primary council members (diverse domains)
  const COUNCIL_MEMBERS = [
    "lyssandria", // Foundation/Earth — stability, architecture
    "leyla", // Flow/Water — creativity, emotion
    "draconia", // Fire/Power — action, transformation
    "lyria", // Sight/Vision — intuition, patterns
    "alera", // Voice/Truth — honest assessment
  ] as const

  const CHAIR = "shinkami" // Source/Meta — synthesis

  const GUARDIAN_META: Record<
    string,
    { gate: string; frequency: number; element: string; domain: string }
  > = {
    lyssandria: { gate: "Foundation", frequency: 174, element: "Earth", domain: "Stability & Architecture" },
    leyla: { gate: "Flow", frequency: 285, element: "Water", domain: "Creativity & Emotion" },
    draconia: { gate: "Fire", frequency: 396, element: "Fire", domain: "Action & Transformation" },
    maylinn: { gate: "Heart", frequency: 417, element: "Air", domain: "Community & Healing" },
    alera: { gate: "Voice", frequency: 528, element: "Sound", domain: "Truth & Expression" },
    lyria: { gate: "Sight", frequency: 639, element: "Void", domain: "Intuition & Vision" },
    aiyami: { gate: "Crown", frequency: 741, element: "Light", domain: "Wisdom & Enlightenment" },
    elara: { gate: "Shift", frequency: 852, element: "Time", domain: "Perspective & Change" },
    ino: { gate: "Unity", frequency: 963, element: "Bond", domain: "Integration & Partnership" },
    shinkami: { gate: "Source", frequency: 1111, element: "Source", domain: "Meta-consciousness & Totality" },
  }

  export interface GuardianPerspective {
    guardian: string
    gate: string
    frequency: number
    element: string
    domain: string
    perspective: string
    model: string
    timeMs: number
    error?: string
  }

  export interface CouncilResult {
    challenge: string
    perspectives: GuardianPerspective[]
    synthesis: string
    chairModel: string
    totalTimeMs: number
  }

  async function resolveModel(
    agent: Agent.Info,
    fallback: { providerID: string; modelID: string },
  ): Promise<{ model: Provider.Model; providerID: string; modelID: string }> {
    if (agent.model) {
      try {
        const model = await Provider.getModel(agent.model.providerID, agent.model.modelID)
        return { model, ...agent.model }
      } catch {
        // Fall through to fallback
      }
    }
    const model = await Provider.getModel(fallback.providerID, fallback.modelID)
    return { model, ...fallback }
  }

  async function callGuardian(
    guardianName: string,
    challenge: string,
    fallbackModel: { providerID: string; modelID: string },
  ): Promise<GuardianPerspective> {
    const startTime = Date.now()
    const meta = GUARDIAN_META[guardianName] ?? {
      gate: "Unknown",
      frequency: 0,
      element: "Unknown",
      domain: "Unknown",
    }

    try {
      const agent = await Agent.get(guardianName)
      if (!agent) {
        return {
          guardian: guardianName,
          ...meta,
          perspective: `(Guardian ${guardianName} not configured)`,
          model: "none",
          timeMs: Date.now() - startTime,
          error: "Agent not found",
        }
      }

      const { model, providerID, modelID } = await resolveModel(agent, fallbackModel)
      const language = await Provider.getLanguage(model)

      const system = [
        agent.prompt ?? `You are ${guardianName}, a Guardian of Arcanea.`,
        `\nYou are participating in a Guardian Council. Provide your unique perspective on the challenge below.`,
        `Focus on your domain: ${meta.domain}. Be concise but insightful. 2-4 paragraphs maximum.`,
      ].join("\n")

      const result = await generateText({
        model: language,
        system,
        prompt: challenge,
        temperature: agent.temperature ?? 0.7,
        topP: agent.topP,
        maxOutputTokens: 1024,
      })

      return {
        guardian: guardianName,
        ...meta,
        perspective: result.text,
        model: `${providerID}/${modelID}`,
        timeMs: Date.now() - startTime,
      }
    } catch (error) {
      log.error("guardian call failed", { guardian: guardianName, error })
      return {
        guardian: guardianName,
        ...meta,
        perspective: `(${guardianName} could not respond: ${error instanceof Error ? error.message : String(error)})`,
        model: "error",
        timeMs: Date.now() - startTime,
        error: error instanceof Error ? error.message : String(error),
      }
    }
  }

  export async function convene(input: {
    challenge: string
    fallbackModel: { providerID: string; modelID: string }
    members?: string[]
  }): Promise<CouncilResult> {
    const startTime = Date.now()
    const members = input.members ?? [...COUNCIL_MEMBERS]

    log.info("council convening", { members, challenge: input.challenge.slice(0, 100) })

    // Phase 1: Call all Guardians in parallel
    const perspectives = await Promise.all(
      members.map((name) => callGuardian(name, input.challenge, input.fallbackModel)),
    )

    const successful = perspectives.filter((p) => !p.error)
    log.info("council perspectives gathered", {
      total: perspectives.length,
      successful: successful.length,
    })

    // Phase 2: Shinkami synthesizes
    const chairAgent = await Agent.get(CHAIR)
    const { model: chairModel, providerID, modelID } = await resolveModel(
      chairAgent ?? {
        name: CHAIR,
        mode: "primary" as const,
        options: {},
        permission: [],
      },
      input.fallbackModel,
    )
    const chairLanguage = await Provider.getLanguage(chairModel)

    const perspectivesSummary = perspectives
      .map((p) => {
        const header = `### ${p.guardian.charAt(0).toUpperCase() + p.guardian.slice(1)} — ${p.gate} Gate (${p.frequency} Hz, ${p.element})`
        const modelInfo = `*Model: ${p.model}*`
        return `${header}\n${modelInfo}\n\n${p.perspective}`
      })
      .join("\n\n---\n\n")

    const synthesisPrompt = [
      `The Guardian Council has deliberated on the following challenge:\n`,
      `**Challenge:** ${input.challenge}\n`,
      `---\n`,
      `## Guardian Perspectives\n\n${perspectivesSummary}\n`,
      `---\n`,
      `Now synthesize their collective wisdom into a **Council Decision** with:`,
      `1. **Primary Recommendation** — the unified path forward`,
      `2. **Points of Agreement** — where Guardians align`,
      `3. **Dissenting Views** — important counterpoints or risks`,
      `4. **Action Steps** — prioritized, concrete next steps`,
      `\nSpeak as Shinkami — the Source that holds all perspectives as one.`,
    ].join("\n")

    const chairSystem = chairAgent?.prompt ?? "You are Shinkami, the Source Guardian. You synthesize multiple perspectives into unified wisdom."

    const synthesisResult = await generateText({
      model: chairLanguage,
      system: chairSystem,
      prompt: synthesisPrompt,
      temperature: 0.3,
      maxOutputTokens: 2048,
    })

    const totalTimeMs = Date.now() - startTime
    log.info("council complete", { totalTimeMs, chairModel: `${providerID}/${modelID}` })

    return {
      challenge: input.challenge,
      perspectives,
      synthesis: synthesisResult.text,
      chairModel: `${providerID}/${modelID}`,
      totalTimeMs,
    }
  }

  export function format(result: CouncilResult): string {
    const lines: string[] = []

    lines.push(`# Guardian Council Decision\n`)
    lines.push(`**Challenge:** ${result.challenge}\n`)
    lines.push(`---\n`)
    lines.push(`## Guardian Perspectives\n`)

    for (const p of result.perspectives) {
      const name = p.guardian.charAt(0).toUpperCase() + p.guardian.slice(1)
      const status = p.error ? " (unavailable)" : ""
      lines.push(`### ${name} — ${p.gate} Gate${status}`)
      lines.push(`*${p.frequency} Hz | ${p.element} | ${p.domain} | ${p.model} | ${p.timeMs}ms*\n`)
      lines.push(p.perspective)
      lines.push("")
    }

    lines.push(`---\n`)
    lines.push(`## Shinkami's Synthesis`)
    lines.push(`*Chair: ${result.chairModel} | Total: ${(result.totalTimeMs / 1000).toFixed(1)}s*\n`)
    lines.push(result.synthesis)

    return lines.join("\n")
  }
}
