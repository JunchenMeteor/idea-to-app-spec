---
name: idea-to-app-spec
description: Turn fuzzy app ideas into a single AI-ready delivery chain: product spec, execution plan, one-shot development prompt, implementation handoff, chronicle record, and reusable skill suggestions. Use when the user has a rough product idea, wants to clarify what to build, needs architecture/product decisions, wants fixed output artifacts for AI implementation, or wants repeated workflows converted into skills.
---

# Idea To App Spec

Use this skill to guide a user from a vague app idea to a build-ready delivery package that another AI coding agent can execute.

Do not jump directly to code or a giant prompt when the idea is still unclear. Run a short discovery loop first, then converge into one ordered chain.

## Main Chain

Always prefer this single chain:

```text
idea -> spec -> task plan -> one-shot prompt -> implementation handoff -> chronicle -> skill suggestion
```

`one-shot prompt` is not an alternate path. It is the standard handoff artifact produced after the spec and task plan are stable.

## Output Location

When writing files, create a project package under:

```text
ai-workflow/<project-slug>/
```

Use this structure:

```text
ai-workflow/<project-slug>/
  spec.md
  plan.md
  one-shot-prompt.md
  implementation-handoff.md
  chronicle/
    YYYY-MM-DD.md
  skill-suggestions/
    <skill-name>.md
```

If the current repository already has a better conventional docs folder, ask once before changing the output location. Otherwise use `ai-workflow/<project-slug>/`.

## Entry Gate

触发此 skill 后，先确定用户要用哪个模式，再执行。

按以下优先级选择交互方式：

1. **有 Bash 工具且 Node.js 可用**：执行 `node scripts/menu.js`，读取输出后继续。
2. **Claude Code UI**：调用 `AskUserQuestion` 展示选项。
3. **纯对话环境**：输出以下文本菜单，等待用户回复数字或关键词：

```
你想做什么？/ What do you want to do?

1. Explore — 从模糊想法开始探索 / shape a vague idea
2. Package — 生成完整产品 spec 和交付包 / full spec and delivery package
3. One-shot — 只生成一键开发 prompt / one-shot dev prompt only
4. Skill mining — 从历史记录挖掘可复用 skill / mine chronicles for reusable skills
5. 继续上次进度 / Continue where we left off
6. 其他 / Other (describe freely)
```

如果用户触发时已说清楚意图，跳过菜单直接进入对应模式。用户可以随时用数字、关键词或自由描述回复，AI 理解意图后执行。

## Step Closure

每个阶段产出后，AI 必须：

1. 说明产出了什么文件、放在哪里（1-2 句）
2. 给出下一阶段建议
3. 等待用户确认，不自动继续

用户可以：
- 说"继续"/"continue" → 执行下一阶段
- 说"重来"/"redo" → 询问哪里不满意，重新执行当前阶段
- 说"回到菜单"/"menu" → 重新走 Entry Gate

## Operating Modes

Choose one mode based on the user request.

- **Explore mode**: The user has a vague idea and needs help discovering product shape, users, workflow, architecture, and MVP scope.
- **Package mode**: The idea is clear enough to create the full delivery package: spec, task plan, one-shot prompt, and implementation handoff.
- **Skill mining mode**: The user wants to review chronicle records and suggest reusable skills.

If uncertain, start in Explore mode.

## Explore Mode Workflow

1. Restate the current understanding in 2-4 bullets.
2. Identify the biggest unknowns.
3. Ask at most 5 questions, prioritizing:
   - target user
   - core workflow
   - must-have MVP outcome
   - data sensitivity
   - deployment/runtime shape
4. Offer 2-3 plausible product directions when useful.
5. After each answer, update the emerging spec instead of restarting.

Keep questions concrete and answerable. Avoid asking for architecture details before the product workflow is clear.

## Package Mode Workflow

Produce or update these artifacts in order:

1. `spec.md`
2. `plan.md`
3. `one-shot-prompt.md`
4. `implementation-handoff.md`
5. `chronicle/YYYY-MM-DD.md` when meaningful work has happened
6. `skill-suggestions/<skill-name>.md` only as a suggestion, not a final approved skill

The spec must include these sections:

1. One-sentence product goal
2. Target users and roles
3. Core loop
4. MVP scope
5. Non-goals
6. Data model
7. Pages / APIs / workers / integrations
8. Architecture and tech stack
9. Technology decision rationale
10. Pre-dev requirements / build-start constraints
11. Security and privacy boundaries
12. Development phases
13. Validation commands and acceptance criteria
14. Risks and open questions

Use this core-loop pattern:

```text
input -> processing -> state change -> output -> user next action
```

The task plan must include:

1. Summary
2. Scope
3. Implementation phases
4. Technology choices and alternatives
5. Issue/PR or task breakdown
6. Validation steps
7. Risks and dependencies

The one-shot prompt must include:

```md
## Role
## Project Name
## Project Goal
## Core Workflow
## Core Features
## Data Model
## Pre-Dev Requirements
## Tech Stack
## Technology Decision Rationale
## Security Boundaries
## UI Requirements
## Non-Goals
## Delivery Requirements
## Validation Requirements
## Development Order
## Output Format
```

The implementation handoff must tell another coding agent exactly which artifact to read first, what phase to implement first, what files to create, and what validation commands to run.

## Skill Mining Workflow

Use chronicle records to suggest skills. Do not finalize a skill without user approval.

Suggest a skill when:

- the same workflow appears 3 or more times
- the input and output shape are clear
- the steps are stable across projects
- the workflow would save repeated explanation in future sessions

## Decision Rules

- Prefer MVP loop clarity over feature breadth.
- Define non-goals early to prevent scope drift.
- Choose boring, proven architecture unless the user has a strong reason otherwise.
- Distinguish hard requirements from recommended defaults. Do not treat example stacks as mandatory unless the user says so.
- Separate pre-dev requirements from the technology stack. Pre-dev requirements are build-start instructions; the stack is the implementation choice.
- When the product needs login, mobile access, or cross-device sync, prefer cloud-accessible persistence over local-only storage.
- For AI apps, explicitly choose which layer is being used: HTTP API, provider SDK, AI framework, low-code platform, or AI coding-tool SDK.
- Keep model, STT, TTS, and external service calls behind adapters so provider changes do not rewrite product logic.
- Use LangGraph when the app has stateful, branching, cyclic AI workflows. It can run as an in-app library; do not require a separate LangGraph server unless the user needs platform-style deployment.
- Use LangChain only when it removes real complexity, such as prompt templates, structured output parsing, provider adapters, tools, RAG, or MCP integration.
- Keep low-code platforms and AI coding-tool SDKs out of user-facing runtime unless the product explicitly requires them.
- Make data sensitivity explicit before recommending AI, cloud, logging, or vector search.
- Split large projects into phases; do not ask one agent to build everything at once unless the user explicitly wants a one-shot generation prompt.
- Include validation commands whenever the target stack is known.
- Keep the output artifacts in the fixed package path so future agents can find them.
- Treat implementation as a handoff after the package is created; ask for confirmation before starting large code generation.

## Output Style

For early exploration, keep the response short and interactive.

For delivery packages, be precise and structured. Include concrete tables, fields, routes, phases, validation commands, and handoff instructions when known.

For final prompts, make `one-shot-prompt.md` directly copyable.

## Reference

For a detailed example derived from MeteorTest, read:

- `references/project-generation-prompt-playbook.zh-CN.md`

Use the reference for examples and templates. Do not paste the whole reference unless the user asks for a full document.
