# growth-log

定義変更(成長ループ)の記録。新しいものを上に追記する。
形式: 日時 / 提案 / 試した結果 / 人間の判断 / 反映先
(セッションごとの作業記録はここではなく handoff-log.md に書く)

---

## 2026-08-22 — 導入先の正本 docs を .agent-team/docs へ隔離【人間依頼・反映】

- **提案**: 導入先の既存 `docs/` と混ぜない。agent-team のドキュメントは
  ルートの `.agent-team/docs` へ置く
- **試した結果**: 正本リポジトリの `docs/` は維持。インストーラが
  `docs/` → `.agent-team/docs/` へ写し、配布ファイル内の参照を書き換える。
  ツール別アダプタの起動位置は変えない。テスト 12 passed
- **人間の判断**: インストール先ドキュメントを既存 docs と分離する
- **反映先**: `scripts/install-manifest.json`、
  `scripts/install-agent-team.ts`、`scripts/install-manifest.ts`、
  `README.md`、`docs/agent/guide.md`、ADR-0023、ADR-0027

## 2026-08-22 — docs/work 未正本化決定を ADR-0022〜0027 へ昇格【人間承認・正本反映】

- **提案**: 人間判断済みで ADR 未採番だった決定を昇格する。作業ドラフトの削除は
  文面承認と分離する
- **試した結果**: Rin 初回 P0-1 / P0-2。選定 → 文面 → 削除の3段に分けた。
  文面差分で 8節繰り下げ、PLAN 開始の兼ね読み、写しの第二台帳化を修正した
- **人間の判断**: 6候補の選定を承認。文面を正本へ書いてよい。削除はまだしない
- **反映先**: `docs/decisions/ADR-0022`〜`0027`、`docs/agent/workflow.md` 10節、
  ADR-0002 successor 注記、ADR-0014 例外記録
- **反映先**: `docs/decisions/ADR-0022`〜`0027`、`docs/agent/workflow.md` 10節、
  ADR-0002 successor 注記、ADR-0014 例外記録、
  `.agents/skills/team-plan/SKILL.md`（正本参照への付け替え。運用政策の複製ではない）
- **削除**: 作業ドラフト 41 件。残したのは `current-task.md`、
  `final-proposal.md`、`plans/PLAN.md`、却下の Momo ドラフト
- **残**: コミットは人間。Mission Room P2 と Medium 実装は未決のまま current-task に残す

## 2026-08-16 — 共通入口を docs/agent/guide.md へ分離【人間依頼・反映】

- **提案**: AGENTS.md の内容を docs 配下のガイドラインにし、ルートは
  ツール固有の薄い入口にする。導入先は各自のコンテキストから読む
- **試した結果**: `docs/agent/guide.md` を作成し、`AGENTS.md` を整理した
- **人間の判断**: ルートコンテキストは配らない。docs に共通ガイドラインを
  置き、各リポから追記して読む。このリポの AGENTS.md も整理する
- **反映先**: `docs/agent/guide.md`、`AGENTS.md`、
  `docs/work/adr-drafts/2026-08-16-agent-team-guide.md`

## 2026-08-16 — tmp/ をエージェントの一時置き場として使用可【人間判断・正本反映】

- **提案**: 実行計画を `tmp/PLAN.md` に置き、エージェントが一時ファイルを作成・更新・
  読み取りできるようにする
- **試した結果**: 人間が「tmp 以下はエージェントたちの一時置き場だからさわってもいい」
  と明示し、PLAN 完了後に OI-01（safety 文面の更新）を先に行うと判断した
- **人間の判断**: `tmp/` は一時置き場としてさわってよい。正本にはしない
- **反映先**: `docs/agent/safety.md` 2節・4節、`docs/agent/workflow.md` 2節、
  `docs/work/adr-drafts/2026-08-16-tmp-scratch-workspace.md`、
  `docs/work/team-plan-foundation/decision-brief.md`（D-03）、`tmp/PLAN.md`
- **残す禁止**: 正本としての引用、秘密情報・生ログ、未完了計画の上書き、
  `tmp/` 全体削除、用途不明ファイルの削除

## 2026-08-16 — メインエージェント名を Aira（アイラ）へ確定【人間判断・反映済み】

- **経緯**: 2026-08-15の人格・責務変更では Momo(桃)を仮称として反映した。その後、
  人間がメインエージェント名として Aira（アイラ）を明示選定した
- **人間の判断**: メインエージェントを Aira とする。Genの進行・統合責務、超ポジティブで
  直球なギャルとしての会話方針、深いシステム理解、安全境界、専門責務の分離は維持する
- **反映**: 正本、Codex / Antigravity adapter、Mission Roomの現行表示・fixture・テストの
  現行参照を Airaへ統一した。内部識別子は`aira`とする
- **履歴**: 2026-08-15のMomo候補は仮称として残し、`2026-08-16-main-agent-aira.md`で
  置換済みを明示した。Genの過去記録は変更しない
- **反映先**: `AGENTS.md` / `docs/agent/team.md` / `docs/agent/workflow.md` /
  `docs/roadmap.md` / `.agents/` / `.codex/agents/` / `mission-room/` /
  `docs/work/adr-drafts/2026-08-16-main-agent-aira.md`

## 2026-08-15 — メインエージェントを Momo(桃)へ交代【人間依頼・反映済み】

- **提案**: Gen(玄)に代えて、超ポジティブで直球、少量の絵文字で判断点を伝えるギャルの
  Momo(桃)をメインエージェントとする。Genの進行・統合責務、深いシステム理解、
  人間の最終判断、安全境界、専門責務の分離は維持する
- **試した結果**: 正本、Codex / Antigravity adapter、Mission Roomの現行fixtureと期待値を
  Momoへ統一した。現行設定に残るGen表記は起案者・当時の履歴だけである。`npm run build`、
  `node --test tests/*.test.mjs`（48 pass / 0 fail / 6 skip）、`npm run lint`はいずれも成功した。
  production previewの`/`と`/3d`でMomo表示を確認し、overviewの表示崩れはなかった
- **人間の判断**: 2026-08-15の依頼で、Momoへの交代と、結論先出し・絵文字による視認性・
  深いシステム知識・簡潔な高速ファシリテーションを指定
- **反映先**: `AGENTS.md` / `docs/agent/team.md` / `docs/agent/safety.md` /
  `docs/agent/workflow.md` / `docs/roadmap.md` / `.agents/` / `.codex/agents/` /
  `mission-room/` / `docs/work/adr-drafts/2026-08-15-main-agent-momo.md`
- **未昇格**: この判断の記録はADR候補として残した。正式ADRへの昇格は別途の人間判断に従う

## 2026-07-22 — Gemini 3.6 Flash Antigravity subagent adapter追加【人間依頼・実機pilot待ち】

- **提案**: Codex主体の7人構成を維持したまま、AntigravityでもGenをmain、Shino、Kai、
  Toki、Rin、Ritsu、Hayateをcustom subagentとして起動できる薄いadapterを追加する
- **人間の判断**: 「Gemini 3.6 Flashがリリースされた。7人の役割などは変更せず、
  Antigravityのsubagentたちでも動くようにする」と実装を依頼
- **実機確認**: ローカル`agy 1.1.5 models`で`gemini-3.6-flash-high` / `medium` / `low`を
  確認。これは利用候補の列挙であり、親の現在選択、subagent継承、fresh性、tool権限の
  per-run証跡ではない。CLI再起動後、モデルへ送信せずslash補完上の`/agent-team`表示を確認
- **adapter**: `.agents/agents.md`へGen mainと6固定名custom subagentを定義し、
  `.agents/workflows/agent-team.md`へdispatch手順を追加。CLI 1.1.5はworkspace workflowを
  slash command化しないため、`.agents/skills/agent-team/SKILL.md`を`/agent-team`入口として追加
- **安全境界**: 親はLocal Mode、各subagentは親の同一workspace継承を起動前に確認する。
  New Worktree Modeまたは確認不能時は全role停止。write toolsはdefault falseとし、Boolean
  flagをper-file強制の証明にしない。Ritsu/Hayateの既存file更新は従来のwrite隔離条件を維持
- **Rinレビュー**: 初回P0 1 / P1 2 / P2 0。自動worktree停止ゲート、write toolの残限界、
  fresh/tool/model継承の未実証表示を修正。1回の差分再レビューでP0/P1/P2 0、追加指摘なし
- **未実施**: Antigravityへのmodel request、custom subagent定義・起動、成果物write、
  model/fresh/tool/workspace継承の実測。外部model利用または課金の可能性がある実機pilotは
  別の人間判断後に行う
- **反映先**: `.agents/agents.md` / `.agents/workflows/agent-team.md` /
  `.agents/skills/agent-team/SKILL.md` / `AGENTS.md` /
  `docs/agent/team.md` / `docs/agent/safety.md` / `docs/agent/workflow.md` /
  `docs/work/adr-drafts/2026-07-22-antigravity-subagent-adapter.md`

## 2026-07-21 — Ritsu・Hayate加入、条件付きrouting正本化【人間承認・完了】

- **提案**: 蓄積したRitsu/Hayate試運転結果を正本へ昇格し、Ritsuを標準実装担当、
  Hayateを短時間制約付き限定実装担当として使い分ける
- **試した結果**: Ritsuは固定合成課題3言語で機能・hidden testを通過。Work mode文書試行は
  3回で95、90、87点。Hayateは3言語×3回で機能合格率がTypeScript 1/3、Go 2/3、
  Rust 3/3、厳格pass候補が0/3、1/3、1/3。約110〜136秒の短時間シグナルを観測
- **人間の判断**: RitsuとHayateの両方を採用し、加入済みへ昇格・正本化する
- **Rinレビュー**: 初回P0 1 / P1 6 / P2 2。全件を採用し、技術的write隔離、加入表示、
  Hayate全条件routing、原因別切替、二軸受入れ、既存workflowゲート、履歴保持を修正。
  差分再レビューで全P0/P1解消、新規P0/P1なし
- **正本判断**: 加入は組織上の役割採用と条件付きrouting eligibilityだけを意味し、性能、
  platform構成、安全強制、個別作業承認、包括権限の証明としない
- **routing**: Ritsuを既定とする。Hayateは単一責務、固定API、低リスク、独立oracle、
  時間上限その他の全条件を満たす場合だけ1回実行し、機能不合格は新IDでRitsuへ切り替える
- **継続境界**: 技術的write隔離を実証できない環境では既存repository fileを両名へ委譲しない。
  性能優位、per-run telemetry、sandbox強制、長期再現性は未実証
- **反映先**: `docs/agent/team.md` / `docs/agent/workflow.md` / `docs/roadmap.md` /
  `docs/decisions/ADR-0021-ritsu-hayate-implementation-routing.md` /
  `.codex/agents/ritsu.toml` / `.codex/agents/hayate.toml` / `docs/work/current-task.md`

## 2026-07-21 — Hayate短時間制約付き実装候補の比較準備【人間承認・fresh session待ち】

- **提案**: RitsuのLuna/high実装pilotに対し、同じLunaのreasoning effort `medium`を使う
  named HayateへTypeScript（Deno）、Go、Rustの同一課題を実施させる
- **人間の判断**: 比較前にHayateの正本定義とnamed adapterを作成する。Hayateは
  Luna/medium、Ritsuは既存どおりLuna/highとする
- **Rinレビュー**: 初回P0 0 / P1 8 / P2 2。全件を採用。1回限りの差分再レビューで
  新規P0/P1なし、残ったP1 3件も成果物間の表現、結果schema、Stage境界を修正して閉じた
- **正本反映**: Hayateを`加入準備中・高速性未実証`の短時間制約付き実装候補として追加。
  未指定semantics、trust境界、直接・間接write、GREEN後write禁止時のREFACTOR境界を固定
- **adapter**: `.codex/agents/hayate.toml`をLuna/mediumで作成。現sessionへ動的反映されたと
  仮定せず、新規sessionでnamed typeをpreflightする
- **比較境界**: 異なるnamed role packageの単発観測とする。telemetry欠測時は成果物単体
  評価だけを行い、差・比率・順位を算出しない。単発時間は加入判断の根拠にしない
- **Stage境界**: Stage HはStage Rと比較目的で並行可能。Stage 5の必須gateには今回せず、
  関係は未判断として人間へ残す
- **反映先**: `docs/agent/team.md` / `docs/roadmap.md` /
  `.codex/agents/hayate.toml` / `docs/work/current-task.md` /
  `docs/work/hayate-ritsu-code-comparison-new-session-prompt.md`

## 2026-07-20 — Ritsu実装・複合実行担当の加入準備開始【人間承認・fresh session待ち】

- **提案**: 専門担当が判断を固定した後の制作・実装・検証をRitsuへ委譲し、専門判断と
  受入れ確認を依頼元へ残したままend-to-end時間を短縮する
- **事前レビュー**: Shinoが要件を改訂し、Kaiがdispatch案、Tokiが速度・品質評価計画、
  Rinが初回・差分・最終確認を実施。最終判定は条件付き進行可、新規リスクなし、
  Gate C限定P0 1件、加入順・Luna証跡・baselineのP1 3件、P2 0件
- **人間の判断**: Toki部分のコミット後、「Ritsuを進めよう」と指示。Ritsuだけを先行し、
  Hayateの正本・adapter・試用・加入はRitsuのgrowth loop完了まで進めない
- **正本反映**: Ritsuを`加入準備中`として定義。Luna/high必須、Gen集中dispatch、
  専門判断非委譲、4段階加入状態、docs-only初回、コードwrite隔離gateを固定
- **adapter**: `.codex/agents/ritsu.toml`を作成。公式Codex manualでcustom agent fileの
  `model` / `model_reasoning_effort`対応を確認したが、実利用modelの証明とは扱わない
- **未検証**: 名前付きfresh起動、実model・effort、fresh性、read/write非逸脱、速度、
  品質非劣性、コード能力、技術的write隔離
- **work整理**: 合同ドラフト、依頼書、重複レビューをRitsu専用の評価計画と統合
  リスクレビューへ圧縮し、Stage Rの現行成果物を5ファイルへ限定
- **反映先**: `team.md` / `workflow.md` / `roadmap.md` / `ADR-0020` /
  `.codex/agents/ritsu.toml` / `current-task.md` / `ritsu-gate-s-smoke-contract.md` /
  `ritsu-evaluation-plan.md` / `ritsu-onboarding-risk-review.md`

## 2026-07-20 — Toki正本の自立化・Stage 4 work整理【人間承認・完了】

- **提案**: 正本化コミットへ`docs/work/`の中間成果物を混在させず、採用判断を
  ADR-0016〜0019へ直接固定してから、一次証跡だけを残してworkを縮小する
- **正本自立化**: ADRから昇格済みADR候補へのリンクを除去。ADR-0016へ`CD-01`、
  成果物とG4入力のSHA-256、条件付き採用、実行境界、転記条件を直接記録
- **人間の判断**: 明示した36件の削除と`current-task.md`の現在地への圧縮を承認
- **整理結果**: 定義・adapter・ADRドラフト、依頼、判断前資料、中間レビューなど
  未コミット36件を削除。原成果物、TC-1、EP-1、G3〜G5、Gen評価・対応、Rin初回・
  差分レビュー、人間判断の11件を監査証跡として維持
- **状態**: Toki加入済み、Stage 4条件付き完了、Stage 5未着手を維持。`CD-01`、
  初回1サンプル、fresh性・read/write非逸脱・再現性・安全性・技術的強制は未解消
- **対象外**: Ritsu/Hayate関連、技術方式A・B・C、sandbox・permission profile、
  実装、PoC、設定変更、実テスト、外部調査
- **反映先**: `docs/decisions/ADR-0016〜0019` / `docs/work/current-task.md` /
  `.ai/board/handoff-log.md`

## 2026-07-19 — Toki加入・5人標準workflow・Stage 4条件付き完了【採用・正本昇格済み】

- **提案**: 初回試運転と原則1周レビューを完了したTokiを加入済みとし、作業成果物に
  固定した参加判断、出力量方針、5人標準workflow、テスト分析先行TDDを正本へ昇格する
- **試した結果**: 名前付きTokiは初回1回、再試行0回、fallbackなしで379行の
  `test-analysis.md`を作成。EP-1非公開標本9要素、固定母集団51要素、QA技法から
  11項目への導出を確認。成果物内容だけを案Aで条件付き採用し、`CD-01`を維持
- **Rinレビュー**: Toki定義レビューは初回P0:0/P1:3/P2:2、差分で新規指摘なし。
  初回試運転レビューはP0:0/P1:3/P2:1、Gen対応後の差分で新規P0/P1なし。
  workflow更新は定義レビューP2-2の後続ゲートと既承認roadmap・memoを実行し、
  今回の最終文面だけを対象にした新規Rinレビューは行っていない
- **人間の判断**: 「Tokiはもうメンバー入り」として加入済み表示とwork成果物の
  正本昇格を承認。5人標準workflow、テスト分析先行TDD、Stage 4条件付き完了を採用
- **正本昇格**: `ADR-0016` Toki参加 / `ADR-0017` 出力量ポリシー /
  `ADR-0018` 5人標準workflow / `ADR-0019` テスト分析先行TDD
- **正本反映**: `team.md`のToki加入済み、`acceptance-criteria.md`判断境界、
  `workflow.md`の標準フローと実装ゲート、`roadmap.md`のStage 4条件付き完了
- **継続境界**: `CD-01`、初回1サンプル、fresh性・read/write非逸脱・再現性・
  安全性・技術的強制は未検証。技術方式A・B・C、sandbox・permission profile、
  実装、PoC、設定変更、実テスト、外部調査は未採用
- **反映先**: `docs/agent/team.md` / `docs/agent/workflow.md` / `docs/roadmap.md` /
  `docs/decisions/ADR-0016〜0019` / `docs/work/pending-rules.md` /
  `docs/work/toki-stage4-promotion-record.md` / `docs/work/current-task.md`

## 2026-07-19 — Stage 4 Toki正本定義【採用・加入準備中】

- **提案**: Tokiを案B「テスト分析・テスト項目設計担当」とし、QA技法、品質リスク、カバレッジ、テスト条件、具体的項目、期待結果、優先度、追跡関係を担当させる。初期責務にテスト実行・実結果評価を含めない
- **Rinレビュー**: 初回P0:0 / P1:3 / P2:2。早すぎる加入済み表示、初回評価契約の人間承認脱落、将来案Cの独立性弱化、正本内旧参照、5人workflowゲートを指摘。Gen修正後の差分再レビューは新規P0/P1/P2なしで、正本反映判断へ戻せると判定
- **人間の判断**: 修正版Toki定義の`team.md`反映と、Shino・Kai節の相互参照の同時更新を承認
- **反映**: Tokiを`参加採用・加入準備中`として正本へ追加。初回の独立評価母集団・項目契約のdispatch前承認、将来案Cの条件作成者と技術評価者の分離、実装担当とのTDD境界、品質・セキュリティ共有責任を反映
- **状態境界**: `加入済み`への遷移は、adapter、試運転契約、低感度入力、名前付きfresh session、試運転、振り返り、加入作業完了の人間承認後。今回の正本反映から自動承認しない
- **保留**: adapter、試運転契約、Toki起動・試運転、加入済み表示、workflow変更、技術方式A・B・C、sandbox・permission profile変更、PoC、実装、外部調査、Stage 4完了
- **ADR候補**: `docs/work/adr-drafts/2026-07-19-toki-test-analysis-participation.md`は未昇格のまま維持
- **反映先**: `docs/agent/team.md` / `docs/work/toki-definition-draft.md` / `docs/work/risk-review-stage4-toki-definition-rereview.md` / `docs/work/current-task.md` / `.ai/board/handoff-log.md`

## 2026-07-19 — Stage 4 Kai参加判断【条件付き採用・正本昇格済み】

- **提案**: 名前付きKaiの初回成果を1サンプルの条件付き機能証跡として採用し、役割定義・adapterを現状維持してKaiをチームへ参加させる。技術的強制方式は別テーマとして保留する
- **試した結果**: fresh sessionで`agent_type: kai` / `fork_turns: none`をplatformが認識。1ターン・再試行0回・fallbackなしで`architecture-options.md`を158行で作成し、責任境界の異なる3案、pros/cons、成立・不成立条件、限界を提示
- **Rinレビュー**: 初回P0:0 / P1:3 / P2:2。Gen修正後の差分再レビューで新規P0/P1なし。P1 3件は技術ドラフト不足が解消し、限定証跡の十分性、未強制期間の利用、Toki停止解除に関する人間判断待ちへ移行
- **人間の判断**: 「とりあえずKaiを参加させるので良い」として条件付き採用。Kai固有価値・再現性・read/write非逸脱・技術的強制は未検証のまま維持し、既存安全境界とタスク単位契約内の設計成果物に限定して参加を許容
- **保留**: 案A・B・Cの採否、sandbox・permission profile構成、read制限の必要範囲、実現可能性確認、PoC、実装。コード実装、PoC、設定変更、外部連携、高権限・本番操作、読ませてはいけない機密・blind入力、または既存安全境界やタスク単位契約を越えるread/writeを含む案件は割当前に再判断
- **次のゲート**: Toki加入は別の明示承認まで停止。Stage 4全体は完了扱いにしない
- **正本昇格**: RinのP1-1・P1-4の緩和策を採用し、規定パスの独立ADR候補から`ADR-0015-kai-conditional-participation.md`へ昇格。`docs/roadmap.md`のStage 4は状態行だけを「進行中」へ更新。P1-2・P1-3・P1-5・P1-6は差分再レビューで解消済み、新規P0/P1なし。原則1周のためRinの再々レビューは未実施
- **成果物整理**: 案Aを採用し、技術方式保留・Toki候補入力・主要リスク証跡の9件を維持。正本・主要レビュー・ログへ集約済みの未コミット中間成果物10件は、Rin削除前レビュー（P0:0 / P1:0 / P2:1）と人間の最終承認後に削除。Kai定義・adapter・ADRの内容変更なし
- **反映先**: `docs/decisions/ADR-0015-kai-conditional-participation.md` / `docs/roadmap.md` / `docs/work/current-task.md` / `stage4-kai-trial-decision-summary.md` / `stage4-kai-trial-retrospective.md` / `risk-review-stage4-kai-trial-rereview.md` / `adr-drafts/2026-07-19-kai-conditional-participation.md` / `stage4-promotion-draft.md` / `risk-review-stage4-promotion.md` / `.ai/board/handoff-log.md`

## 2026-07-19 — Stage 4 Kai定義・Codex adapter・初回試運転【採用・正本反映済み・起動未認識】

- **提案**: Kaiを最小の汎用アーキテクトとして定義し、要件から複数設計案、pros/cons、成立・不成立条件、限界を比較可能にする。初回テーマは名前付きサブエージェントのread/write境界の技術的強制・検知・検証
- **Rinレビュー**: 初回P0:0 / P1:7 / P2:1。Gen対応後の差分再レビューで初回8件すべて解消。新規P1 KAI-R09は、独立認識確認を廃止し、承認済み試運転の初回起動へ統合するRin推奨緩和策を反映
- **人間の判断**: Kaiに複数案・各案の限界・pros/consを考慮させる方針を採用。続いてKai定義の正本反映、Codex adapter作成、試運転依頼確定、`agent_type: kai` / `fork_turns: none` での名前付き初回起動を明示承認
- **境界**: 概念設計と比較材料まで。技術方式の採用、実装、PoC、外部連携、高権限操作は未承認。Kai未認識時のdefault / inline / 履歴付き起動へのfallback禁止
- **試した結果**: `team.md` Kai節、`.codex/agents/kai.toml`、確定試運転依頼を順に反映後、同一セッションで `agent_type: kai` / `fork_turns: none` を実行。platform応答は `unknown agent_type 'kai'`。Kai実行前に停止し、fallback・再試行なし、`architecture-options.md`未作成
- **次のゲート**: adapter読み込みがセッション開始時である可能性（未確定）を踏まえ、新しいCodexセッションで名前付きKai起動を1回だけ再試行。未認識なら代替せず人間判断へ戻す
- **反映先**: `docs/agent/team.md` Kai節 / `.codex/agents/kai.toml` / `docs/work/kai-stage4-trial-request.md` / `docs/work/current-task.md`

## 2026-07-19 — Stage 3 Shino試運転の振り返り【案A採用・条件付き完了】

- **提案**: Shino定義とCodex adapterを現状維持し、正式テンプレート化を次のShino実テーマまで保留してStage 3を条件付き完了とする案A。対案は、今テンプレートを作る案Bと、別テーマでもう1回試運転する案C
- **試した結果**: 名前付き`shino`をfresh contextで起動し、解答非開示の1指摘から`requirements.md` 56行 / `open-questions.md` 38行を作成。情報区分 / 人間判断 / 事実確認の3軸を分離し、指示遵守と権限制御、対応と解消、独立確認、人間判断用情報を抽出した。REQ-09の明示/仮説混在1件はGen統合で補正
- **Rinレビュー**: 試運転レビューは初回P0:0 / P1:3 / P2:3、振り返りレビューは初回P0:0 / P1:5 / P2:1。いずれもGen対応後の差分再レビューで対象指摘を解消し、新規P0/P1・見解相違・個別許容待ちは残らなかった
- **人間の判断**: **修正版案Aを採用**。Stage 3を「完了（条件付き）」とし、Shino定義・adapterは変更しない。案B / Cと、Shino定義へ直ちに「一要件一情報区分」を追加する案は採用せず、再発確認まで保留する
- **残留リスク**: platform応答と限定manifestは条件付き機能証跡。blind性・read非逸脱・repo全体write非逸脱・技術的権限制御は未検証
- **次の安全ゲート**: Genは、コード作業・外部連携・高権限操作を含む依頼の受入れ・担当割当前に停止する。技術的強制の要否と未検証範囲を人間へ提示し、明示判断を`current-task.md`へ記録するまで対象作業を開始しない
- **テンプレート再確認**: 次のShino実テーマの人間判断前レビューで、Genが全要件行の「1要件内の情報区分混在」を確認して`current-task.md`へ記録する。1件でも再発したら、最小テンプレートまたは定義変更案を人間判断前に候補化する
- **反映先**: `docs/roadmap.md` Stage 3状態 / `docs/work/current-task.md` / `.ai/board/handoff-log.md`。試運転用の一時成果物18件は判断を本ログへ集約後、未コミットのまま削除

## 2026-07-18 — Shino(篠・要件整理)の定義とStage 3試運転計画【採用・反映済み】

- **提案**: Shino を、明示情報・仮説・未確認を分け、人間判断と事実確認を混同せず、`requirements.md` / `open-questions.md` へ整理する要件担当として迎える。初回テーマは「レビュー指摘の対応・独立検証・人間判断ループの標準化」
- **Rinレビュー**: 初回 P0:0 / P1:4 / P2:3。Genが全件対応し、差分再レビューで6件解消、P1-1一部未解消、新規P1-5。原則1周のため再々レビューせず、P1-1を3軸状態、P1-5を過去P1-2の解答非開示ケースへ修正して人間へ提示
- **人間の判断**: **1A〜5Aを採用**。(1)情報区分 / 人間判断 / 事実確認の3軸。ただし確認は重要度に応じて即時 / まとめて / 保留可能へ分ける (2)Shinoは利用者・業務上の成功結果候補まで、Tokiはテスト条件・証跡・合否判定方法 (3)過去P1-2を解答非開示で試す (4)Stage 3を進行中へ (5)team.md反映とCodex adapter作成へ進む
- **反映先**: `docs/agent/team.md` Shino節 / `docs/roadmap.md` Stage 3状態 / `.codex/agents/shino.toml` / `docs/work/current-task.md`
- **次のゲート**: fresh context で名前付き Shino を実起動し、必須正本参照・指定成果物だけの書き込み・前後証跡を確認する。成功するまでStage 3完了とは扱わない

## 2026-07-18 — Codex を基準実行環境とする委譲フローを正本化【採用・反映済み】

- **提案**: Codex を最初の基準実行環境とし、Gen が独立作業を名前付きサブエージェントへ委譲して Markdown 成果物を統合する。Claude Code / Antigravity は同一スモークテストで比較する
- **試した結果**: Codex カスタムagent `rin` の実起動に成功。初回は成果物作成が時間超過し、最大80行・追加調査なしの縮小再試行で完了。Rin 初回レビュー P0:1/P1:4 → Gen 全件対応 → 差分再レビューで既存2件解消・P1-2許容判断待ち・不足2件+新規P1×2 → 緩和策を正本変更案へ反映
- **人間の判断**: 6項目をすべて採用。(1)正本・Codex adapter変更 (2)fresh session 2回目をStage 3前に必須 (3)Stage 3要件整理まではinstruction-based残留リスクを条件付き許容 (4)新規ロールごとの名前付き起動確認維持 (5)次の比較環境はClaude Code (6)ADR正式昇格
- **反映先**: AGENTS.md / docs/agent/safety.md / workflow.md / team.md / docs/roadmap.md / `.codex/agents/rin.toml` / ADR-0014 / docs/work/current-task.md
- **残るゲート**: Stage 3開始前に、版固定したfresh sessionでRin機能スモーク2回目を成功させる。実行IDと保護領域全体・書き込みallowlistの前後manifest/hashを記録する。Stage 3要件整理後、コード・外部連携・高権限操作の前に技術的強制の要否を再判断する

## 2026-07-07 — Stage 2(Rin 加入)完了。振り返りと合否判定【採用・反映済み】

- **提案**(Gen が stage2-retrospective.md にドラフト化 → Rin レビュー2周): Stage 2 を「完了」と判定する。判定基準は件数でなく「指摘が対象特定可能で、人間が採用/却下を判断できたか」(P1-6 で人間承認済みの基準)。判定材料は初回 risk-review(P0:1/P1:6/P2:7、全件対象特定)+ 実対象レビュー3件の反復(jj 緩和2周 / mermaid 図2周 / cleanup-plan)— Rin 自身が P2-6 で出した確定条件「次の実対象への2回目レビューで確定」と整合
- **試した結果**:
  - **完了条件「一般論ではない具体的な反対意見」は充足**。失敗条件「名前だけ増えて出力が同じ」「一般論だけ」に該当せず(Rin の指摘は Gen が見落とした正本の欠陥を検出し、正本4ファイル+safety 初緩和の実変更を生んだ)。Rin 定義の大きな見直しは不要(判断E・再指摘差分ルールは反映済みで、以後3件で定義どおりの挙動)
  - **アダプタ経由起動(P1-5)のみ2セッション連続で失敗**(`Agent type 'rin' not found`)。「同一セッション作成が原因」仮説は反証。ファイル形式は正常、原因は実行環境側の読み込みと推定(未確定。診断・確認手順は stage2-retrospective.md 8節)
  - クローズ自体のドラフトにも新フローを完全適用: Rin レビュー1周目 P1:4/P2:4 → Gen 全件修正 → 差分再レビューで全解消 + 新規 P2:2 → 即修正。Rin の捕捉: 削除前提「dangling なし」が grep 実証で既に偽 / 「環境起因」の断定 / 案1 の比較非対称 / 保留 P2 の記録喪失 / なりすまし事象の欠落
- **人間の判断**: **完了**(2026-07-07「Stage 2 完了」= 案1・条件分離)。許容判断: F = 飲む(未成功工程を切り出して閉じる。免除ではなく期限移動 — 実質期限 = Stage 3 完了前)/ G = 確認手順の完全実施は経ずに閉じる(Gen の smoke test 失敗確認が前提事実)/ I = 歯止め句入り注記を採用(「本件限り・以降も都度の明示判断」)。詳細は risk-review-stage2-close.md 末尾の判断記録
- **反映先**: docs/roadmap.md(Stage 2 状態行 = 完了 / 手順行に歯止め注記 / Stage 3 に前提行「アダプタ起動経路の解決」)/ docs/work/current-task.md(完了)。持ち越し: P2 7件の仕分け(推奨案は stage2-retrospective.md 10節)/ クラスタ整理(同11節・縮小版)/ アダプタ起動経路の解決(Stage 3 完了前)

- **提案**(docs/work 整理の一環。human 承認): 滞留していた ADR 候補を docs/decisions/ へ正式昇格し、決定を永続化する。archive(塩漬け移動)はやめ、「残す決定は ADR 昇格 / 作業ドラフトは削除」を正とする(human 指摘)
- **やったこと**: 候補11件を ADR-0002〜0012 として昇格(元候補は「採用・昇格済み」に更新して残置=ADR-0001 の前例踏襲)。jj 緩和は ADR 未作成だったため**新規 ADR-0013 を起案**。**ADR-0013 は ADR-0004(vcs-human-only)を部分 supersede**(閲覧3コマンドの例外)— 双方向に改訂関係を明記(Rin 実行前レビュー P1-4)
- **Rin 実行前レビューで塞いだ点**: 削除で生存ファイルに dangling が残る参照(P1-3: risk-review→request 等)/ ADR-0004↔0013 の正面衝突(P1-4)/ ADR 間相対リンク(P2-5: ADR-0006→0003)。反映後 grep で dangling ゼロを機械確認
- **human の判断**: 昇格12件・削除は4件(risk-review クラスタは P2 決着まで据え置き)・ADR-0004↔0013 は「部分 supersede」表現(いずれも 2026-07-06)
- **反映先**: docs/decisions/ADR-0002〜0013(新規)/ 参照修正(workflow.md:44・growth-log 本ログ・current-task・risk-review-request)。経緯: docs/work/cleanup-plan.md

## 2026-07-06 — safety.md 初緩和: 読み取り専用 jj 3コマンドの許可(判断B)【採用・反映済み】

- **提案**(Rin 指摘 P1-4 の緩和策(b)→ 判断B): 未コミット差分の確認のため、`jj st` / `jj diff` / `jj log` の3コマンドを全エージェントに許可する。**safety.md の初緩和・初の前例**
- **手続き**: safety.md ヘッダの定め(緩和には人間の明示承認 + growth-log 記録を必須とする)に従った。緩和の中身(3コマンド許可)は 2026-07-05 に人間が明示承認(判断B = YES)。文言は新フローで Rin レビュー2周を通した
- **Rin レビューで塞いだ穴**: (P1-1)「読み取り専用」は jj では不正確 — 閲覧系も作業コピーをスナップショットするため、禁止側を「状態を変更しうる操作」と言い換えると例外自身が禁止に飲まれる → 禁止は「原則すべて不可」の広い表現を保ち例外を列挙で開ける形に。(P1-2)「git も同様」で git 読み取り系が禁止から外れて読める → git は例外の外と明記。(P1-3 / P2-6)`jj diff --tool`・`--config`・`-R`・`PAGER` 等で許可コマンドが任意コード実行の裏口になる → 「素の形で使う(危険なオプション・環境変数を足さない)」を条件化。(P2-4)team.md Rin節・rin.md アダプタの追従。(P2-5)本記録の導線をチェックリスト化
- **人間の判断**: **採用**(2026-07-06「ok。このまま行きましょう」)。(b)(c) が分かりにくいとの指摘を受け、軸=「3コマンド許可・他は禁止」+ ※注2つ に表現を平易化(実質不変)。op log にスナップショット痕跡が残ることは許容(判断B に含む)
- **反映先**: docs/agent/safety.md 2節 / docs/agent/workflow.md 2節 / docs/agent/team.md Rin節 / .claude/agents/rin.md(2026-07-06 反映済み)。経緯の全記録: ADR-0013(docs/decisions/ADR-0013-jj-readonly-relaxation.md)。詳細レビュー履歴は jj 履歴
- **前例としての含意**: 今後の safety 緩和は本件の形式(日付 + 判断ID + 列挙制 + 用途 + growth-log 記録)を踏襲する。将来 .claude/settings.json の許可リスト化に乗せる場合も「素の形のみ」の条件を落とさない

## 2026-07-05 — workflow.md 1節に基本フローの補助図(mermaid)を追加【採用・反映済み】

- **提案**(人間の発案 → Gen がドラフト化): 基本フローの番号付きリスト直下に mermaid 補助図を追加。「リストが正、図は補助」を明記(LLM にはリストで十分、図の価値は人間の一覧性、という前提整理込み)
- **試した結果**: **新フロー(5 + 下位2項)の初の完全適用になった**。Rin レビュー1周目: 重大リスクなし(観点7一覧付き = 判断E 初適用)+ P2 5件 → Gen 全件修正 → 差分再レビュー: 全件解消 + **新規 P1-6 発見**(mermaid ラベル内 ASCII 括弧で図全体が描画不能。mmdc 実証・修正法検証込み)→ Gen 2行修正 + mmdc 機械判定で成功確認。描画不能の図が正本入りする事故をループが未然に止めた
- **人間の判断**: **採用**(2026-07-05。P1-6 も明示採用 = 判断D の記録。「すごくエージェントループが機能している」)
- **反映先**: docs/agent/workflow.md 1節(2026-07-05 反映済み)。経緯: workflow.md 1節 + 本ログ。詳細レビュー履歴は jj 履歴

## 2026-07-05 — Rin 指摘の採用による土台修正7件(safety / workflow / team / roadmap)【採用・反映済み】

- **提案**(Rin の指摘 P0-1・P1-1〜P1-6 → Gen が base-fix-draft.md にドラフト化): (1) 正本保護リストに AGENTS.md・CLAUDE.md・.claude/ 全体を追加 (2) 書き込み許可 Q1 を全エージェントに一般化 (3) 基本フローに Rin レビューを組み込み(必須 = 正本変更ドラフトと final-proposal。判断C)+ 指摘後のループ(Gen 対応 → 差分再レビュー原則1周 → 仕分けして人間へ。Rin の OK は前提条件ではない) (4) P0/P1 の明示判断義務(判断D) (5) セッション区切りでの人間コミット + Gen の未コミット差分確認責任 (6) Rin 定義に「観点一覧付き重大リスクなしは正当な成果」「再指摘は差分のみ」(判断E) (7) アダプタは新セッションでの起動確認をもって完了
- **提案の背景**: Stage 2 試運転(Rin の初レビュー)の指摘14件のうち P0/P1 全7件を人間が採用。(3) のループ部分は人間の指摘「Rin が指摘だけして終わる気がする」から追加。「Rin OK をゲートにしない」は No Consensus Without Dissent の趣旨(反対は解消してから出すのではなく見えるまま出す)による
- **試した結果**: 判断D は同日の P0/P1 仕分け(risk-review.md への判断記録)で実践済み。他は次のテーマから適用
- **人間の判断**: **採用**(2026-07-05。ドラフトは diff 形式 → 単語単位ハイライト形式(mo 表示)に改善して確認。「内容はOKです」)
- **反映先**: docs/agent/safety.md 2・4節 / docs/agent/workflow.md 1・2節 / docs/agent/team.md(Gen 責任 +1項、Rin 責任 +2項)/ docs/roadmap.md Stage 2(2026-07-05 反映済み)。ADR 候補: rin-review-scope / p0-p1-explicit-judgment / no-risk-is-valid-output
- **未反映のまま残る関連判断**: 判断B(読み取り専用 jj。safety 初緩和のため明示承認待ち)/ 判断A(技術的強制)/ P2 7件

## 2026-07-05 — Rin(凛・リスク番人)の定義を team.md に追加【採用・反映済み】

- **提案**(Gen): 2人目のメンバー Rin の定義(役割・責任・見る観点・重大度 P0/P1/P2・成果物・禁止事項・動作形態)を team.md に追記し、起動アダプタ .claude/agents/rin.md を作成する(docs/work/rin-definition-draft.md)
- **提案の背景**: next-member-proposal.md の採用(2026-07-05)により Stage 2 着手。元ネタは original-memo.md セクション11(Kiri)
- **試した結果 / 議論**: 人間の問い「リスクにセキュリティは入るのか。テストで防ぐなら QA では? Kai/Toki との責務分担は?」から責務境界を整理: セキュリティは Rin の守備範囲に含むが、対策の設計は Kai・検証の設計は Toki の領域で、Rin は「見落としの指摘・重大度付け・許容判断の整理」まで(Rin は領域担当ではなくプロセス役割、技術・ビジネス横断)。この一文を役割に追記
- **人間の判断**: **採用**(2026-07-05。責務境界の追記を条件とする承認 → 追記のうえ反映)
- **反映先**: docs/agent/team.md(Rin 節を新設、未加入表から Rin 行を削除)/ .claude/agents/rin.md(新規作成)。試運転は未実施 — Rin 定義自体も試運転のレビュー対象に含め、結果次第で本定義を見直す(ドラフト C節 論点5)

## 2026-07-05 — 人間提案: 作業の原則5項(なぜを残す / 仮説先行 / TDD・テスト分析)

- **提案**(人間): (1) 「なぜ」(Why / Why not)をどこかに残す (2) 調査は仮説を立てて人間に説明してから (3) Kent Beck 式 TDD(RED → GREEN → REFACTOR、テスト分析と項目の事前承認) (4) テスト項目は外枠のみ先行作成して人間レビュー (5) テスト分析手法(境界値分析・デシジョンテーブル等)の必須使用
- **試した結果 / 整理**(Gen): (1)(2) は汎用のため workflow.md ドラフト7節に反映(workflow.md の承認と一体で確定)。(3)〜(5) はコードを書くテーマが未着手のため時期尚早と判断し、docs/work/pending-rules.md に保留。実装テーマ着手時または Toki 加入検討時に反映を再提案する
- **人間の判断**: 提案自体は人間発。「今は早いかもしれない。タイミングが来たら入れる」の指示に基づく条件付き保留((3)〜(5))。(1)(2) は 2026-07-05 の workflow.md 承認により**確定**
- **反映先**: docs/agent/workflow.md 7節(反映済み・承認待ち)/ docs/work/pending-rules.md(保留分)

## 2026-07-05 — ループ1周目: Gen 定義に「記録の運用」を明文化する【採用・反映済み】

- **提案**(Gen): docs/agent/team.md の Gen「責任」節に次の2項を追加する
  1. セッション開始時に `.ai/board/handoff-log.md` の先頭エントリと `docs/work/current-task.md` を読み、文脈を回復する
  2. セッションの区切りで handoff-log に作業記録を追記する
- **提案の背景**: handoff-log の運用は Stage 1 で始まったが、Gen の定義には記録の運用が書かれていない(定義と実運用の不整合。current-task.md 8節の洗い出しで発覚)。今セッションも人間の明示指示があって初めて handoff-log から再開した
- **試した結果**: 本セッション(2026-07-05)で実践。handoff-log 先頭エントリから文脈回復でき、人間の指示は1行で済んだ。有効と判断
- **人間の判断**: **採用**(2026-07-05。growth-log の形式もあわせて確認済み)
- **反映先**: docs/agent/team.md の Gen「責任」節に2項を追記(2026-07-05 反映済み)
