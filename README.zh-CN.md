# idea-to-app-spec

语言：[English](README.md) | [中文](README.zh-CN.md)

`idea-to-app-spec` 是一个可安装的 AI 工作流 skill，用来把模糊想法转换成一条固定交付链路：spec、plan、one-shot prompt、implementation handoff、chronicle 和 skill suggestion。

它面向 Codex、Claude Code、Cursor 以及类似的 AI 编码工具。

## 它是什么

这个仓库不是一个单独 App，也不是传统意义上的框架。

它是一个工作流包，帮助你：

- 把模糊想法变成清晰的产品规格
- 把规格变成执行计划
- 把计划变成可直接交给 AI 编码工具的 one-shot prompt
- 把 prompt 和上下文交接给下一个 AI 编码 agent
- 把执行过程记录成 chronicle
- 识别重复工作模式
- 把重复工作沉淀成可复用 skill

## 什么时候用哪种模式

- 想法还很模糊时，用 **Explore mode**
- 产品形态已经比较稳定时，用 **Package mode**
- 想从 chronicle 里提炼可复用流程时，用 **Skill mining mode**

## 它会输出什么

主要产物包括：

- `spec.md`：产品和技术方向
- `plan.md`：执行步骤、前置要求和验证计划
- `one-shot-prompt.md`：给 AI 直接生成项目的开发 prompt
- `implementation-handoff.md`：给下一个 AI 编码 agent 的交接说明
- `chronicle/*.md`：工作历史记录
- `skill-suggestions/<skill-name>.md`：可复用工作流草案
- 模板文件：保证不同工具输出一致

## 主链路

只使用一条链路，避免多个路径让使用者难以选择：

```text
idea -> spec -> plan -> one-shot prompt -> implementation handoff -> chronicle -> skill suggestion
```

`one-shot prompt` 是主链路的一部分，不是另一套独立流程。

## 默认输出路径

生成产物默认写入：

```text
ai-workflow/<project-slug>/
```

推荐结构：

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

这样用户和后续 AI agent 都能在固定位置找到产物。

`plan.md` 需要把前置要求和技术栈分开，避免把开始编码前的约束误写成实现选型。

## 它能做什么

当你只有一个模糊想法时，例如：

```text
我想做一个和 AI 测试相关的产品，但还没想清楚具体形态。
```

这个工作流会逐步引导你明确：

1. 产品目标
2. 目标用户
3. 核心流程
4. MVP 范围
5. 数据模型
6. 架构和技术栈
7. 技术选型依据
8. 前置要求 / 开始编码前约束
9. 安全边界
10. 开发阶段
11. 验证标准
12. one-shot app generation prompt
13. implementation handoff
14. 必要时生成 chronicle 和 skill suggestion

## 仓库结构

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

## Codex 安装

这个仓库包含可安装的 Codex skill。用户不需要手动阅读所有文档再使用。

把 skill 文件夹复制到 Codex skills 目录：

```powershell
Copy-Item -Recurse -Force .\skills\idea-to-app-spec $env:USERPROFILE\.codex\skills\idea-to-app-spec
```

然后打开新的 Codex 会话并输入：

```text
Use idea-to-app-spec. I have a rough app idea: ...
```

skill 会把产物写入 `ai-workflow/<project-slug>/`，并在开始大规模实现前先询问确认。

## Claude Code 使用方式

Claude Code 不会原生加载 Codex 的 `SKILL.md`。你可以把本仓库作为项目说明源，或者复制下面文档里的简短工作流：

```text
docs/claude-code-usage.md
```

如果要使用生成后的 one-shot prompt：

```text
ai-workflow/<project-slug>/one-shot-prompt.md
```

如果要让 Claude Code 直接开始实现：

```text
ai-workflow/<project-slug>/implementation-handoff.md
```

## 推荐工作流

当想法还不清楚时，不要一上来就写巨大的构建 prompt。

使用一条有序链路：

```text
rough idea -> product shape -> spec -> plan -> one-shot prompt -> implementation handoff
```

实现发生后，再沿着同一条链路继续生成 chronicle 和 skill suggestion。

常用文件：

- `templates/spec-to-task-template.md`：执行计划模板
- `templates/spec-to-one-shot-prompt-template.md`：AI 直接生成项目的 prompt 模板
- `templates/chronicle-template.md`：工作历史记录模板
- `templates/skill-suggestion-template.md`：可复用 skill 草案模板
- `docs/chronicle-skill-workflow-plan.md`：整体工作流设计
- `docs/chronicle-skill-workflow-usage.md`：Codex 和 Claude Code 使用方式

## 示例触发语

```text
帮我把这个粗略想法整理成可开发的 App 规格文档。
```

```text
我想做一个 App，但还没想清楚架构和产品形态。请一步步引导我完善。
```

```text
把这个自然语言想法转换成可以直接交给 AI 编码工具执行的 one-shot development prompt。
```

```text
我有一个模糊的产品想法。请先问我必要的问题，然后帮我把它变成可开发的方案。
```

```text
使用 idea-to-app-spec。请在 ai-workflow/<project-slug>/ 下生成完整交付包，并在开始实现前先询问我。
```

## 来源示例

`skills/idea-to-app-spec/references/project-generation-prompt-playbook.zh-CN.md` 是从 MeteorTest 的真实项目规划会话中整理出来的详细中文参考。

它适合作为参考材料，不建议每次都完整复制进对话。
