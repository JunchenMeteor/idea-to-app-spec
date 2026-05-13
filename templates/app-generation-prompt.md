# App Generation Prompt Template

```md
## Role

You are a senior full-stack engineer specialized in <stack/domain>.

## Project Name

Build an app called <name>.

## Project Goal

<One sentence: build what, for whom, to achieve what outcome.>

## Core Workflow

<input -> processing -> state change -> output -> user next action>

## Core Features

1. <Feature area>
   - <Requirement>
   - <Requirement>

2. <Feature area>
   - <Requirement>
   - <Requirement>

## Data Model

At minimum, implement:

- <table/entity>
- <table/entity>

Include fields, relationships, status enums, and deletion rules.

## Tech Stack

- Framework:
- Language:
- Database:
- Auth:
- UI:
- Charts:
- Background jobs / workers:
- Testing:

## Security Boundaries

- <What data must not be exposed>
- <What operations require permissions>
- <What the app must not do automatically>

## UI Requirements

- <Target UI style>
- <Responsive requirements>
- <Information density>
- <Design constraints>

## Non-Goals

- <Not in v1>
- <Not allowed>

## Delivery Requirements

1. Generate complete runnable code.
2. Include setup documentation.
3. Include environment variable examples.
4. Include database migrations or schema.
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
