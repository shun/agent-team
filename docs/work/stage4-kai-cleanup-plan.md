# Stage 4 Kai成果物の整理案

- 作成: 2026-07-19 / 作成者: Gen（玄）
- 状態: **案A完了（2026-07-19・人間承認により10件削除済み）**
- 対象: コミット`5070177c`後に残る未コミットのKai関連成果物19件
- 対象外: Tokiの定義・加入・起動、技術方式A・B・Cの採用、PoC・実装

この案は、Kai参加判断の正本昇格後に残った19件を、判断の再構成に必要な
成果物と、正本・恒久記録へ集約済みの中間成果物へ分ける。すべてをADRへ
昇格せず、削除・移動は人間の明示承認後に別作業として実施する。

## 1. 結論

Genは、**9件を状態同期して`docs/work/`へ残し、10件を整理候補にする案A**を
推奨する。追加のADR昇格は行わない。

- 9件は、技術方式が保留中であること、Kai試運転の入力・出力・反対意見、
  およびToki試運転候補の入力を再構成するために必要である。
- 10件は、最終内容または判断が`team.md`、adapter、`current-task.md`、
  ADR-0015、判断サマリー、リスク再レビュー、growth-log、handoff-logへ
  集約済みである。
- 設計案A・B・Cは未採用であり、`architecture-options.md`は選択肢のまま残す。
  採用判断がないためADRへ昇格しない。
- Tokiは未承認のため、本整理の完了だけで定義・加入・起動へ進めない。

## 2. 整理基準

各成果物は、次の基準で分類する。

1. 人間が採用した継続的な設計判断だけを正本またはADRへ昇格する。
2. 保留中テーマの入力・出力、試運転契約、主要な反対意見、残留リスクは
   `docs/work/`へ残す。
3. 最終内容が別の正本・恒久記録へ集約され、単独では判断を変えないドラフト、
   依頼、対応表、判断前サマリーは整理候補とする。
4. 生き残るMarkdownリンク、進捗の正、主要レビューの対象関係を修正してから
   整理する。
5. 削除対象は通常のコミット履歴に一度も入っていないため、削除前に人間が
   詳細な中間証跡を失うことを許容する。

## 3. 残す9件

次の9件は`docs/work/`へ残し、状態表示と参照を同期したうえで人間がコミットする
案とする。

| 成果物 | 残す理由 | 実行時の同期案 |
|---|---|---|
| [stage4-technical-enforcement-input.md](stage4-technical-enforcement-input.md) | 技術的強制テーマの人間判断・境界の入力 | 「Shino・Kai試運転で使用済み／方式保留」へ更新 |
| [shino-stage4-request.md](shino-stage4-request.md) | Shinoへ渡した入出力allowlistと実行契約 | 「実行済み」へ更新 |
| [requirements.md](requirements.md) | 技術方式とToki試運転候補へ再利用できる要件 | 「Kai試運転入力として使用済み／意味照合未実施」を追加 |
| [open-questions.md](open-questions.md) | 方式採用前に残る未確認事項 | 期限経過項目を「仮定で進行／次ゲートへ繰越」と明示 |
| [kai-stage4-trial-request.md](kai-stage4-trial-request.md) | Kaiの実際の入力・出力・停止条件を示す試運転契約 | 「fresh sessionで実行済み」へ更新 |
| [architecture-options.md](architecture-options.md) | Kaiの主要成果物。案A・B・Cは未採用で保留中 | 「技術方式未採用／Toki試運転候補入力」を追加 |
| [risk-review-stage4-kai-onboarding.md](risk-review-stage4-kai-onboarding.md) | 定義・adapter・起動境界への初回反対意見と差分再レビューを1ファイルで保持 | 人間判断と正本反映先への参照を追記 |
| [risk-review-stage4-kai-trial.md](risk-review-stage4-kai-trial.md) | Kai試運転への初回P1・P2を保持 | 差分再レビューと人間判断記録への参照を追記 |
| [stage4-kai-trial-retrospective.md](stage4-kai-trial-retrospective.md) | 試運転証跡と限界の一次資料。既存の判断サマリーと再レビューが参照 | 現在の「人間判断済み」を維持 |

これらは正本ではない。技術方式を採用した時点で、採用判断だけを新しいADR候補へ
切り出す。Toki試運転で使う場合も、入力allowlistは別の明示承認で確定する。

## 4. 整理候補10件

次の10件は、受け皿と参照修正を確認した後、人間の明示承認をもって削除する案と
する。移動やarchiveは行わない。

| 成果物 | 集約先・整理理由 |
|---|---|
| `docs/work/kai-definition-draft.md` | 最終定義は[team.md](../agent/team.md)のKai節へ反映済み |
| `docs/work/kai-adapter-draft.md` | 最終adapterは[.codex/agents/kai.toml](../../.codex/agents/kai.toml)へ反映済み |
| `docs/work/kai-onboarding-review-response.md` | 対応内容は残すオンボーディングレビューの差分再レビュー節と`current-task.md`へ集約済み |
| `docs/work/rin-stage4-kai-onboarding-review-request.md` | レビュー条件と結果は残すオンボーディングレビューへ集約済み |
| `docs/work/rin-stage4-kai-onboarding-rereview-request.md` | 差分対象と結果は残すオンボーディングレビューへ集約済み |
| `docs/work/rin-stage4-kai-trial-review-request.md` | レビュー条件と結果は初回・差分リスクレビューへ集約済み |
| `docs/work/rin-stage4-kai-trial-rereview-request.md` | 差分対象と結果は差分リスク再レビューへ集約済み |
| `docs/work/stage4-kai-decision-brief.md` | 方針判断は`current-task.md`1〜18節と恒久記録へ反映済み |
| `docs/work/stage4-kai-decision-summary.md` | 方針判断は`current-task.md`1〜18節と恒久記録へ反映済み |
| `docs/work/stage4-kai-launch-decision-summary.md` | 4操作の承認結果は`current-task.md`1〜12節の完了要約とhandoff-logへ反映済み |

整理後も、Kai参加のWhy、条件、保留範囲は次に残る。

- [ADR-0015](../decisions/ADR-0015-kai-conditional-participation.md)
- [current-task.md](current-task.md) 1〜19節
- [Kai試運転の判断サマリー](stage4-kai-trial-decision-summary.md)
- [Kai試運転の差分リスク再レビュー](risk-review-stage4-kai-trial-rereview.md)
- `.ai/board/growth-log.md`と`.ai/board/handoff-log.md`

## 5. 整理前の参照修正

削除後に現役資料が古い状態や存在しない判断資料へ依存しないよう、次を先に修正
する。

1. `current-task.md`の1〜12節を履歴として圧縮し、削除対象10件への参照を、
   `team.md`、adapter、残すレビュー、ADR-0015、18節の完了記録へ付け替える。
2. 残すオンボーディングレビューに、対象ドラフトは正本反映後に整理したことと、
   最終参照先を追記する。
3. 残す初回試運転レビューに、差分再レビューと人間判断の参照を追記する。
4. growth-logとhandoff-logの過去エントリにあるファイル名は、当時の記録として
   変更しない。新しい整理完了エントリで10件の整理を記録する。
5. 10件を削除する直前に、リポジトリ内のMarkdownリンクと名指し参照を検索し、
   生き残るファイルに意図しない参照がないことを確認する。

## 6. 選択肢

人間には、詳細な中間証跡を通常履歴へ残すかを含めて選んでもらう。

### 案A: 9件を残し、10件を整理する（Gen推奨）

現在の`current-task.md`にある「一時成果物は正本へ集約後に整理する」という方針を
維持する。最終ツリーを小さくできる一方、10件の詳細は通常のコミット履歴に
残らない。残す主要レビュー内の対象引用とGen対応、正本・ログの要約で判断を
再構成できると評価する。

### 案B: 19件を証跡コミットしてから案Aを実施する

削除前の全成果物を人間が一度コミットし、その後に9件の状態同期と10件の削除を
別コミットにする。生の依頼・ドラフトを通常履歴へ残せる一方、現行方針に対する
例外承認と、整理のための追加コミットが必要になる。

### 案C: 19件すべてを残す

情報損失はないが、「人間判断待ち」「未反映」「未起動」などの古い状態表示を
大量に維持する。進捗の正が曖昧になるため推奨しない。

## 7. 実行順序

人間が案と削除対象を承認した後、次の順序で実行する。

1. 9件の状態表示を同期する。
2. `current-task.md`と残すレビューの参照を修正する。
3. Rinが整理案と参照修正差分を実行前レビューする。
4. P0・P1への人間判断を記録する。
5. 人間が削除10件を最終承認する。
6. 10件を削除し、リンクと名指し参照を再検証する。
7. growth-log、handoff-log、`current-task.md`へ整理完了を記録する。
8. 素の`jj st`と`jj diff`を確認し、人間が整理コミットを作成する。
9. 作業コピーが整理された後、Toki加入を別の明示判断へ戻す。

## 8. 人間に判断してほしいこと

今回必要な判断は、整理方式だけである。

1. **案Aを採用するか。** Gen推奨は案A。
2. **残す9件・整理候補10件の分類を承認するか。**
3. **10件の詳細が通常のコミット履歴に残らないことを許容するか。**

この承認には、削除の実行、正本変更、技術方式の採用、Tokiの定義・加入・起動を
含めない。削除は参照修正とRinレビュー後に、改めて最終承認を受ける。

### 2026-07-19 人間判断

人間は案A、残す9件・整理候補10件の分類、10件を通常のコミット履歴へ残さない
方針を承認した。この判断で削除前の状態同期とRinレビューまで進める。10件の
削除実行は、参照修正後のレビュー結果を確認したうえで別途最終承認を受ける。

### Rin削除前レビュー結果

[Rinレビュー](risk-review-stage4-kai-cleanup.md)はP0 0件 / P1 0件 / P2 1件。
整理候補10件にしかない未処理の重大判断はなく、削除可否を人間の最終承認ゲートへ
戻してよいと判定した。P2は、削除実行後に最新handoffを先頭へ追記し、状態の
二義性を残さないこと。実行直前・直後のリポジトリ全体参照確認も削除条件とする。

## 9. 実行結果

人間は2026-07-19に整理候補10件の削除を最終承認した。Genは対象10件がすべて
未コミットの追加ファイルであることと、生きたMarkdownリンクが0件であることを
直前に確認して削除した。

- 残す9件と整理計画・Rinレビューは維持
- 技術方式A・B・Cは未採用のまま維持
- Tokiの定義・加入・起動は未承認のまま維持
- 削除後の参照、状態、`jj st`、`jj diff`を再確認
- 整理完了を`current-task.md`、growth-log、handoff-logへ同期

削除した10件は通常のコミット履歴へ入っていないため、VCS履歴からは復元できない。
判断のWhy、条件、反対意見、残留リスクは正本、残すレビュー、ログへ集約済みである。
