---
name: idea-to-app-spec
description: Turn fuzzy app ideas into build-ready product specs, architecture decisions, implementation plans, and final AI development prompts. Use when the user has a rough product idea, wants to clarify what to build, needs help choosing architecture/tech stack/data model/development phases, or asks to convert natural-language requirements into a one-shot app creation prompt.
---

# Idea To App Spec

Use this skill to guide a user from a vague app idea to a build-ready spec and final AI development prompt.

Do not jump directly to code or a giant prompt when the idea is still unclear. Run a short discovery loop first, then converge.

## Operating Modes

Choose one mode based on the user request.

- **Explore mode**: The user has a vague idea and needs help discovering product shape, users, workflow, architecture, and MVP scope.
- **Spec mode**: The idea is mostly clear and needs a structured product/technical spec.
- **Prompt mode**: The user wants a final copyable AI development prompt.

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

## Spec Mode Workflow

Produce a structured spec with these sections:

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

## Prompt Mode Workflow

Generate a final prompt using this structure:

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

The final prompt must be specific enough that another coding agent can start implementation without asking basic questions.

## Decision Rules

- Prefer MVP loop clarity over feature breadth.
- Define non-goals early to prevent scope drift.
- Choose boring, proven architecture unless the user has a strong reason otherwise.
- Make data sensitivity explicit before recommending AI, cloud, logging, or vector search.
- Split large projects into phases; do not ask one agent to build everything at once unless the user explicitly wants a one-shot generation prompt.
- Include validation commands whenever the target stack is known.

## Output Style

For early exploration, keep the response short and interactive.

For final specs, be precise and structured. Include concrete tables, fields, routes, and phases when known.

For final prompts, make the result directly copyable.

## Reference

For a detailed example derived from MeteorTest, read:

- `references/project-generation-prompt-playbook.zh-CN.md`

Use the reference for examples and templates. Do not paste the whole reference unless the user asks for a full document.
