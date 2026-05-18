# Chronicle + Skill Workflow Plan

This document defines the next layer on top of `idea-to-app-spec`: a reusable workflow for turning rough ideas into specs, specs into tasks, and repeated work patterns into reusable skills.

## What This Is

This is not a single app and not a full automation framework.

It is a **workflow package**:

- a reusable process design
- a set of shared templates
- a skill-generation convention
- a local chronicle format for capturing work history

The package is intended to work across Codex, Claude Code, and similar coding agents.

## End-to-End Chain

```text
natural language idea -> app spec -> task plan -> chronicle record -> repeated pattern detection -> skill suggestion -> human review -> approved skill
```

## Design Principles

- Keep the workflow generic, not tied to `vscode-react-native`
- Keep the main record human-readable first
- Keep machine indexing optional and lightweight
- Suggest skills automatically, but require human approval
- Prefer simple files over a database or background service

## Recommended Artifact Types

### 1. Spec

Use the existing `idea-to-app-spec` layer to turn a vague idea into a build-ready spec.

### 2. Task Plan

Convert the spec into an executable plan:

- issues
- branches
- tests
- PR sequence
- validation checkpoints

### 3. Chronicle

Use chronicle files to capture what happened during execution:

- what was attempted
- what was decided
- what changed
- what should happen next

### 4. Skill

Convert repeated chronicle patterns into reusable skills after human confirmation.

## Chronicle Format

Use Markdown as the primary record.

Suggested fields:

- Date
- Project
- Goal
- Action
- Decision
- Result
- Follow-up
- Tags

Example:

```md
# 2026-05-18

## Project
vscode-react-native

## Goal
Add unit tests for NetworkInspectorManager lifecycle.

## Action
Added a new test file and verified build output.

## Decision
Use proxyquire-based unit tests instead of integration-level device startup.

## Result
Tests passed locally with gulp build and mocha.

## Follow-up
Push after the scheduled time and create the PR.

## Tags
network-inspector, testing, github-workflow
```

## Optional Machine Index

If indexing is needed, keep a small JSON or YAML index alongside the Markdown records.

Suggested index fields:

- id
- date
- project
- tags
- related spec
- related task plan
- skill candidate

## Task Plan Format

The task plan should sit between spec and execution.

It should answer:

- what to do first
- what can run in parallel
- what must be validated
- what should become an issue or PR

Suggested sections:

- Summary
- Scope
- Action items
- Validation
- Risks

## Skill Extraction Rules

Suggest a skill when a pattern appears repeatedly and can be written as a stable workflow.

Recommended triggers:

- same type of task appears 3 or more times
- the steps are stable across runs
- the input/output shape is clear
- the workflow is useful across projects

Good skill candidates:

- GitHub issue and PR workflow
- branch sync workflow
- testing workflow
- report generation workflow
- documentation rewrite workflow

## Skill Creation Policy

- Auto-suggest the skill
- Ask the user to confirm
- Create the final skill only after approval

This prevents over-creating skills from one-off work.

## Cross-Tool Compatibility

The workflow should be readable by:

- Codex
- Claude Code
- manual GitHub review

To keep that true:

- use plain Markdown for narrative files
- keep headings simple and stable
- avoid tool-specific jargon in the main record
- keep machine-only metadata in a separate index

## Suggested Repository Structure

```text
workspace/
  ideas/
  specs/
  plans/
  chronicle/
  skills/
    suggested/
    approved/
  templates/
```

## What To Build First

1. Finalize the spec template
2. Define the task-plan template
3. Define the chronicle template
4. Define the skill suggestion template
5. Add one end-to-end example
6. Review whether automatic indexing is needed

## Recommendation

Keep this as a **workflow package** rather than a single project.

Use:

- `idea-to-app-spec` for idea-to-spec conversion
- `spec-to-task` for planning
- `chronicle-to-skill` for pattern mining

That gives you a reusable system without forcing everything into one implementation.
