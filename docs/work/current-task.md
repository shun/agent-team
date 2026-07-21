# current-task: docs/work 全体整理

- 更新: 2026-07-22 / 更新者: Gen（玄）
- 状態: **docs/work全体整理完了 / Stage 5未着手**
- 直前の完了: 66件を削除し、`current-task.md`だけへ整理
- 一時保留: Stage 5 **未着手**
- 次の判断者: 人間（Stage 5の開始テーマ）

完了済みStageの判断根拠を正本へ吸収し、`docs/work/current-task.md`だけを残す全体整理を
完了した。このファイルでは整理後の現在地と次の開始判断だけを扱う。

## 0. 現在人間判断

人間は2026-07-21、蓄積した試運転・比較結果を踏まえ、RitsuとHayateの両方を採用し、
昇格・正本化するよう指示した。

採用内容は[ADR-0021](../decisions/ADR-0021-ritsu-hayate-implementation-routing.md)へ昇格した。
Ritsuを標準実装担当、Hayateを固定済み・小規模・低リスク・独立自動検証可能な作業の
短時間制約付き限定実装担当とする。
Hayateが1回で受入れを満たさない場合、同じ作業を繰り返さずRitsuへ切り替える。

## 1. 完了した反映

今回の人間判断は、次の正本と記録へ反映した。

- [チーム定義](../agent/team.md): 両名の加入済み表示と継続境界
- [ワークフロー](../agent/workflow.md): Ritsu既定、Hayate全条件routing、失敗時分岐
- [ロードマップ](../roadmap.md): Stage R/Hの役割採用完了
- [ADR-0021](../decisions/ADR-0021-ritsu-hayate-implementation-routing.md): 採用理由と非決定事項
- Codex adapter: Ritsu/Hayateのwrite停止条件とHayateの1回実行

## 2. 継続境界

加入後も、次の安全境界と未確認事項を維持する。

- 人間の今回の判断は加入と役割分担の承認であり、性能優位の確定ではない。
- per-run model・effort・fresh性、tool・network非逸脱は未確認のまま残す。
- production、VCS、外部送信、正本変更は個別の承認と`safety.md`に従う。
- 技術的write隔離を実証できない環境では、既存repository fileを両名へ直接委譲しない。

## 3. Work整理の結果

Rinの全体整理レビューはP0 0 / P1 4 / P2 2で、ADR自己完結、全対象分類、完全な目録と
展開検証、全repositoryリンク検査を削除条件とした。ADR-0014〜0017とADR-0021への転記、
66件・550,619 bytesの目録、アーカイブ展開後の全digest照合、削除対象への生きたMarkdown
リンク0件を確認し、66件と空ディレクトリを削除した。`docs/work/`の全entryは本ファイルだけである。

完全な目録は`.ai/board/work-cleanup-manifest-2026-07-21.tsv`、削除前アーカイブは
`/private/tmp/agent-team-docs-work-full-cleanup-20260721.tar.gz`にある。一時アーカイブは永続保管を
保証しない。分類、保留理由、再開条件、digestは`.ai/board/handoff-log.md`の先頭へ記録した。

## 4. 次の開始ゲート

削除対象66件は、昇格済み、保留、単なる作業証跡へ分類済みで、成果物全体としての却下は
0件である。保留した技術方式、platform能力、`CD-01`、Stage 5テーマの再開条件も正本または
handoff-logへ移した。

人間の2026-07-22の継続指示を削除実行の承認として反映した。VCS操作は行っていない。

次はMission RoomをStage 5候補として具体化する。目的、利用者、最小機能、保存する状態、
人間の判断点を`current-task.md`へ定義してから、Shinoの要件整理へ進む。
