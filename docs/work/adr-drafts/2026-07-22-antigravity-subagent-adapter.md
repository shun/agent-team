# ADR候補: Antigravityの動的サブエージェントで7人構成を実行する

> 状態: 候補（未昇格） / 2026-07-22 / 起案: 人間 / 整理: Gen（玄）

## 背景

現在の基準経路はCodexの名前付きサブエージェントである。人間は、Gemini 3.6 Flashが
利用可能になったことを受け、同じ7人の役割をAntigravityのサブエージェントでも動かす
よう依頼した。

## 判断案

- GenはAntigravityでもメイン会話とし、サブエージェントとして起動しない。
- Shino、Kai、Toki、Rin、Ritsu、Hayateは、`.agents/agents.md`を薄いアダプタとして
  Antigravityの`define_subagent` / `invoke_subagent`で動的に起動する。
- Antigravityのサブエージェントは親モデルを継承するため、親セッションのmodel IDが
  `gemini-3.6-flash-high` / `gemini-3.6-flash-medium` / `gemini-3.6-flash-low`の
  いずれかであることを起動前に確認し、別モデルへfallbackしない。tierは人間が選ぶ
  session設定であり、役割差として扱わない。
- 役割、責務境界、Markdown成果物、安全境界、停止条件は変更しない。変えるのは
  platform固有のdispatch構文とmodel設定だけとする。
- 親会話はLocal Modeで開始し、各subagentに親の同一workspace継承を明示する。
  New Worktree Mode、自動Git worktree、または起動前にworkspace選択を確認できない状態では
  全roleのdispatchを停止する。既存repository fileの実装委譲には、VCSを使わない別途承認・
  準備済みの技術的write隔離を要求する。

## 理由

Antigravityの公式仕様ではcustom subagentは親の会話履歴を継承しないcontextと親の権限・
model継承を提供するとされる。ただし本repositoryでのper-run実証前は、fresh性、権限、model
継承を`unknown`として扱う。これらの成立時にplatform差をadapterへ閉じ込めれば、7人の
責務とMarkdown成果物による連携を変えずに実行経路を追加できる。

## 採用しない案

- Genを含む7人すべてをsubagentにする: チームの入口と統合責任が変わる。
- 各役割をAntigravityの組み込みgeneric agentへfallbackする: 名前付き責務と停止条件を失う。
- 未確認のmodel IDを推測して固定する: rollout差分で壊れやすく、実modelの証跡にならない。
- 自動Git worktreeでRitsu/Hayateを隔離する: このrepositoryのVCS人間限定境界に反する。

## 影響と未検証

- `.agents/agents.md`と`.agents/workflows/agent-team.md`を追加する。Antigravity CLIは
  `.agents/workflows/`をslash commandとしてdiscoverしないため、CLI用の薄い入口を
  `.agents/skills/agent-team/SKILL.md`へ置く。
- ローカルの`agy 1.1.5`で上記3 model IDの列挙を確認した。動的定義、model継承、fresh性、
  Local Modeと同一workspace継承、tool権限、成果物受渡しは未実証であり、Codexと同じ
  スモーク観点で別途確認する。自動worktree不使用を起動前に確認できるまでdispatchしない。
- `agy 1.1.5`を再起動し、モデルへ送信せずslash補完上に`/agent-team`が表示されることを
  確認した。
- 正式ADRへの昇格、一般的な品質・速度評価、Codex経路の置換はこの候補では行わない。
