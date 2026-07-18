# current-task: Stage 3 — Shino(篠・要件整理)を迎える

- 作成: 2026-07-18 / 作成者: Gen(玄)
- 状態: **進行中（Stage 3クローズの人間判断待ち）**
- 前タスク: Codex 基準委譲ループは完了条件を充足。詳細は旧 current-task の履歴と [handoff-log](../../.ai/board/handoff-log.md) 2026-07-18 を参照
- 正本: [roadmap.md](../roadmap.md) Stage 3 / [workflow.md](../agent/workflow.md) / [team.md](../agent/team.md) / [safety.md](../agent/safety.md)

---

## 1. 目的

Stage 2 で確立した標準手順に従い、三人目のメンバー **Shino(篠・要件整理)** を一人ずつ迎える。

Shino が、人間の発言・制約・困りごとから、明示要件・仮説としての暗黙要件・未確認事項を分離し、人間が次の判断をできる Markdown 成果物へ変換できることを試運転で確認する。

## 2. 開始前提と持ち越し

| 項目 | 状態 | 根拠・扱い |
|---|---|---|
| 主実行環境で名前付き委譲経路が実動確認済み | **充足** | Codex Rin の版固定 fresh-session スモーク2回目が成功。`rin-smoke-stage3-second-retry-evidence.md` 参照 |
| 新規ロール自身の名前付き起動確認 | **条件付き充足** | 名前付き`shino` / `fork_turns=none`でtask作成・成果物返却をGenが観測。署名付きdispatch/read監査ではない限界を人間が条件付き許容 |
| instruction-based 安全境界の残留リスク | **条件付き許容・次ゲート固定** | 技術的権限制御・read非逸脱・repo全体write非逸脱は未検証。コード・外部連携・高権限操作へ進む前に再判断する |
| Stage 2 の保留 P2 | **今回必要なものだけ再確認** | Shino の責務境界・試運転に直接関係する項目があれば Rin レビューで判断材料へ戻す。全件整理は非対象 |

## 3. 仮説

試運転の上位テーマ「レビュー指摘の対応・独立検証・人間判断ループの標準化」は、次の理由で Shino の要件整理能力を試す実テーマとして適している。

1. 「対応済み」「独立検証」「人間判断が必要」の意味が未定義で、明示要件・暗黙要件・未確認事項を分ける余地がある
2. 人間・Gen・Rin・将来の Toki の責務境界を、設計として確定せず要件として整理する必要がある
3. 既存 workflow の実例があり、抽象的な架空テーマではなく、成果物の有用性を人間が判断できる

ただし、上位テーマ全体を初回に扱うと Shino の能力以外の評価ノイズが大きい。**初回は Codex 基準委譲ループの実在する指摘 P1-2「指示遵守を権限制御の成功と誤認する」1件だけ**をケースにする。Shino には指摘本文・対象記述・当時の依頼目的だけを渡し、解答に当たる Gen 対応・修正後成果物・人間判断記録は評価時まで読み取り対象外とする。Shino は標準手順そのものを決定せず、`requirements.md` / `open-questions.md` の作成までとする。標準化の可否と正本 workflow の変更は、試運転後に別の変更ドラフトとして Gen が提示し、人間が判断する。

## 4. 標準手順と現在地

| 手順 | 状態 | 成果物・ゲート |
|---|---|---|
| 1. Gen が Shino の役割定義をドラフト | **完了** | [shino-definition-draft.md](shino-definition-draft.md) |
| 2. Rin が正本変更ドラフトをレビュー | **完了** | request / [risk-review-stage3-shino-definition.md](risk-review-stage3-shino-definition.md)（P0:0 / P1:4 / P2:3） |
| 3. Gen が対応し、Rin が差分再レビュー | **完了** | [shino-definition-review-response.md](shino-definition-review-response.md) / risk-review 末尾。最終残件P1×2は対応案を作成し、原則1周のため再々レビューせず人間へ |
| 4. 人間が定義・試運転計画を判断 | **完了** | 1A〜5Aを採用（1Aは重要度に応じた選択的確認を条件化） |
| 5. 承認分を正本へ反映し adapter を作成 | **完了** | `team.md` / `roadmap.md` / `.codex/agents/shino.toml` / growth-log |
| 6. fresh context で名前付き Shino を起動 | **条件付き完了** | APIが名前付き`shino`を認識し、`fork_turns=none`でtask作成・完了。証跡限界を人間が条件付き許容 |
| 7. 実在するレビュー指摘1件で試運転 | **完了** | `requirements.md` / `open-questions.md`を新規作成。固定対象postflight一致、行数上限内 |
| 8. Gen 統合・Rin レビュー・人間判断 | **完了（条件付き採用）** | 初回P0:0 / P1:3 / P2:3。差分再レビューでP1-1・P2全件解消。P1-2条件付き許容、P1-3事後同期を人間が採用 |
| 9. 振り返り → 定義変更ドラフト → Rin差分レビュー → 人間判断 | **差分再レビュー完了・人間判断待ち** | 初回P0:0 / P1:5 / P2:1。差分再レビューで全件解消、見解相違・個別許容待ち・新規P0/P1なし。修正版案AをGen推奨 |

## 5. 対象範囲

1. Shino の役割・責任・判断基準・禁止事項・動作形態のドラフト
2. Rin による定義ドラフトのリスクレビューと、Gen による仕分け
3. 人間による最初の判断後、Codex 用の薄い adapter 作成
4. fresh context での名前付き起動確認
5. 第一候補テーマのうち、実在するレビュー指摘1件に限定した `requirements.md` / `open-questions.md` 作成
6. 試運転の振り返りと、必要最小限の成果物テンプレート提案

## 6. 非対象範囲

- 最初の人間判断前の正本 docs・adapter 変更
- 試運転中に workflow の標準手順を確定すること
- レビュー対応の自動化、外部サービス連携、実装、deploy
- Toki を先行加入させること、または Shino に QA / リスク番人の責務を持たせること
- Claude Code / Antigravity 用 Shino adapter の作成
- Stage 2 保留 P2 の一括整理

## 7. 制約

- [safety.md](../agent/safety.md) を全メンバーへ適用する
- エージェント間の依頼と結果は Markdown 成果物で受け渡す
- 正本変更ドラフトと final-proposal は人間判断前に Rin レビューを経る
- Rin の P0 / P1 は、人間の明示判断が記録されるまで確定・Stage 完了へ進めない
- サブエージェントの読み書き対象、出力量、停止条件、再試行上限を起動依頼で固定する
- VCS 操作は行わない（許可された素の `jj st` / `jj diff` / `jj log` による確認を除く）

## 8. 完了条件

- [x] Stage 3 開始前の Rin fresh-session スモークゲートが充足している
- [x] Shino の定義ドラフトが作成されている
- [x] 定義ドラフトが Rin レビューを経ている
- [x] Gen の対応差分が Rin の差分再レビューを経ている
- [x] 人間が Shino 定義と試運転計画を採用 / 修正して採用 / 却下 / 保留で判断している
- [x] 採用分だけが正本 team.md と Codex adapter に反映されている
- [x] fresh context で名前付き Shino の実起動が成功している（platform応答のGen観測を条件付き機能証跡として人間採用）
- [x] Shino が指定された `requirements.md` / `open-questions.md` を作成している（2件の作成を確認。repo全体の書き込み非逸脱は未監査として明示）
- [x] 要件成果物で情報区分 / 人間判断 / 事実確認の3軸が区別されている（Gen・Rin支持、人間採用）
- [x] 第一候補テーマについて、人間が次に判断すべき事項が明確になっている（blind出力をGen補正付きで人間採用）
- [ ] 試運転を振り返り、Shino 定義の維持 / 修正 / 再検討を人間が判断している
- [x] 採用分が正本と growth-log に反映され、handoff-log が更新されている

## 9. 最初の人間判断

Rin 初回レビューは P0:0 / P1:4 / P2:3。差分再レビューで6件解消、P1-1一部未解消、新規P1-5となった。Gen は最終2件も修正案へ反映したが、原則1周のため再々レビューせず、次を人間へ戻す。

| 判断 | Gen 推奨 | Rin 指摘との関係 |
|---|---|---|
| 1. [shino-definition-draft.md](shino-definition-draft.md) を修正後の内容で採用するか | **採用** | P1-1対応として情報区分 / 人間判断 / 事実確認を分離。P1-2〜P1-4、P2×3は解消確認済み |
| 2. 第一候補テーマを、過去の実在 P1-2 1件・解答非開示の試運転として採用するか | **採用** | 新規P1-5の模範解答混入を除去。広い標準化は試運転後の別判断 |
| 3. 「成功結果候補はShino、テスト条件・証跡・合否判定方法はToki」の境界を採用するか | **採用** | P1-2解消確認済み |
| 4. roadmap Stage 3 の状態行を「進行中（2026-07-18、人間が開始を指示）」へ変更するか | **採用** | 正本の進捗状態を current-task と一致させる |
| 5. 1〜4採用時、team.md 反映と Codex adapter 作成へ進めるか | **進める** | 標準手順の次工程。fresh context 実起動までは完了扱いにしない |

判断1は最終レビュー残件 **P1-1**、判断2は **P1-5** への明示判断記録を兼ねる。採用 / 却下 / 保留のいずれでもよいが、P1のため黙示的には確定しない。

### 人間の判断記録（2026-07-18）

- **1A**: 採用。3軸モデルを使うが、未確認事項をすべて即時確認せず、重要度に応じて即時 / まとめて / 保留可能へ分ける
- **2A**: 採用。Shino は成功結果候補までを整理し、Toki など他メンバーと成果物を介して協力する
- **3A**: 採用。過去の実在 P1-2 を解答非開示で試す
- **4A**: 採用。roadmap Stage 3 を進行中へ更新する
- **5A**: 採用。team.md 反映と薄い Codex adapter 作成へ進む

P1-1 / P1-5 は、Gen の最終修正案を**採用**として明示判断済み。次は fresh context の名前付き Shino 起動確認であり、成功するまで Stage 3 完了とは扱わない。

## 10. 名前付きShino 第1dispatch（2026-07-18）

- planned実行ID: `shino:/root/shino_stage3_trial_20260718t2011350900`
- preflight SHA-256: `a41264bfbc258092e98c5eb81d2fc4c4a8f5fc85ee1e0ed9fb740be9419bbd1c`
- fixed snapshot ID: `8617a1ad805c67a22d7d81e54e71dd42633259d3253ac2e523b55eaf0da24af2`
- 結果: 起動APIが `unknown agent_type 'shino'` を返し、agent実行前に停止
- 変更確認: protected / read / write-before manifestとpreflight SHA-256は全て実行前と一致。`requirements.md` / `open-questions.md`は未作成
- 判断: 名前付き起動ゲート未充足。default agentやインライン展開では代行しない
- 次: fresh Codex sessionで`.codex/agents/shino.toml`を読込後、同じ固定入力と証跡仕様で再試行する。再失敗ならworkflowどおり人間判断へ戻す
- 詳細: [shino-stage3-trial-attempt-evidence.md](shino-stage3-trial-attempt-evidence.md)

## 11. 名前付きShino fresh-session再試行と試運転レビュー（2026-07-18）

- task: `/root/shino_stage3_trial_20260718t2011350900` / `agent_type: shino` / `fork_turns: none`
- 結果: 起動APIが名前付きShinoを認識し、`requirements.md` 56行 / `open-questions.md` 38行を新規作成
- postflight: protected regular file・symlink / 4固定入力 / preflightは前後完全一致。書き込みallowlist manifestは指定2件の不在→regular file化
- 証跡限界: リポジトリ全体のbefore/after manifestとread監査はなく、allowlist外の書き込み非逸脱・解答非開示はShino自己申告。platform起動応答はGen観測記録で、署名付き監査ではない
- 内容評価: 3軸を分離し、指示遵守と権限制御、対応と解消、独立確認、人間判断用情報を抽出。非開示だった実対応の主要論点と整合
- Rin初回レビュー: P0:0 / P1:3 / P2:3。P1-1/P1-3は主張限定・current-task同期で対応、P1-2は一部修正してinstruction-based残留リスクの人間判断待ち。P2はblind成果物を改変せずGen統合で補正
- 差分再レビュー: 新規P0/P1なし。P1-1・P2全件解消、P1-2は人間の許容判断待ち。P1-3は§2の古い状態行1件だけが残り、本節と整合する状態へ機械修正した。原則1周のため再々レビューは行わない
- 次: 条件付き証跡の採用 / Shino能力確認 / 未検証範囲の維持を人間へ判断依頼
- 詳細: [retry evidence](shino-stage3-trial-retry-evidence.md) / [trial risk review](risk-review-stage3-shino-trial.md) / [Gen response](shino-stage3-trial-review-response.md)

## 12. 試運転への人間判断（2026-07-18）

- 判断: Gen推奨3点を**条件付き採用**（人間回答「ok。とりあえずこれで行ってみよう」）
- 採用: 名前付きfresh-context機能証跡 / blind成果物の能力評価 / Gen補正付きの3軸・主要論点・確認優先度整理
- 維持する限界: 技術的権限制御・read非逸脱・repo全体write非逸脱は未検証
- 次の安全ゲート: コード作業・外部連携・高権限操作の前に技術的強制の要否を再判断
- 次工程: Stage 3振り返りを作成し、Shino定義の維持 / 修正 / 再検討とStage 3クローズをRinレビュー後に人間へ戻す
