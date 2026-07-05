# ADR-0001: ADR ドラフトの置き場と昇格方式

> 状態: 採用(2026-07-05 人間承認。workflow.md 初版と一体で承認)
> 起案: Gen(玄)/ 昇格: 2026-07-05(元ドラフト: docs/work/adr-drafts/2026-07-05-adr-draft-location.md)

- **背景**: safety.md により docs/decisions/ は正本であり、エージェントは人間の承認なしに書き込めない。一方「設計判断は ADR 候補を残してから進める」ルールにより、承認を待たずに置ける場所が必要
- **決定**: ADR ドラフトは `docs/work/adr-drafts/YYYY-MM-DD-<スラッグ>.md` に置く(Q1 により Gen が承認なしで作成可)。人間が採用したら Gen が `docs/decisions/ADR-NNNN-<スラッグ>.md` を新規作成して昇格する(番号は昇格時に採番)。元ドラフトの削除は人間に提案する
- **理由**: docs/work/ は Gen の裁量範囲として確定済み(Q1)で、追加の権限緩和が不要。移動・リネームは safety.md で禁止のため、昇格は「新規作成」方式にする
- **捨てた選択肢**: (a) docs/decisions/ に直接ドラフトを置く — 正本ディレクトリへの承認なし書き込みになり safety.md と矛盾。(b) チャット上のみで提示 — セッションを跨ぐと消失する
- **影響**: workflow.md 6節に手順として明文化済み。roadmap Stage 5 の「ADR-0001-agent-team-policy」という番号例は本 ADR の採番により変わる(Stage 5 到達時に人間承認のうえ修正)
