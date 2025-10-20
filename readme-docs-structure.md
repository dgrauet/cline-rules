---
name: "README and Documentation Structure"
description: "Define best practices for maintaining a clear, concise README.md and organizing detailed documentation inside ./docs/"
tags: ["documentation", "readme", "structure", "best-practices"]
severity: "medium"
---

# Rule: README & Docs Structure

## 🧠 Context
A well-structured README helps new contributors, maintainers, and users quickly understand the purpose, setup, and usage of a project.  
Detailed instructions, architecture, or API references should live in `./docs/` to keep the main README short and focused.

---

## ✅ Rule

### The `README.md` must:
1. Include a **title and short description** of the project.  
2. Optionally provide a **table of contents** if long.  
3. Explain the **overview or context** — what problem it solves, and for whom.  
4. Provide a **quick start / installation** section — minimal commands to run locally.  
5. Include **1–2 short usage examples**.  
6. Optionally show a **project structure tree**.  
7. Reference **`CONTRIBUTING.md`** and **`LICENSE`**.  
8. Optionally list **authors or credits**.

---

### The `./docs/` directory must contain:
- `installation.md` → detailed setup and prerequisites.  
- `usage.md` → advanced usage and configuration.  
- `api.md` or `openapi.yaml` → API reference and schemas.  
- `architecture.md` → design diagrams, dependencies, and decisions.  
- `deployment.md` → deployment, CI/CD, and security notes.  
- `CONTRIBUTING.md` and `CHANGELOG.md` → contribution workflow and version history.

---

## ⚙️ Best Practices
- Keep `README.md` **under ~100 lines**.  
- Use **relative links** to detailed docs (`[Full guide](docs/installation.md)`).  
- Keep all documentation **up to date with code changes**.  
- Use **English** for open-source projects.  
- Add **visuals or diagrams** where they clarify concepts.

---

## 🎯 Goal
Ensure every project has:
- A **concise and informative `README.md`** for quick onboarding.  
- A **well-structured `./docs/` directory** for deep technical documentation.

`README.md` = overview.  
`./docs/` = details.
