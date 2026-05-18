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
9. Security and privacy boundaries
10. Development phases
11. Validation commands and acceptance criteria
12. Risks and open questions

Use this core-loop pattern:

```text
input -> processing -> state change -> output -> user next action
```

The task plan must include:

1. Summary
2. Scope
3. Implementation phases
4. Issue/PR or task breakdown
5. Validation steps
6. Risks and dependencies

The one-shot prompt must include:

```md
## Role
## Project Name
## Project Goal
## Core Workflow
## Core Features
## Data Model
## Tech Stack
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
