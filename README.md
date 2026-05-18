# idea-to-app-spec

Language: [English](README.md) | [中文](README.zh-CN.md)

`idea-to-app-spec` is an installable AI workflow skill for turning rough ideas into a single delivery chain: spec, plan, one-shot prompt, implementation handoff, chronicle, and skill suggestions.

It is designed for tools such as Codex, Claude Code, Cursor, and other coding agents.

## What It Is

This repository is not a single app and not a traditional framework.

It is a workflow package that helps you:

- turn a vague idea into a clear product spec
- turn a spec into an execution plan
- turn the plan into a one-shot development prompt
- hand the prompt to an AI coding agent for implementation
- record work as chronicle entries
- detect repeated patterns
- convert repeated work into reusable skills

## When To Use Which Mode

- Use **Explore mode** when the idea is still vague and you need help shaping the product.
- Use **Package mode** when the product shape is stable and you want the full delivery package.
- Use **Skill mining mode** when you want to review repeated workflows and draft reusable skills from chronicle records.

## What It Produces

The main outputs are:

- `spec.md` for product and technical direction
- `plan.md` for execution steps, pre-dev requirements, and validation
- `one-shot-prompt.md` for direct AI app generation
- `implementation-handoff.md` for the next coding agent
- `chronicle/*.md` for work history
- `skill-suggestions/<skill-name>.md` for reusable workflow drafts
- template files for consistent use across tools

## Main Chain

Use one chain, not competing paths:

```text
idea -> spec -> plan -> one-shot prompt -> implementation handoff -> chronicle -> skill suggestion
```

The `one-shot prompt` is part of the chain. It is not a separate optional workflow.

## Default Output Path

Generated artifacts should be written to:

```text
ai-workflow/<project-slug>/
```

Recommended structure:

```text
ai-workflow/<project-slug>/
├── spec.md
├── plan.md
├── one-shot-prompt.md
├── implementation-handoff.md
├── chronicle/
│   └── YYYY-MM-DD.md
└── skill-suggestions/
    └── <skill-name>.md
```

This gives both the user and future AI agents one stable place to find the generated artifacts.

`plan.md` should separate pre-dev requirements from the actual technical stack so build-start constraints do not get mistaken for implementation choices.

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
7. Technology decision rationale
8. Pre-dev requirements / build-start constraints
9. Security boundaries
10. Development phases
11. Validation criteria
12. Final one-shot app generation prompt
13. Implementation handoff
14. Chronicle and skill suggestions when useful

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
│   ├── chronicle-skill-workflow-plan.md
│   ├── chronicle-skill-workflow-usage.md
│   └── prompt-workflow.md
├── templates/
│   ├── chronicle-template.md
│   ├── implementation-handoff-template.md
│   ├── skill-suggestion-template.md
│   ├── spec-to-one-shot-prompt-template.md
│   ├── spec-to-task-template.md
│   └── app-generation-prompt.md
└── README.md
```

## Codex Installation

This repository includes an installable Codex skill. Users do not need to manually read every document before using it.

Copy the skill folder into your Codex skills directory:

```powershell
Copy-Item -Recurse -Force .\skills\idea-to-app-spec $env:USERPROFILE\.codex\skills\idea-to-app-spec
```

Then start a new Codex session and ask:

```text
Use idea-to-app-spec. I have a rough app idea: ...
```

The skill should produce artifacts under `ai-workflow/<project-slug>/` and ask before starting implementation.

## Claude Code Usage

Claude Code does not use Codex `SKILL.md` files natively. Use this repository as a project instruction source or paste the concise workflow from:

```text
docs/claude-code-usage.md
```

For a one-shot app generation prompt, use:

```text
ai-workflow/<project-slug>/one-shot-prompt.md
```

For implementation, point Claude Code at:

```text
ai-workflow/<project-slug>/implementation-handoff.md
```

## Recommended Workflow

Do not start with a giant build prompt when the idea is still unclear.

Use one ordered chain:

```text
rough idea -> product shape -> spec -> plan -> one-shot prompt -> implementation handoff
```

After implementation work happens, continue the same chain with chronicle records and skill suggestions.

Use:

- `templates/spec-to-task-template.md` for execution planning
- `templates/spec-to-one-shot-prompt-template.md` for direct AI app generation
- `templates/chronicle-template.md` for work history records
- `templates/skill-suggestion-template.md` for reusable skill drafts
- `docs/chronicle-skill-workflow-plan.md` for the overall workflow design
- `docs/chronicle-skill-workflow-usage.md` for Codex and Claude Code usage

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

```text
Use idea-to-app-spec. Create the full delivery package under ai-workflow/<project-slug>/, then ask before implementation.
```

## Source Example

The detailed Chinese reference in `skills/idea-to-app-spec/references/project-generation-prompt-playbook.zh-CN.md` was derived from a real project planning session for MeteorTest.

It is intentionally detailed and should be used as reference material, not always pasted in full.
