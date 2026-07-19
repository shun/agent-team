# Rinリスクレビュー: Stage 4 Kai成果物整理案A（削除前）

- 結論: **P0 0件 / P1 0件 / P2 1件**
- 判定: **整理候補10件の削除可否を、人間の最終承認ゲートへ戻してよい。**
- 現在地: 案A・分類・通常コミット履歴へ残さない方針は人間承認済みだが、
  **10件の削除実行は未承認・未実施**である。本レビューは削除を承認しない。
- 不変条件: 技術方式A・B・Cは未採用、Tokiは未承認、Stage 4は進行中のまま。

## 重大度順の指摘

### CLEANUP-R01

- **重大度:** P2
- **対象:** `.ai/board/handoff-log.md` 先頭の「Stage 4 Kai成果物整理案」エントリ、
  `docs/work/current-task.md` 19節、`docs/work/stage4-kai-cleanup-plan.md` 7節
- **問題:** 先頭handoffは当時の記録として「案Aの人間判断待ち」「9件の状態同期・
  参照修正・Rinレビュー未実施」と記す一方、current-taskと整理案は案A承認・同期後・
  削除前レビュー中まで進んでいる。過去エントリを改変しない方針自体は妥当だが、
  削除後も新しい記録がなければ、セッション復帰時の状態が二義的になる。
- **失敗パターン:** 次のGenが先頭handoffだけを根拠に、承認済み分類を再度判断待ちへ
  戻す、状態同期を重複実施する、または削除実行済みかを判別できない。
- **緩和策:** 過去エントリは変更せず、最終判断と実行結果が出た時点で、
  `handoff-log.md` の先頭へ「案A承認済み / Rinレビュー結果 / 削除の承認結果・
  実施結果 / 技術方式保留 / Toki未承認」を新規追記する。削除前は
  `current-task.md` 19節を進捗の正として扱う。
- **人間判断要否:** 不要。整理案7節の既定手順を省略しないことで緩和可能。

## 削除候補10件にしかない重大判断の確認

**未処理のP0/P1、人間承認、停止条件は確認されなかった。** 主な受け皿は次のとおり。

| 判断・証跡 | 削除後の受け皿 |
|---|---|
| Kai定義・adapter・起動境界の初回P1 7件、P2 1件、新規P1 KAI-R09、解消判定、人間判断 | `risk-review-stage4-kai-onboarding.md`、`team.md` Kai節、`kai-stage4-trial-request.md`、`current-task.md`、growth/handoffログ |
| Kai定義反映・adapter作成・試運転依頼確定・名前付き起動の承認と実施 | `current-task.md` 1〜18節、`risk-review-stage4-kai-onboarding.md`、growth/handoffログ |
| 試運転P1 3件・P2 2件、差分判定、条件付きリスク受容 | `risk-review-stage4-kai-trial.md`、`risk-review-stage4-kai-trial-rereview.md`、`stage4-kai-trial-retrospective.md` |
| Kai参加の条件、未強制期間の運用境界、再判断ゲート | ADR-0015、`current-task.md` 17〜19節、`stage4-kai-trial-decision-summary.md`、growth/handoffログ |
| 技術方式A・B・Cの比較と未採用状態 | `architecture-options.md`、ADR-0015、`current-task.md`、`stage4-kai-trial-decision-summary.md` |
| Toki停止条件 | `team.md` 未加入メンバー節、ADR-0015、`current-task.md`、`risk-review-stage4-kai-trial-rereview.md`、`stage4-kai-trial-decision-summary.md` |

削除候補にあるR/T/Vの詳細比較、27要件のGen監査表、対応依頼の生文面などは
中間証跡として失われる。ただし、これは整理案Aで明示され、人間が「通常の
コミット履歴へ残さない」と許容済みの情報損失であり、残存する正本・主要レビュー・
一次成果物からKai参加判断のWhy、条件、反対意見、残留リスクを再構成できる。

## 参照と状態の確認

- レビューallowlist内の残存対象を検索した範囲では、整理候補10件への生きた
  Markdownリンクはない。
- `risk-review-stage4-kai-onboarding.md` に残る削除対象名は、P1/P2の対象箇所と
  差分判定を追跡するためのインラインコード表記であり、リンクではない。末尾も
  当時の対象名として残す意図と最終参照先を明記しているため、変更しない方がよい。
- `stage4-kai-cleanup-plan.md` と本レビュー依頼にある10件名も、整理対象を特定する
  記録であり、リンク切れではない。
- `current-task.md`、ADR-0015、`architecture-options.md`、残すレビュー・判断サマリーは、
  技術方式未採用、Toki未承認、削除未実施の状態で一致している。

## 人間の最終承認ゲートへ戻す条件

1. 最終承認は、整理候補10件を明示し、削除実行だけを対象にする。技術方式採用、
   Toki定義・加入・起動、Stage 4完了を含めない。
2. 実行直前に、整理案5節どおりリポジトリ全体のMarkdownリンクと名指し参照を
   再検索する。本レビューで確認できたのは指定allowlist内だけであり、現役参照が
   1件でも見つかった場合は削除せず、参照先の付け替えを先に行う。
3. 削除後にも同じ検索を行い、残存リンク切れがないことを確認する。
4. 削除結果を`current-task.md`、growth-log、handoff-logへ記録し、CLEANUP-R01を
   緩和する。技術方式保留とToki未承認を同じ記録で維持する。
5. 人間の最終承認が得られるまでは、削除・移動・VCS操作を行わない。

以上を満たす前提で、**削除の実行判断を人間へ返却可能**と判定する。
