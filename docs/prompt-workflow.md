# Prompt Workflow

This workflow turns rough ideas into executable engineering prompts.

## Step 1: Compress The Idea

Write one sentence:

```text
I want to build <product> for <users> so they can <outcome>.
```

## Step 2: Identify Roles

List:

- Admin
- Regular user
- System worker
- External services

## Step 3: Define The Core Loop

Use:

```text
input -> processing -> state change -> output -> next action
```

If there is no loop, the product is probably still too vague.

## Step 4: Define MVP And Non-Goals

MVP answers:

- What must work in the first demo?
- What proves the product is real?

Non-goals answer:

- What should not be built yet?
- What should never happen for safety reasons?

## Step 5: Draft Data Model

List entities, fields, relationships, and status enums.

Example:

```text
tasks(id, project_id, status, created_at, started_at, finished_at)
reports(id, task_id, summary, log_url, created_at)
```

## Step 6: Choose Architecture

Choose the simplest architecture that supports the MVP.

Only introduce queues, vector search, agents, microservices, or cloud services when the workflow requires them.

## Step 7: Write Validation Criteria

Every generated project should include commands or checks:

```text
npm run lint
npm run build
python -m pytest
```

## Step 8: Generate Final Prompt

Use `templates/app-generation-prompt.md`.
