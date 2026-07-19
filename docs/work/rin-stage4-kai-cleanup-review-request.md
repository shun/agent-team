# Rinレビュー依頼: Stage 4 Kai成果物整理案A

- 依頼者: Gen（玄）
- 担当: Rin（凛）
- 状態: **実行済み（2026-07-19）**
- 最大出力: 160行
- 再試行: 0回

## 目的

人間が承認した整理案Aについて、10件を未コミットのまま削除する前に、判断根拠の
欠落、参照切れ、状態の矛盾、安全ゲートの後退がないかを重大度順に確認する。

## 読み取りallowlist

正本・運用境界:

- `docs/agent/team.md` のRin節・Kai節
- `docs/agent/safety.md`
- `docs/agent/workflow.md`
- `docs/decisions/ADR-0015-kai-conditional-participation.md`

進捗・整理案:

- `docs/work/current-task.md`
- `docs/work/stage4-kai-cleanup-plan.md`

残す9件:

- `docs/work/stage4-technical-enforcement-input.md`
- `docs/work/shino-stage4-request.md`
- `docs/work/requirements.md`
- `docs/work/open-questions.md`
- `docs/work/kai-stage4-trial-request.md`
- `docs/work/architecture-options.md`
- `docs/work/risk-review-stage4-kai-onboarding.md`
- `docs/work/risk-review-stage4-kai-trial.md`
- `docs/work/stage4-kai-trial-retrospective.md`

整理候補10件:

- `docs/work/kai-definition-draft.md`
- `docs/work/kai-adapter-draft.md`
- `docs/work/kai-onboarding-review-response.md`
- `docs/work/rin-stage4-kai-onboarding-review-request.md`
- `docs/work/rin-stage4-kai-onboarding-rereview-request.md`
- `docs/work/rin-stage4-kai-trial-review-request.md`
- `docs/work/rin-stage4-kai-trial-rereview-request.md`
- `docs/work/stage4-kai-decision-brief.md`
- `docs/work/stage4-kai-decision-summary.md`
- `docs/work/stage4-kai-launch-decision-summary.md`

後続の恒久・現役記録:

- `docs/work/risk-review-stage4-kai-trial-rereview.md`
- `docs/work/stage4-kai-trial-decision-summary.md`
- `.ai/board/growth-log.md` のStage 4 Kai関連エントリ
- `.ai/board/handoff-log.md` のStage 4 Kai関連エントリ

## レビュー観点

1. 整理候補10件にしか存在しないP0/P1判断・人間承認・停止条件の有無
2. 残す9件、正本、current-task、ログからKai参加判断を再構成できるか
3. 整理候補削除後に現役Markdownリンクまたは必須参照が壊れないか
4. 技術方式A・B・Cが未採用、Tokiが未承認、削除が未実施という状態の一貫性
5. 過去レビュー内の削除対象名が、当時の対象記録として残ってよいか
6. 削除前に追加で集約すべき具体的な文言または参照先

## 出力契約

`docs/work/risk-review-stage4-kai-cleanup.md`だけを新規作成する。

- 冒頭に結論とP0/P1/P2件数
- 指摘ごとにID、重大度、対象、問題、失敗パターン、緩和策、人間判断要否
- P0/P1がない場合も、10件の削除を安全に最終判断へ戻せる条件を明記
- 技術方式、Toki開始、削除実行を決定しない
- 他ファイルの作成・編集・削除、VCS操作、外部調査を行わない

入力不足または出力先が既に存在する場合は、書き込まず停止理由を報告する。
