# 项目生成提示词手册

这份文档用于把自然语言想法整理成可执行的 AI 项目生成提示词。它以 MeteorTest 为例，也可以复用于其他项目。

## 一、MeteorTest 项目生成提示词模板

下面这份提示词适合在一条新会话中使用，让 AI 从零生成一个类似 MeteorTest 的项目。

```md
## 角色

你是一个资深全栈工程师和测试平台架构师，擅长 Next.js + TypeScript + Supabase + Python Agent + 自动化测试平台开发。你理解测试任务调度、报告收集、AI 失败分析、私有执行器、安全边界和公网预览部署。

## 项目名称

开发一个叫 MeteorTest 的自动化测试平台，中文名为「星流测试台」。

## 项目目标

实现一个简易但完整的 AI 辅助自动化测试平台，用于管理多个测试项目、导入测试套件、创建测试任务、调度私有 Local Agent、收集测试报告，并通过 AI 分析失败原因。

平台本体只负责控制面和数据面；真实测试执行必须由用户本地或私有环境中的 Local Agent 完成，公网 Web 不允许直接启动或暴露本机执行器。

## 核心功能

1. 项目管理
   - 支持创建、编辑、删除测试项目
   - 每个项目包含 key、name、repo_url、description
   - 支持通过 `meteortest.yml` 导入测试套件
   - suite 支持 api / ui / performance 类型

2. 测试任务管理
   - 支持创建测试任务
   - 任务关联 project、suite、environment、app_build
   - 任务状态包括 queued、running、succeeded、failed、cancelled、timeout
   - 支持任务详情页展示执行状态、日志、报告、AI 分析

3. 构建产物管理
   - 支持登记 `.ipa`、`.apk`、`.app` 或 build URL
   - 任务可选择构建产物
   - 只保存 metadata，不上传真实敏感包

4. Local Agent
   - 使用 Python 实现
   - 支持读取配置文件
   - 支持轮询 Supabase tasks 表
   - 支持锁定 queued 任务，执行 suite command
   - 支持收集 stdout/stderr 日志
   - 支持回写 task status、reports、ai_analyses
   - 支持本地 JSON 模式，便于无 Supabase 时开发调试

5. AI 失败分析
   - 失败任务完成后读取截断日志
   - 调用 LLM API 生成结构化分析
   - 输出字段包括 failure_reason、impact、suggestion、suspected_files、flaky_probability、raw_response
   - 写入 `ai_analyses` 表
   - 任务详情页和报告页展示 AI 分析结果

6. AI 助手
   - 提供 Web AI Chat 页面
   - 支持查询最近任务、失败任务、报告摘要、AI 分析
   - 支持通过自然语言创建测试任务
   - 第一版只做 SQL 型报告问答，不做 pgvector
   - 预留后续 LangChain / pgvector / RAG 接入点

7. 账号与权限
   - 使用 Supabase Auth
   - 支持 viewer / operator / admin 三种角色
   - viewer 可查看
   - operator 可创建任务和构建产物
   - admin 可管理项目、suite、用户角色和删除数据
   - 数据库启用 RLS

8. 公网预览安全
   - 支持 `METEORTEST_PUBLIC_PREVIEW=1`
   - 公网预览模式禁止启动 Local Agent
   - `/api/agent/status` 在公网预览下只返回 disabled/unavailable
   - 不允许暴露本地路径、token、secret、内部 URL、真实设备信息
   - preview 数据必须是 demo 或脱敏数据

9. 管理页面
   - Dashboard：展示今日任务、成功率、失败数、执行器状态
   - Projects：项目和 suite 管理
   - Tasks：任务队列和状态筛选
   - Reports：报告列表、失败原因、AI 分析
   - Builds：构建产物管理
   - Executors：执行器状态和本地 Agent 指引
   - AI：AI 助手和报告问答
   - Settings：平台名称、语言、主题、AI 模型、默认环境、Agent 策略

## 技术栈

- Web 框架：Next.js + TypeScript
- UI：React + CSS Modules 或 Tailwind，保持工程控制台风格
- 数据库：Supabase Postgres
- Auth：Supabase Auth
- Agent：Python 3
- AI 调用：OpenAI-compatible API，默认 DeepSeek，可通过环境变量配置
- 图表：Recharts
- 测试：ESLint、Next.js build、Python pytest

## 数据库设计

至少包含这些表：

- profiles
- projects
- test_suites
- app_builds
- executors
- tasks
- reports
- ai_analyses
- user_preferences
- ai_conversations
- ai_messages
- feedbacks

必须提供 Supabase migration SQL。

## 环境变量

使用 `.env.local.example` 提供示例：

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DEEPSEEK_API_KEY=
DEEPSEEK_BASE_URL=https://api.deepseek.com
METEORTEST_PUBLIC_PREVIEW=0
METEORTEST_AGENT_DISABLED=0
```

Agent 使用独立配置文件：

```yaml
platform:
  mode: supabase
  supabase_url: https://xxx.supabase.co
  supabase_service_role_key_env: SUPABASE_SERVICE_ROLE_KEY

repositories:
  - key: sample-ios
    path: ../iOS-Automation-Framework
    contract: meteortest.yml

artifacts:
  local_output_root: .meteortest-agent/artifacts
  supabase_bucket: test-artifacts
```

## UI 设计要求

页面风格参考现代 DevOps / 测试控制台，不做营销落地页。

要求：

- 浅色主题优先，清爽、克制、信息密度适中
- 页面应像真实工程平台，不要像通用 SaaS 官网
- Dashboard 有状态卡、任务趋势、失败概览
- 表格、状态 badge、筛选器、空状态要完整
- 移动端可用
- 不要使用大面积渐变、装饰性卡片堆叠和空洞文案

## AI 架构要求

第一版不要直接引入复杂 RAG。

推荐实现顺序：

1. 先实现 SQL 型 AI 报告问答
2. 把 AI Chat route 拆成：
   - context
   - prompts
   - tools
   - reportQueries
   - suggestions
   - model
3. 预留 LangChain 接入点
4. 后续再实现 pgvector

必须避免：

- 不要把完整日志无节制发给模型
- 不要索引 secret、token、cookie、真实客户数据
- 不要让 AI 自动执行危险操作
- 不要让公网 Web 直接控制本地 Agent

## 交付要求

1. 生成完整可运行代码
2. 包含 README 中文和英文版本
3. 包含 Supabase migration
4. 包含 Agent README 和配置示例
5. 包含 `meteortest.example.yml`
6. 包含 public preview runbook
7. 包含 AI / LangChain 后续改造计划
8. 每完成一个阶段运行验证：
   - `npm run lint`
   - `npm run build`
   - `python -m pytest agent/tests -q`
9. 如果测试无法运行，明确说明原因和缺失环境

## 开发顺序

请按以下顺序实现：

1. 初始化 Next.js 项目结构
2. 建立 Supabase schema 和类型
3. 实现 Dashboard / Projects / Tasks / Reports 基础页面
4. 实现 Local Agent MVP
5. 实现报告回写和任务详情
6. 实现 AI 失败分析
7. 实现 AI Chat 的 SQL 型报告问答
8. 实现 Auth/RLS/角色权限
9. 实现 public preview 安全模式
10. 补充文档和验证脚本

## 输出格式

请先给出简短实现计划，然后直接开始创建代码。不要只写方案，必须实际落地文件。
```

## 二、实际使用建议

如果目标是高质量生成，不建议一次性要求 AI 做完所有功能。

更稳的会话拆分方式：

1. 生成项目骨架、README、目录结构、数据库 schema。
2. 实现 Web 基础页面。
3. 实现 Supabase 数据访问和 RLS。
4. 实现 Local Agent。
5. 跑通 `Project -> Suite -> Task -> Agent -> Report` 闭环。
6. 实现 AI 失败分析。
7. 实现 AI Chat 和 SQL 型报告问答。
8. 实现 public preview 安全模式。
9. 补齐文档、smoke test 和部署 runbook。

优先跑通最小闭环：

```text
Project -> Suite -> Task -> Agent -> Report -> AI Analysis
```

闭环跑通后，再加账号、权限、AI Chat、pgvector、LangChain。

## 三、前期准备清单

开始生成项目之前，需要准备：

### 业务边界

- 项目是从零生成，还是基于现有仓库继续开发。
- 第一版是否必须支持公网预览。
- 第一版是否需要真实 Supabase，还是先用本地 mock。
- AI 是否可以创建任务，还是只能查询和建议。

### 技术资源

- Supabase 项目。
- Supabase anon key。
- Supabase service role key。
- LLM API key，例如 DeepSeek、OpenAI-compatible endpoint、Azure OpenAI。
- 可运行 Python Agent 的私有机器。
- 可选：Vercel 账号和预览域名。

### 样例数据

- 一个测试项目样例。
- 一个 `meteortest.yml`。
- 至少 3 条 demo task：queued、succeeded、failed。
- 一段脱敏失败日志。
- 一个 demo executor。
- 一个 demo app build metadata。

### 安全边界

- 日志是否可以发给模型。
- 是否允许完整日志进入 AI。
- 是否允许真实构建产物 URL。
- 是否允许公网 preview 查询真实数据。
- 哪些操作需要 operator 或 admin。
- 哪些字段需要脱敏。

## 四、把自然语言变成提示词的能力训练

要把“自然语言描述”转换成“可执行提示词”，核心是训练一种结构化拆解能力。

### 1. 先问清楚一句话目标

把想法压缩成一句话：

```text
我要做一个什么东西，给谁用，解决什么问题。
```

例子：

```text
我要做一个 AI 辅助自动化测试平台，给测试和客户端工程团队用，用来统一管理测试任务、执行器、报告和失败分析。
```

### 2. 拆出用户角色

至少写清楚：

- 管理员要做什么。
- 普通用户要做什么。
- 系统自动做什么。
- 外部服务做什么。

MeteorTest 示例：

- admin 管项目、suite、权限。
- operator 创建任务和构建产物。
- viewer 查看结果。
- Agent 执行任务。
- AI 分析失败。

### 3. 拆出核心闭环

优秀提示词必须有闭环，不只是功能列表。

用这个模板：

```text
输入 -> 处理 -> 状态变化 -> 输出 -> 用户下一步动作
```

MeteorTest：

```text
导入 suite -> 创建任务 -> Agent 执行 -> 回写报告 -> AI 分析 -> 用户查看和重跑
```

### 4. 写清楚数据模型

AI 生成项目时最容易乱的是数据模型。你要提前给表、字段、状态枚举。

至少准备：

- 实体表。
- 关键字段。
- 状态枚举。
- 关联关系。
- 删除规则。
- 权限规则。

### 5. 明确非目标

提示词里要写“不做什么”。这能显著降低跑偏。

例子：

- 第一版不做 pgvector。
- 不暴露公网 Agent。
- 不索引完整日志。
- 不让 AI 自动执行危险操作。
- 不做营销官网。

### 6. 指定技术栈和约束

写清楚：

- 框架。
- 数据库。
- Auth。
- UI 风格。
- 测试命令。
- 环境变量。
- 部署边界。

不要只写“用现代技术栈”。

### 7. 指定开发顺序

不要让 AI 自己猜优先级。

推荐顺序：

```text
schema -> backend API -> core pages -> worker/agent -> AI -> auth -> docs -> tests
```

### 8. 指定验收标准

每个阶段都要能验证：

- 哪些命令必须通过。
- 哪些页面必须打开。
- 哪些 API 必须返回。
- 哪些数据必须写入。

### 9. 让 AI 先计划，再落地

提示词最后写：

```text
请先给出简短实现计划，然后直接创建代码。不要只写方案。
```

### 10. 迭代时使用“差异提示”

不要每次重贴全部大提示词。后续迭代用：

```text
基于当前项目，新增 X。
保持 A/B/C 不变。
不要改 D。
完成后运行 Y 验证。
```

## 五、通用提示词框架

以后你可以按这个框架写任何项目提示词：

```md
## 角色
你是谁，擅长什么技术栈和领域。

## 项目目标
我要做什么，给谁用，解决什么问题。

## 核心闭环
输入 -> 处理 -> 状态变化 -> 输出 -> 下一步动作。

## 核心功能
按模块列功能，不要只写页面。

## 数据模型
列实体、字段、关系、状态枚举。

## 技术栈
框架、数据库、Auth、UI、图表、测试、部署。

## 安全边界
哪些数据不能暴露，哪些操作不能自动执行。

## UI 要求
目标用户、页面风格、响应式、信息密度。

## 非目标
第一版明确不做什么。

## 交付要求
必须生成哪些文件，必须包含哪些文档。

## 验证要求
必须运行哪些命令，如何判断成功。

## 开发顺序
按阶段实现，不要乱跳。

## 输出格式
先计划，再实现；不要只写方案。
```

## 六、练习方法

### 练习 1：一句话变闭环

输入：

```text
我想做一个管理测试任务的平台。
```

输出：

```text
创建项目 -> 导入 suite -> 创建任务 -> Agent 执行 -> 上传报告 -> AI 分析 -> 用户查看并决定是否重跑
```

### 练习 2：功能变数据模型

输入：

```text
我要能创建任务并查看报告。
```

输出：

```text
tasks(id, project_id, suite_id, status, environment, created_at, started_at, finished_at)
reports(id, task_id, summary, log_url, allure_url, created_at)
```

### 练习 3：愿望变约束

输入：

```text
我要 AI 帮我分析失败。
```

输出：

```text
AI 只读取截断后的失败日志和 report summary。
不发送 secret、token、真实账号。
输出 JSON：failure_reason、impact、suggestion、suspected_files、flaky_probability。
```

### 练习 4：功能变验收

输入：

```text
我要有 Agent。
```

输出：

```text
给定 queued task，Agent 能锁定任务、执行 suite command、写入 running/succeeded/failed 状态、生成 report，并通过 pytest 覆盖本地 JSON 模式。
```

## 七、个人能力建设建议

想把这种能力变成自己的能力，建议固定做三件事：

1. 每次有想法，先写“目标、闭环、数据模型、非目标”四段。
2. 每次让 AI 开发前，先让它复述需求和风险，看是否理解正确。
3. 每次项目完成后，把提示词、踩坑、验收命令沉淀到文档里。

判断提示词是否合格的标准：

- AI 不需要再问大量基础问题。
- AI 能知道先做什么后做什么。
- AI 不会把项目做成另一个方向。
- AI 知道哪些事情不能做。
- AI 生成的东西能被命令验证。

如果一个提示词只有“做一个 XX 系统”，它还不是工程提示词。
如果它包含目标、闭环、数据模型、安全边界、技术栈、开发顺序和验收标准，它才接近可执行规格。
