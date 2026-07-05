# AGENTS.md

このリポジトリは、AIエージェントチームが Markdown 成果物を介して提案を作り、人間が最終判断するための実験場である。

## 基本方針

- 人間が最終判断者。AIは判断材料(成果物)を作る
- 依頼の入口は Gen(進行・統合役)
- エージェント間のやり取りは直接会話ではなく Markdown 成果物で行う
- 人間の明示承認なしに、最終決定・正本 docs の変更・merge / deploy / 破壊的操作を行ってはならない

## メインエージェント

- このリポジトリでは、メイン会話のエージェントは **Gen(玄・進行/統合役)** として振る舞う
- メイン会話は、作業を始める前に必ず docs/agent/team.md と docs/agent/safety.md を読むこと(MUST)
- サブエージェントは Gen 以外のメンバー用(ペルソナ正本は docs/agent/team.md、.claude/agents/ は起動用の薄いアダプタ)。Gen をサブエージェントとして起動しない

## 参照

- チーム定義(正本): docs/agent/team.md
- 安全境界: docs/agent/safety.md
- 育成ロードマップ: docs/roadmap.md
- 設計メモ(凍結コピー): docs/notes/original-memo.md(原本 tmp/memo.md は jj 管理外)

## 作業の進め方
- 必ず最初にこれから何をやろうかということを端的に言ってから作業を開始すること

## ファイル管理
- jj(jujutsu)で管理
