# Chronicle + Skill Workflow Usage

This document explains how to use the `idea-to-app-spec` workflow together with the chronicle and skill layers in Codex and Claude Code.

## How To Use It

Use the workflow as one ordered chain:

```text
rough idea -> spec -> task plan -> one-shot prompt -> implementation handoff -> execution chronicle -> skill suggestion -> human approval -> reusable skill
```

Do not jump straight to code when the idea is still vague.

Write generated artifacts under:

```text
ai-workflow/<project-slug>/
```

## Codex Usage

### 1. Start From A Rough Idea

Use the idea-to-app-spec skill or ask for a spec directly:

```text
Use idea-to-app-spec. I have a rough idea: ...
```

### 2. Create The Delivery Package

After the spec is stable, ask:

```text
Based on this spec, create the full delivery package under ai-workflow/<project-slug>/ with spec.md, plan.md, one-shot-prompt.md, and implementation-handoff.md.
```

### 3. Implement From The Handoff

Ask the coding agent to read the handoff:

```text
Read ai-workflow/<project-slug>/implementation-handoff.md and implement the first phase.
```

### 4. Write A Chronicle Record

After a meaningful change or decision, record it in Markdown:

```text
Write a chronicle entry for this work with date, project, goal, action, decision, result, follow-up, and tags.
```

### 5. Mine Skills From Repeated Work

When you have several similar chronicle entries:

```text
Scan these chronicle records and suggest reusable skills. Do not create the final skill yet. Ask for confirmation first.
```

## Claude Code Usage

Claude Code does not load Codex skills automatically, so use the workflow as a project instruction or paste a short instruction at the start of a session.

### Short Instruction

```text
Act as a workflow facilitator. Help me turn rough ideas into build-ready specs, then into task plans, then into chronicle records, and finally into reusable skills. Ask focused questions only when needed. Suggest skills automatically, but wait for my confirmation before finalizing them.
```

### Suggested Session Flow

1. Restate the current understanding.
2. Ask only the minimum number of questions.
3. Produce the spec.
4. Turn the spec into a task plan and one-shot prompt.
5. Produce an implementation handoff.
6. Record major progress in chronicle format.
7. Detect repeated patterns and suggest skills.

## What To Feed At Each Stage

### Idea Stage

Provide:

- a rough goal
- target users
- obvious constraints
- any safety or privacy boundaries

### Spec Stage

Provide:

- the current spec draft
- known architecture constraints
- deployment shape
- data sensitivity

### Task Stage

Provide:

- the spec
- the repo or project name
- validation commands
- whether you want issue/PR separation

### Chronicle Stage

Provide:

- date
- project
- action taken
- decision made
- result
- next step

### Skill Stage

Provide:

- several chronicle entries
- the repeated pattern you noticed
- whether you want a suggested skill or a final skill draft

## Recommended File Shapes

### Chronicle

Use Markdown for the main record:

```md
# 2026-05-18

## Project
vscode-react-native

## Goal
Add lifecycle tests for NetworkInspectorManager.

## Action
Added a new unit test and verified it locally.

## Decision
Use proxyquire-based isolation instead of integration startup.

## Result
Build and unit test passed.

## Follow-up
Push after the scheduled time and create the PR.

## Tags
testing, github-workflow, network-inspector
```

### Skill Suggestion

Use a short draft first:

```md
## Skill Name

## Problem It Solves

## When To Use

## Inputs

## Steps

## Outputs

## Human Review Notes
```

## Practical Rule

- Use Markdown for anything a human should read.
- Use JSON or YAML only if you need indexing or automation.
- Keep skill creation human-approved.
- Keep the workflow generic so it can be reused across projects.
