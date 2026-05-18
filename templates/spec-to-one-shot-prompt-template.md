# Spec To One-Shot Prompt Template

Use this template to convert a stable product spec into a copyable prompt for an AI coding agent.

```md
## Role

You are a senior <domain> engineer specialized in <stack>.

## Project Name

Build an app called <project name>.

## Project Goal

<One sentence: what to build, for whom, and what outcome it enables.>

## Core Workflow

<input -> processing -> state change -> output -> user next action>

## Core Features

1. <Feature group>
   - <Specific requirement>
   - <Specific requirement>

2. <Feature group>
   - <Specific requirement>
   - <Specific requirement>

## Data Model

At minimum, implement:

- <Entity>
- <Entity>

Include fields, relationships, status enums, and deletion rules.

## Tech Stack

- Framework:
- Language:
- UI:
- Auth:
- Database:
- AI / speech / external services:
- Testing:

## Security Boundaries

- <Boundary>
- <Boundary>

## UI Requirements

- <Visual style>
- <Responsive requirements>
- <Theme/design-token requirements>
- <Accessibility or readability requirements>

## Non-Goals

- <Not in v1>
- <Must not do>

## Delivery Requirements

1. Generate complete runnable code.
2. Include setup documentation.
3. Include environment variable examples.
4. Include database schema or local storage model.
5. Include tests or validation scripts.

## Validation Requirements

Run:

```bash
<validation command>
```

If validation cannot run, explain why and list missing prerequisites.

## Development Order

1. <Phase>
2. <Phase>
3. <Phase>

## Output Format

First provide a short implementation plan, then create or edit the files. Do not stop at a proposal.
```
