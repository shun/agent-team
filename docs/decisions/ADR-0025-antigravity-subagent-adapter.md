# ADR-0025: Antigravity の動的サブエージェント adapter を追加する

> 状態: 承認済み（2026-07-22 人間依頼 / 2026-08-22 文面承認） / 起案: 人間 /
> 整理: Gen（玄）/ 文面: Aira
> **[ADR-0014](ADR-0014-tool-adapter-rollout-order.md) の比較順は更新しない。**
> 本 ADR は、比較ゲート完了前の人間依頼による順序未完了の例外記録である。
> Claude Code 比較は未実施のまま残す。

## 背景

基準経路は Codex の名前付きサブエージェントである。ADR-0014 は比較順を
Codex、Claude Code、Antigravity とし、実測なしの順序固定を捨てた。
人間は 2026-07-22 に「7人の役割は変えず、Antigravity の subagent でも
動くようにする」と依頼した。比較完了を待たず adapter を追加した。

## 決定

- 進行役は Antigravity でもメイン会話とし、サブエージェントとして起動しない
- Shino、Kai、Toki、Rin、Ritsu、Hayate は `.agents/agents.md` を薄い
  アダプタとして、Antigravity の `define_subagent` / `invoke_subagent` で
  動的に起動する
- サブエージェントは親モデルを継承する。親の model ID が
  `gemini-3.6-flash-high` / `gemini-3.6-flash-medium` /
  `gemini-3.6-flash-low` のいずれかであることを起動前に確認し、
  別モデルへ fallback しない
- 役割、責務境界、Markdown 成果物、安全境界、停止条件は変更しない
- 親会話は Local Mode。各 subagent は親の同一 workspace 継承を明示する。
  New Worktree Mode、自動 Git worktree、または起動前に workspace 選択を
  確認できない状態では、全 role の dispatch を停止する
- write tools の Boolean フラグは per-file 強制の証明にしない。
  未観測の path containment は `unknown` とする
- Ritsu / Hayate の既存 repository file 更新は、従来の技術的 write 隔離条件を
  満たすまで委譲しない

## 理由

platform 差を adapter に閉じ込めれば、7人の責務と Markdown 連携を変えずに
実行経路を足せる。人間依頼は比較順の更新ではなく、未完了ゲートの例外である。

## 捨てた選択肢

- 進行役を含む7人すべてを subagent にする
- 各役割を組み込み generic agent へ fallback する
- 未確認の model ID を推測して固定する
- 自動 Git worktree で Ritsu / Hayate を隔離する
- ADR-0014 の比較順を、本追加をもって完了とみなす

## 未実証（実機 pass ではない）

2026-07-22 の Rin 差分再レビューは、オープン指摘なしの**文面判定**である。
Antigravity 実機、`define_subagent` / `invoke_subagent`、model 継承、
fresh context、tool 権限の per-run 証跡は未観測である。未観測値は
`unknown` のまま停止・報告する。指摘なしを実機合格として使わない。

## 影響

- `.agents/agents.md`、`.agents/workflows/agent-team.md`、
  `.agents/skills/agent-team/SKILL.md`、`team.md`、`safety.md`、
  `workflow.md` へ反映済み
- ADR-0014 の決定本文から Claude Code 比較未実施を消さない
- 実機 pilot は別の人間判断後に行う
