# current-task: Stage 5 — フルサイクル検証

- 更新: 2026-07-20 / 更新者: Gen（玄）
- 状態: **未着手**
- 直前の完了: Stage 4 **完了（条件付き）**
- 次の判断者: 人間

本書は現在地と次の開始ゲートだけを保持する。Stage 4の判断理由は正本ADR、
成長記録、handoff、残した一次証跡へ集約済みであり、完了済みの逐次経過はここで
重複管理しない。

## 1. 現在地

Stage 4ではKaiとTokiが加入し、5人構成と標準workflowを正本化した。Stage 5の
実テーマ、入出力、実装範囲はまだ決めておらず、フルサイクル検証は開始していない。

現在の正本は次のとおりである。

- [チーム定義](../agent/team.md)
- [安全境界](../agent/safety.md)
- [標準workflow](../agent/workflow.md)
- [ロードマップ](../roadmap.md)
- [Kai参加判断](../decisions/ADR-0015-kai-conditional-participation.md)
- [Toki参加判断](../decisions/ADR-0016-toki-test-analysis-participation.md)
- [Toki出力量方針](../decisions/ADR-0017-toki-trial-output-size-policy.md)
- [5人標準workflow](../decisions/ADR-0018-five-member-standard-workflow.md)
- [テスト分析先行TDD](../decisions/ADR-0019-test-analysis-first-tdd.md)

## 2. Stage 4の確定結果

Stage 4で確定した現在状態は次のとおりである。

- Kaiは条件付き参加済みである。
- Tokiはテスト分析・テスト項目設計担当として加入済みである。
- 標準フローは、人間 → Gen → Shino → Kai → Toki → Rin → Gen → 人間である。
- コード実装では、Tokiのテスト分析、人間の項目承認、テスト骨組みレビュー、
  RED → GREEN → REFACTORの順を採用する。
- Stage 4は2026-07-19に条件付き完了した。
- Toki関連の中間ドラフト・依頼・判断前資料36件は、正本と主要証跡への集約後、
  2026-07-20の人間承認により未コミットのまま削除した。

## 3. 継続する境界

Stage 4完了後も、次の事項は未検証または未採用である。

- Kai・Tokiの初回結果は各1サンプルであり、再現性を証明しない。
- fresh context内部、read/write非逸脱、安全性、技術的強制は未検証である。
- `architecture-options.md`の技術方式A・B・Cは未採用である。
- sandbox・permission profile変更、PoC、設定変更、外部調査は未承認である。
- Tokiは初期責務としてテスト実行、証跡生成、実結果評価、最終合否を担当しない。

Toki初回試運転の`CD-01`は未解消である。各`TI-01`〜`TI-11`には入力版が直接
記載されていないため、G4入力SHA-256との外部結合で追跡性を補う。後続転記では
`analysis-draft`、承認者なし、ゲート利用不可、G4入力SHA-256を不可分に保持する。

## 4. 残すStage 4証跡

後から条件付き採用を振り返るため、Tokiの一次成果、固定契約、評価、主要レビューを
次の11件へ限定して残す。

- [初回成果物](test-analysis.md)
- [試運転契約TC-1](toki-stage4-initial-trial-contract-draft.md)
- [非公開評価計画EP-1](toki-stage4-initial-trial-evaluation-plan.md)
- [G3承認記録](toki-stage4-initial-trial-g3-approval-record.md)
- [G4承認記録](toki-stage4-initial-trial-g4-approval-record.md)
- [G5 dispatch記録](toki-stage4-initial-trial-g5-dispatch-record.md)
- [Gen評価](toki-stage4-initial-trial-gen-evaluation.md)
- [Genレビュー対応](toki-stage4-initial-trial-gen-response.md)
- [Rin初回レビュー](risk-review-stage4-toki-initial-trial.md)
- [Rin差分再レビュー](risk-review-stage4-toki-initial-trial-rereview.md)
- [人間判断記録](toki-stage4-initial-trial-human-decision-record.md)

初回成果物のSHA-256は
`3c0594e6a1d3eadf6c058161d4392848f37a8c36f1c04acf3eb5622306291c59`、G4入力の
SHA-256は`b2be3698f34b92d4056d4460413c0cafdc37fdcd824ceb623748322922bd82cf`である。

## 5. Stage 5開始ゲート

Stage 5を開始する前に、人間とGenは次を固定する。

1. 検証に使う実テーマと期待する人間判断。
2. Shino、Kai、Toki、Rinの参加範囲と、省略する場合の理由。
3. 各agentのread/write allowlist、停止条件、再試行上限、fallback禁止。
4. コード実装、実テスト、PoC、設定変更、外部調査を含むか。
5. 機密性、安全境界、sandbox・permission profileを変更しないこと。
6. 完了条件と、条件未充足時に人間へ戻す判断ゲート。

このゲートが確定するまで、Stage 5のagent起動、実装、実テスト、外部調査、
設定変更を開始しない。
