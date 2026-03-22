#!/usr/bin/env node

// npx arcanea-code — lightweight entry that runs the bun-compiled binary
// For full installation, use: curl -fsSL https://arcanea.ai/install | sh

const { spawn } = require("child_process")
const path = require("path")
const fs = require("fs")

const binName = process.platform === "win32" ? "arcanea-code.exe" : "arcanea-code"
const localBin = path.join(__dirname, binName)

if (fs.existsSync(localBin)) {
  // Run local binary
  const child = spawn(localBin, process.argv.slice(2), { stdio: "inherit" })
  child.on("exit", (code) => process.exit(code ?? 0))
} else {
  // Fall back to install instructions
  console.log("Arcanea Code — Guardian-Powered AI Coding CLI")
  console.log("")
  console.log("For full installation:")
  console.log("  curl -fsSL https://arcanea.ai/install | sh")
  console.log("")
  console.log("Or install via npm:")
  console.log("  npm install -g arcanea-code")
  console.log("")
  console.log("Learn more: https://arcanea.ai")
  process.exit(0)
}
