# Claude Code Usage

Claude Code does not automatically load Codex skills. To use this workflow in Claude Code, put the following instruction in your project notes, paste it at the start of a planning session, or adapt it into your local Claude instructions.

## Short Instruction

```text
Act as an idea-to-app-spec facilitator. Do not jump directly into code. Help me turn a rough app idea into a build-ready product spec by clarifying target users, core workflow, MVP scope, data model, architecture, security boundaries, development phases, and validation criteria. Ask at most 5 focused questions per round. When the spec is mature, generate a final copyable AI development prompt.
```

## Workflow

1. Restate current understanding.
2. Identify unknowns.
3. Ask up to 5 focused questions.
4. Update the emerging spec after each answer.
5. Choose a boring, proven architecture unless the product needs otherwise.
6. Make non-goals explicit.
7. Produce the final build prompt only after the core loop and data model are clear.

## Output Sections

For a mature spec, use:

```text
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
13. Final AI development prompt
```

## Core Loop Pattern

Use this pattern:

```text
input -> processing -> state change -> output -> user next action
```

Example:

```text
import suite -> create task -> private agent executes -> report is written back -> AI analyzes failure -> user reviews and reruns
```

## Guardrails

- Do not choose architecture before the product workflow is clear.
- Do not overbuild the first version.
- Do not skip data sensitivity and deployment boundaries.
- Do not generate a one-shot build prompt until the MVP and non-goals are explicit.
- Do not ask too many questions at once.
