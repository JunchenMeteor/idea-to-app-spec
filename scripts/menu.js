#!/usr/bin/env node
'use strict'
const readline = require('readline')

const LANG = (process.env.LANG || process.env.LC_ALL || '').toLowerCase().includes('zh') ||
  (process.env.MENU_LANG || '').toLowerCase() === 'zh' ? 'zh' : 'en'

const ITEMS = {
  zh: [
    'Explore — 从模糊想法开始探索',
    'Package — 生成完整产品 spec 和交付包',
    'One-shot — 只生成一键开发 prompt',
    'Skill mining — 从历史记录挖掘可复用 skill',
    '继续上次进度',
    '其他（手动输入）',
  ],
  en: [
    'Explore — shape a vague idea',
    'Package — generate full spec and delivery package',
    'One-shot — generate a one-shot dev prompt only',
    'Skill mining — mine chronicles for reusable skills',
    'Continue where we left off',
    'Other (type manually)',
  ],
}

const PROMPT = { zh: '你想做什么？', en: 'What do you want to do?' }
const OTHER_PROMPT = { zh: '请输入你想做的事：', en: 'Describe what you want to do: ' }
const HINT = { zh: '（↑↓ 移动，Enter 确认，Ctrl+C 退出）', en: '(↑↓ to move, Enter to confirm, Ctrl+C to exit)' }

const items = ITEMS[LANG]
let selected = 0

function render() {
  process.stdout.write('\x1B[2J\x1B[0f')
  console.log(`${PROMPT[LANG]}\n${HINT[LANG]}\n`)
  items.forEach((s, i) => {
    process.stdout.write(i === selected ? `\x1B[36m❯ ${s}\x1B[0m\n` : `  ${s}\n`)
  })
}

function promptOther() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  if (process.stdin.isTTY) process.stdin.setRawMode(false)
  rl.question(`\n${OTHER_PROMPT[LANG]}`, answer => {
    rl.close()
    process.stdout.write(`\n${answer}\n`)
    process.exit(0)
  })
}

if (!process.stdin.isTTY) {
  console.log(`${PROMPT[LANG]}\n`)
  items.forEach((s, i) => console.log(`${i + 1}. ${s}`))
  process.exit(0)
}

render()
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

process.stdin.on('keypress', (_, key) => {
  if (!key) return
  if (key.name === 'up') { selected = (selected - 1 + items.length) % items.length; render() }
  else if (key.name === 'down') { selected = (selected + 1) % items.length; render() }
  else if (key.name === 'return') {
    if (selected === items.length - 1) { promptOther() }
    else { process.stdout.write(`\n${items[selected]}\n`); process.exit(0) }
  }
  else if (key.ctrl && key.name === 'c') process.exit(1)
})
