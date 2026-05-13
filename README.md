# idea-to-app-spec

`idea-to-app-spec` is a reusable workflow for turning rough app ideas into build-ready product specs, architecture decisions, implementation plans, and final AI development prompts.

It is designed for tools such as Codex, Claude Code, Cursor, and other coding agents.

## What It Does

Use it when you have a vague idea like:

```text
I want to build something around AI testing, but I am not sure what the product should be.
```

The workflow guides the conversation through:

1. Product goal
2. Target users
3. Core workflow
4. MVP scope
5. Data model
6. Architecture and tech stack
7. Security boundaries
8. Development phases
9. Validation criteria
10. Final one-shot app generation prompt

## Repository Layout

```text
idea-to-app-spec/
├── skills/
│   └── idea-to-app-spec/          # Codex skill package
│       ├── SKILL.md
│       ├── agents/openai.yaml
│       └── references/
├── docs/
│   ├── claude-code-usage.md
│   └── prompt-workflow.md
├── templates/
│   └── app-generation-prompt.md
└── README.md
```

## Codex Installation

Copy the skill folder into your Codex skills directory:

```powershell
Copy-Item -Recurse -Force .\skills\idea-to-app-spec $env:USERPROFILE\.codex\skills\idea-to-app-spec
```

Then start a new Codex session and ask:

```text
Use idea-to-app-spec. I have a rough app idea: ...
```

## Claude Code Usage

Claude Code does not use Codex `SKILL.md` files natively. Use the workflow as a project instruction or paste the concise workflow from:

```text
docs/claude-code-usage.md
```

For a one-shot app generation prompt, use:

```text
templates/app-generation-prompt.md
```

## Recommended Workflow

Do not start with a giant build prompt when the idea is still unclear.

Use two phases:

```text
Explore: rough idea -> product shape -> core loop -> MVP
Finalize: spec -> architecture -> implementation phases -> final build prompt
```

## Example Trigger Prompts

```text
Help me turn this rough idea into a build-ready app spec.
```

```text
I want to build an app but I do not know the architecture yet. Walk me through it.
```

```text
Convert this natural-language idea into a one-shot AI development prompt.
```

```text
I have a vague product idea. Ask me questions and help me shape it into something buildable.
```

## Source Example

The detailed Chinese reference in `skills/idea-to-app-spec/references/project-generation-prompt-playbook.zh-CN.md` was derived from a real project planning session for MeteorTest.

It is intentionally detailed and should be used as reference material, not always pasted in full.
