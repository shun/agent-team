# current-task: Mission Room UI/UXデモ

- 更新: 2026-08-16 / 更新者: Aira
- 進行中: 直インストールは GitHub 直接取得に対応。テスト 10 passed
- 次の相談: 変更をリモートに載せてから、他リポでワンライナー確認
- Mission Room: B5 P1 修正済み、P2 五件と Medium 試運転は未決
- 人間方針（2026-08-16）: 人間がボトルネック。エージェントが複数案を先に揃える。
  承認後は完了まで回す。途中課題は知らせてから今の作業をやりきり、区切りで相談する
- VCS: エージェントは操作しない

# current-task 履歴: Mission Room UI/UXデモ

- 更新: 2026-07-25 / 更新者: Gen（玄）
- 状態: **Stage 5 Babylon.js 3D Slice B5のP1四件を修正済み。
  自動検証完了、最終post-closure browser再観測はBlocked、元P2五件は未解決**
- 人間判断: agent-teamは完成済み。7人総出でMission Roomデモを爆速実装する
- VCS: エージェントは操作しない

## 1. 目的

AIエージェントチームがMarkdown成果物を介して提案を作り、人間が判断する過程を、
「Mission Room」という一つの空間で直感的に把握・操作できるUI/UXデモとして提示する。

## 2. 対象範囲

- 単一画面を中心とした、触れるフロントエンドデモ
- Gen / Shino / Kai / Toki / Rin / Ritsu / Hayateの役割・稼働状態・成果物の可視化
- ミッションの進行、成果物の閲覧、人間の判断、エージェント活動の体験
- レスポンシブ表示、キーボード操作、主要インタラクション
- 本番候補に近いReact + TypeScriptの構成とCloudflare互換ビルド
- 実データに見える固定fixtureと、クライアント内の状態遷移

## 3. 非対象

- Codex server app、LLM、MCP、永続DB、認証、課金、外部サービスとの実接続
- production deploy、正本docsの変更、VCS操作
- 実在するタスクや秘密情報の取り込み

## 4. 制約と仮説

- 技術スタックの正本は未確定。デモではWeb UIの本番候補としてReact / TypeScript / CSS、
  Cloudflare Worker互換の構成を採る。採否は人間判断へ戻す
- 画面は「一般的な管理ダッシュボード」より、チームが動く作戦室らしさを優先する
- バックエンド境界はfixture adapterとして分離し、後からCodex server appへ置換可能にする
- 人間の最終判断者としての存在を、承認・保留・差戻しの操作で明示する
- Mission Roomは抽象的なdashboardではなく、キャラクター化された7人が同じ部屋で
  働き、壁面のカンバン、ガント、ホワイトボードを使って議論する空間として表現する
- ホワイトボードにはExcalidraw風の手描きスクライブが生成・更新され、議論の論点、
  矢印、反対意見、決定待ちが空間内に残る体験を中核にする

## 5. 完了条件

- 7人の専門工程成果物がMarkdownで残る
- `mission-room/` にローカル起動可能なUIデモがある
- ミッション選択、成果物閲覧、フェーズ移動、人間判断の主要体験が動く
- 対象テスト、型・ビルド確認、視覚QAを実施し、結果を記録する
- RinレビューとGen統合を経て、残留リスクと未実装境界が明示される
- 公開deployは行わない

## 8. デモ実装用の暫定判断（Gen、正本化しない）

Shinoの未確認事項は、デモを止めず次の仮説で実装する。デモ後に人間が採否を判断する。

- fixtureは完全な架空データとし、画面上にDEMO表記を置く
- 各メンバーは、名前、役割、状態、現在の作業、担当成果物を表示する
- フェーズはIntake → Requirements → Architecture → QA → Risk review → Build → Decisionとする
- 承認はDecision完了、保留はPaused、差戻しはArchitectureへ戻る状態変化として見せる
- ミッション選択、成果物閲覧、判断操作をすべてキーボードで利用可能にする
- デスクトップを第一対象とし、タブレット・スマートフォンでは情報を段階表示する
- 「作戦室らしさ」は、暗い軍事UIではなく、活動の接続と判断待ちが見える共同作業空間で表す


## 6. 専門工程と担当

- Shino: `requirements.md` / `open-questions.md`
- Kai: `architecture-options.md`
- Toki: `test-analysis.md`
- Ritsu: `mission-room/` の標準実装と `ritsu-implementation-result.md`
- Hayate: 固定済みの小規模な独立検証と `hayate-verification-result.md`
- Rin: `risk-review.md`
- Gen: 進行、競合停止、`final-proposal.md`、handoff統合

## 7. 人間判断ゲート

- この依頼をStage 5テーマとし、実装へ進むこと: **承認済み（2026-07-22の依頼）**
- テスト分析とテスト骨組み: **承認済み（2026-07-22「ok。良いです」）**
- 技術スタックの正本化、公開deploy、正本反映: 未承認

## 9. 暫定実装候補（人間承認済み・正本化しない）

- UI: Kai Option A「DOM/CSS cutaway room」。三方の壁をカンバン、ガント、
  Excalidraw風スクライブとして表現し、`CrossWallRef`で同じ文脈を相互強調する
- 状態: 集約reducer + transition policy
- データ境界: `MissionQueryPort` / `MissionCommandPort` + `FixtureAdapter`
- stack: 現行vinext / React / TypeScript / CSS / Wranglerを維持
- この選択はデモ用の可逆な暫定判断で、技術stackの正本化ではない

## 10. テスト分析ゲート

- Toki成果物: `docs/work/test-analysis.md`（60項目、全項目未実行）
- 優先T1: 三面壁の役割、同一`CrossWallRef`の同時強調、壁への接近・room復帰、
  dashboard/tab縮退の防止、更新把握、キーボード、port境界、build
- Gen暫定値で骨組み化できる。OQ未回答部分は正式合否をBlockedとして残す
- 人間承認: 2026-07-22「これで一旦やってみよう」
- テスト骨組み: `docs/work/ritsu-test-skeleton.md`
- 次の操作: fresh sessionで、技術的write隔離したSlice 1「room overview」を
  RitsuへRED→GREEN→REFACTORで委譲する

## 11. 2026-07-22 人間によるコンセプト修正

人間は、Mission Roomの重要点として次を明示した。

- キャラクター表現
- 壁にあるカンバンとガント
- 議論の様子がExcalidraw風ホワイトボードへスクライブされること

この修正により、従来のテスト分析はそのまま承認対象にしない。Shinoの要件、Kaiの設計、
Tokiのテスト分析を差分更新してから、実装ゲートを再提示する。

## 12. 2026-07-22 検証焦点の追加

人間はキャラクターが動く体験について既存デモからイメージできている。今回まだ確認できて
いないのは、壁面を有効活用する情報設計とUI/UXである。

- 今回の主評価対象: 壁面カンバン、ガント、Excalidraw風スクライブの役割分担と連携
- 部屋俯瞰とキャラクター: 文脈を与える最小限の入口。作り込みの主対象にしない
- 必須体験: 壁へ接近、壁面間の切替、同一論点・成果物・担当の相互参照、更新の把握、
  部屋俯瞰へ戻る
- 成功判断: 壁面を使うことで、通常のタブ型dashboardより議論・進捗・計画の関係が
  理解しやすいかを人間がデモから判断できる

## 13. fresh session引継ぎ

- 引継ぎプロンプト: `docs/work/mission-room-slice-1-new-session-prompt.md`
- テスト骨組みレビュー: **承認済み（2026-07-22）**
- 人間の進め方: 小さな動くスライスごとにローカル画面を見せる
- 次のゲート: Slice 1「room overview」を実装・検証し、人間へ画面を提示する
- 実装は使い捨て作業コピー等の技術的write隔離を用意してRitsuへ委譲する
- 実装後はHayateの固定済み小規模検証、Rinレビュー、Gen統合まで行う
- local-only。deploy、VCS、正本変更は未承認

## 14. Slice 1実装結果（2026-07-22）

- 状態: **room overview実装・main検証・browser視覚QA完了。次の実装は人間判断待ち**
- 実装: semantic DOM/CSSによる三面room、床の7人、判断Desk、DEMO架空fixture、
  後続Slice向けの静的wall object / `CrossWallRef` preview
- TDD: fresh named Ritsuを使い捨てtemp copyへ隔離し、RED → GREEN → REFACTORを実施。
  Genが基準hash一致と独立差分を確認し、許可4fileだけを`apply_patch`で統合した
- main検証: `npm run build` exit 0、対象Node test 3/3 pass、`npm run lint` exit 0
- browser QA: desktop 1440pxと狭幅390px。三面の空間性、7人、Desk、DEMO、
  global横overflowなし、独立tabsなし、console warning/errorなしを確認した
- 未実装: 壁への接近、選択・三面同期、更新、room復帰、判断操作、完成版keyboard navigation
- 新しい人間要望: Babylon.jsによる3D空間デモ。現行の承認済みDOM/CSS Option Aと
  依存追加禁止を変更するため、package追加と置換/併存範囲の人間判断前には着手しない
- 3D版fresh session用プロンプト:
  `docs/work/mission-room-babylonjs-new-session-prompt.md`
- 3D版は、fresh named Tokiの専用テスト分析を人間承認した後、fresh named Ritsuが
  テスト骨組みを作り、再度の人間承認後に同じthreadでTDD実装へ進む

## 15. Babylon.js 3D Slice B1テスト分析（2026-07-22）

- 状態: **Toki分析を人間承認済み。Ritsuテスト骨組み作成へ進む。実装、test code、installは未着手**
- 人間判断: 2026-07-22「これで作っていこう」により、
  `test-analysis-babylonjs-b1.md`を後続骨組みのtest baseとして承認
- 人間固定母集団: B3D-01〜12。現行`/`を保持し、比較用`/3d`へroom overviewだけを追加する
- 公式確認: npm `latest`は`@babylonjs/core@9.17.1`、Apache-2.0、registry metadataに
  engines/direct dependency/peer dependencyなし。現行audit基準は15件
- 設計差分: `adr-drafts/2026-07-22-mission-room-babylonjs-3d-layer.md`
- Toki契約: `toki-mission-room-babylonjs-b1-request.md`
- Toki成果物: `test-analysis-babylonjs-b1.md`（analysis-draft、25項目、全項目未実行）
- Gen確認: B3D-01〜12は全件追跡。自動test、build、browser automation、視覚QA、
  人間観察を分離し、SSR/hydration/Engine/resize/cleanup/route往復とnegative testを被覆
- Blocked: scene/lifecycleの観測方式、WebGL/途中例外の注入seam、正式desktop環境、
  一室らしさ等の人間評価、resource所有方式、animation追加時のreduced-motion対象
- 次のゲート: fresh named Ritsuがテスト骨組みだけを作り、人間が骨組みを明示承認するまで
  product/test code、package installへ進まない

## 16. Babylon.js 3D Slice B1テスト骨組み（2026-07-22）

- 状態: **fresh named Ritsuの骨組みを人間承認済み・同じRitsu threadで隔離TDD実装へ**
- 人間判断: 2026-07-22「承認」により、
  `ritsu-mission-room-babylonjs-b1-test-skeleton.md`を実装前骨組みとして承認
- 契約: `ritsu-mission-room-babylonjs-b1-skeleton-request.md`
- 成果物: `ritsu-mission-room-babylonjs-b1-test-skeleton.md`
- 承認済みToki版: SHA-256
  `068c53767e4b4b49a7f98e3ae9d728773591235ee5e68bb7976f737d233190dc`
- Ritsu出力版: SHA-256
  `ece5d3471de73d6dc0e4ddfadeab7890207c0db4cd4973a496e9548e76809542`
- Gen確認: B3D-01〜12、B1-01〜25、BLK-01〜06、RED-1〜7を全件移送。
  planned writeはcore exact pin、`app/3d/`新規route/client/fixture/scene/style、新規B1 testへ限定
- 変更候補外: 現行`app/page.tsx`、layout、既存3 test、vite/build/plugin、worker/config。
  必要になれば勝手に拡張せずBlockedとして人間へ戻す
- 未実施: product/test code、install、build、test、lint、browser、network、VCS
- 次のゲート: main基準hashとwrite隔離を固定し、同じRitsu thread/modelへ実装requestを追加。
  使い捨てtemp copyでRED → GREEN → REFACTORを行い、Genが限定統合・main検証する

## 17. Babylon.js 3D Slice B1実装結果（2026-07-22）

- 状態: **`/3d` room overview実装・main検証・browser視覚QA・ローカル提示完了**
- 人間判断: npm依存metadata送信リスク説明後、隔離copy内の`npm audit --json`と
  `npm install --save-exact @babylonjs/core@9.17.1`を再度明示承認
- package境界: `@babylonjs/core`をexact `9.17.1`で1件追加。既存direct dependency/versionは
  不変。auditは導入前後/main統合後ともlow 1 / moderate 6 / high 8 / critical 0 / total 15
- 実装: 現行`/`を保持し、`app/3d/`へserver route、client-only Engine/Scene lifecycle、
  ArcRotateCamera、三面wall、床、7 agents、判断Desk、DynamicTexture label、semantic fallback、
  desktop/390px CSSを追加。外部asset/CDN/runtime外部requestなし
- 隔離/TDD: `/private/tmp/mission-room-babylon-b1.PVs44Z`で同じRitsu threadを継続。
  初回Phase 0はnetwork policyで停止し、人間再承認後にGenがaudit/installだけ復旧。
  baseline REDの事前実ログは未達、GREEN/REFACTORと結果記録は完了
- main検証: `npm run build` exit 0、Node test 7 pass / 1 browser-harness skip、
  `npm run lint` exit 0。buildは500kB超chunkとroute classificationの既知warningあり
- browser QA: WebGL2 runtime ready、desktop 1440pxと390pxでglobal横overflow 0、
  semantic wall 3 / agent 7 / Desk 1。drag orbit・wheel zoomの描画差分、WebGL拒否fallback、
  `/`↔`/3d` 3往復ready、console error/warning 0、networkはlocalhostだけを実測
- 未解消: Engine/Scene初期化途中例外の専用注入、scene内部不変条件の直接観測、正式な
  browser test harness。壁接近・選択・同期・更新・判断操作等のB1外機能は未実装
- ローカル: `http://127.0.0.1:3000/3d`をCodex内ブラウザへ表示。serverはlocal-only、deployなし
- 次のゲート: 人間がB1画面を評価するまで次の3D Sliceへ進まない

## 18. Babylon.js 3D Slice B2実装結果（2026-07-22）

- 状態: **`/3d`ライトテーマ化・三壁フォーカス操作・main検証・browser視覚QA・ローカル提示完了**
- 人間判断: 2026-07-22「もう少し進めよう。あと、ライトテーマにして」により、B2を
  `/3d`だけのライトテーマ、Overview / Kanban / Scribe / Gantt操作、壁pick、wall viewでの
  orbit / zoom維持へ限定。既存`/`、依存、object選択・同期・更新・判断操作は対象外
- 専門工程: fresh named Tokiの`test-analysis-babylonjs-b2.md`（B2-01〜29、B1-01〜25追跡）を
  基に、fresh named Ritsuが`/private/tmp/mission-room-babylon-b2.CxLmMY`で隔離実装・検証。
  Genが限定差分を`apply_patch`で統合し、実ブラウザで検出したRay副作用import不足も補正した
- 実装: 4つの`aria-pressed` view controls、`aria-live`現在地、壁ごとのcamera pose、
  3D wall pointer pick、camera観測属性、wall viewでのorbit / zoom、light DOM/CSS・scene配色、
  390pxでcontrolsを含むshellの自動高さを追加。package / lockfileは不変
- main検証: build exit 0、Node test 12 pass / 2 browser-harness skip / 0 fail、lint exit 0。
  buildの500kB超chunkとroute classificationは既知warning
- browser QA: desktop 1440×1000とmobile 390×844で横overflow 0。Enter / Spaceで4 viewを
  切替え、camera poseと単一pressedを確認。壁viewのdrag orbit / wheel zoom、前壁pick→Scribe、
  WebGL拒否fallback（全controls disabled・semantic情報維持）、`/`↔`/3d` 3往復を実測。
  修正後console error 0 / warning 0、networkはlocalhostだけ
- audit: package変更なし。2026-07-22再照会時点でregistryの新規勧告により
  low 1 / moderate 5 / high 11 / critical 0 / total 17。B2依存追加による増加ではない。
  自動fixは依存更新範囲を越えるため未実施
- ローカル: `http://127.0.0.1:3000/3d`。serverはlocal-onlyで継続、deploy・VCS操作なし
- 未解消: Engine / Scene初期化途中例外の専用注入、正式browser test harness、
  object選択・壁間同期・更新・判断操作。次Sliceは人間の画面評価後に限定する

## 19. Babylon.js 3D Slice B3新セッション引継ぎ（2026-07-22）

- 引継ぎプロンプト:
  `docs/work/mission-room-babylonjs-b3-new-session-prompt.md`
- 限定範囲: 架空fixture 1件を一つの`CrossWallRef`でKanban / Scribe / Ganttへ表現し、
  meshまたはsemantic DOMから選択して三壁を同期highlightする
- 状態契約: 選択はcanonical item IDまたは`null`の単一sourceとし、壁切替とOverviewで
  維持する。明示clearとEscapeで解除し、route再入場はoverview / 未選択へ戻す
- 維持範囲: B2 light theme、4 view、wall pick、orbit / zoom、fallback、390px、既存`/`、
  package / lockfileを保持する
- 非対象: 複数item、編集・更新、同期backend、判断Desk操作、character animation、
  package追加、network、deploy、正本変更、VCS操作
- ゲート: fresh named TokiのB3分析を人間承認後、fresh named Ritsuのtest skeletonを
  人間承認し、同じRitsu threadが隔離copyでRED → GREEN → REFACTORを行う
- Toki上限: 必須追跡を切らないよう最大360行を許容し、低いtoken budgetを固定しない。
  再試行はtruncation・必須欠落・契約違反に限り1回

## 20. Babylon.js 3D Slice B3テスト分析（2026-07-22）

- 状態: **fresh named Tokiの分析完了・人間レビュー待ち。Ritsu、test skeleton、実装は未着手**
- 契約: `docs/work/toki-mission-room-babylonjs-b3-request.md`
- 成果物: `docs/work/test-analysis-babylonjs-b3.md`（309行、SHA-256
  `574c77530eacd2b0037d5283c488771e22e9a671311b0db1d5dd832c6cd9e49d`）
- Gen確認: B3C-01〜17、B1-01〜25、B2-01〜29、rendered HTML 3項目を全件追跡。
  actual picked mesh ID、exact-one / set-equality、三highlight、state transition、a11y、fallback、
  lifecycle、geometry、console/network、visual/human境界、RED順序を含む
- 実行状態: 全項目未実行、analysis-draft、承認者なし、ゲート利用不可。test/build/lint/browser、
  network、VCS、product/test code変更は未実施
- 人間判断: object mesh pick時はcamera/current viewを維持する。object selectionとcamera移動を
  分離し、plain wall pickだけはB2どおりsource wall viewへfocusする（2026-07-22承認）
- 人間追加指示: 後続工程で独立しwrite targetが重ならない作業へ分割できる場合、Ritsuは
  最大2体まで並行利用する。B3 promptの同一Ritsu継続契約と競合しない分担だけを採用する
- 人間判断: 2026-07-22「分析も承認」により、B3 test skeleton作成へ進行

## 21. Babylon.js 3D Slice B3 test skeleton（2026-07-22）

- 状態: **fresh named Ritsuの骨組み完成・人間レビュー待ち。product/test codeと実装は未着手**
- 契約: `docs/work/ritsu-mission-room-babylonjs-b3-skeleton-request.md`
- 成果物: `docs/work/ritsu-mission-room-babylonjs-b3-test-skeleton.md`（91行、SHA-256
  `5762250912d857efaaa15433591b2c7a2aaf05a0a180f3881fda86d9424024e5`）
- Gen受入れ: 初版のbrowser evidence owner誤記とprefix省略追跡を、同一Ritsu threadの許可済み
  外部再作業1回で補正。B3C-01〜17、B3-01〜25、B1-01〜25、B2-01〜29、RH-01〜03を
  完全prefixで全件追跡し、固定camera判断を反映
- 証拠境界: repository B1/B2/B3 browser testはexplicit skip。Ritsuはskip skeletonのみを担当し、
  approved external browser acceptanceはmain workspaceのGen、visual/human判断は別owner
- planned write: 既存`app/3d/` 6file、新規B3 test 3file、後続resultだけ。package/lock、既存`/`、
  既存B1/B2/rendered test、config/workerはread-only
- 実行状態: skeleton以外のwrite、test/build/lint/browser/package/network/VCSは未実施
- Ritsu並行: 本ゲートは単一成果物でwrite競合するため1体のみ。実装はprompt指定どおり同じRitsu
  threadを継続し、2体目は将来の独立・非競合検証へ切り出せる場合だけ利用
- 次のゲート: 人間が本skeletonを明示承認するまでimplementation request、隔離copy、RED、
  product/test codeへ進まない

## 22. Babylon.js 3D Slice B3実装結果（2026-07-22）

- 状態: **cross-wall object selection実装・main検証・browser視覚QA・ローカル提示完了**
- 人間判断: Toki分析、current viewを維持するobject pick方針、Ritsu test skeletonを順に承認。
  実装はprompt指定どおり同じRitsu threadを継続した
- 隔離/TDD: `/private/tmp/mission-room-babylon-b3.wcWs0d/mission-room`。B2 baselineから
  intentional RED、GREEN、全回帰、build、lintを実施。結果は
  `docs/work/ritsu-mission-room-babylonjs-b3-result.md`（SHA-256
  `4de670291071894db0e4d5957aac0b9451e61dfc28f909369b77b818de8776cc`）
- 実装: canonical item `item-lantern` 1件と`ref-lantern` 1件を、Kanban progress、
  Scribe discussion、Gantt scheduleの実meshへ対応。mesh/semantic DOM選択、三面同時highlight、
  view間維持、clear、Escape、source wall、fallback、route resetを追加
- Gen補正: 独立差分レビューでactual mesh ID、Escape listener、側壁geometry、test oracleを同じRitsuの
  外部再作業1回で補正。main実画面でカードの識別性不足を検出し、許可済み`room-scene.ts`内で
  各壁にopaque local DynamicTexture labelと明確なcard面を追加した。B3表記も`page.tsx`へ更新
- main検証: build exit 0、Node test 19 pass / browser-harness 3 skip / 0 fail、lint exit 0。
  repository browser skipはPass集計外。package / lockfileは既知SHA-256からbyte不変
- browser QA: desktop 1440×1000でsemantic選択、三壁のactual picked mesh ID、三highlight、4 view維持、
  clear/Escape、repeat、non-object/wall pick、選択中orbit/zoomを実測。390×844はinitial/selected/
  cleared/fallbackすべて横overflow 0。WebGL拒否時は全6 controls disabled、三mapping維持、偽選択なし
- lifecycle/network: selected状態から`/3d`→`/`→`/3d`を3回行い、毎回ready / Overview / 未選択 /
  highlight 0 / observer 1世代を確認。main/fallbackともconsole error・warning 0、観測assetは同一originのみ
- ローカル: `http://127.0.0.1:3000/3d`をselected OverviewでCodex内ブラウザへdeliverable表示。
  production serverはlocal-onlyで継続、deploy・package変更・VCS操作なし
- 残るBlocked: repository内の正式browser harness、実ATでの読み上げ確認、cross-wall理解の最終人間評価。
  次Sliceの複数item、更新、判断Desk操作は未承認で未着手

## 23. Babylon.js 3D Slice B4新セッション引継ぎ（2026-07-23）

- 引継ぎプロンプト:
  `docs/work/mission-room-babylonjs-b4-new-session-prompt.md`
- 限定範囲: 既存`item-lantern`へ固定更新
  `update-decision-wait-01`を1件だけ追加し、Scribeを更新元として
  Kanban progress、Scribe discussion、Gantt scheduleへ同時反映する
- 状態契約: 選択IDと適用更新IDを独立させる。apply / resetはcurrent viewを維持し、
  clear / Escapeは選択だけを解除する。route再入場は両状態を初期化する
- 人間可読性: Toki分析は冒頭60行以内に意思決定用要約を置き、全体240行を目安にする。
  B1〜B3の巨大な行別matrixは再掲せず、回帰suiteとB4固有接続を示す
- Ritsu分割: skeleton承認後、core laneとUI laneへ最大2体を非競合分割する。
  coreはfixture/runtime/scene、UIはclient/page/CSSを所有し、Genがcore→UI順で限定統合する
- 維持範囲: B3 selection、三highlight、4 view、wall pick、orbit / zoom、fallback、
  desktop / 390px、既存`/`、package / lockfileを保持する
- 非対象: 複数item/update、自由編集、履歴、timer、persistence、backend同期、
  Decision Desk、character animation、package/network/deploy/VCS
- 次のゲート: fresh Toki分析を人間へ提示して停止し、明示承認後にだけRitsu skeletonへ進む

## 24. Babylon.js 3D Slice B4実装・体験補正結果（2026-07-25）

- 状態: **cross-wall update、理解導線、壁面ボード、flat card pickを実装・検証済み**
- 実装: `update-decision-wait-01`をScribe起点の一つの更新として、Kanban、Scribe、
  Ganttの三結果へ投影。選択と更新を独立stateとして維持した
- 体験補正: `案件確認 → 三壁へ反映 → 三結果を確認`の一本道へ再編し、三つの壁へ
  常時読めるfull boardを描画。壁を隠す立体boxと重複labelを廃止した
- 操作境界: 壁面flat cardを唯一の表示surfaceとし、actual B3 mesh IDを保持する
  不可視plane hotspotだけをpick用に残した
- 検証: Node test 33 pass / 4 explicit browser skip / 0 fail、build / lint exit 0。
  narrow browserでflat Kanban cardのactual pick、三highlight、三update、console issue 0を確認
- 設計記録:
  `docs/work/adr-drafts/2026-07-25-mission-room-wall-board-interaction.md`
- 境界: package / lockfile不変、外部network、backend、deploy、VCS操作なし

## 25. Babylon.js 3D Slice B5新セッション引継ぎ（2026-07-25）

- 引継ぎプロンプト:
  `docs/work/mission-room-babylonjs-b5-new-session-prompt.md`
  （498行、SHA-256
  `061e86dcdacd9ab928a5098782864e1f2d9b665e3ce1af74963f8361343c2e37`）
- 限定範囲: 既存`item-lantern`と`update-decision-wait-01`へDecision Desk caseを
  1件だけ接続し、人間が承認・保留・差戻しのどれかを選ぶ
- 判断境界: AIはoutcomeを推奨・事前選択・自動適用しない。native controlからの
  明示的な人間操作だけが一つのdecision outcomeを設定する
- 結果投影: 一つのoutcomeをmission stateとKanban / Scribe / Ganttの三結果へ投影する。
  selection / update / decisionは独立state axisとして観測する
- 3D体験: `Decision Desk` viewと既存Desk pickを追加し、壁面flat card構造を維持する
- ゲート: fresh Toki分析の人間承認 → fresh primary Ritsu skeletonの人間承認 →
  同じRitsu threadで隔離TDD → Gen限定統合・browser QA → fresh Rin risk review
- 非対象: 複数case、AI判断、履歴、永続化、backend、通知、package、外部asset、
  production、deploy、VCS
- 次の操作: 人間がB5プロンプト全文を新しいセッションへ送信する

## 26. Babylon.js 3D Slice B5テスト分析（2026-07-25）

- 状態: **fresh named Tokiの分析完成・人間レビュー待ち。Ritsu、test skeleton、
  product/test code、build/lint/browserは未着手**
- 契約: `docs/work/toki-mission-room-babylonjs-b5-request.md`
  （217行、SHA-256
  `8340b1b642a2b2348573ea8367a2301cd0adb63c733c7c2b0940ccafdddb2bf3`）
- 成果物: `docs/work/test-analysis-babylonjs-b5.md`
  （207行、SHA-256
  `a02b5d5da93326cbe1bb0b8960de49ddcf29671a7e0fdcfb43a724a1a6e4c19d`）
- Gen確認: B5C-01〜22を全件追跡。selection / update / decisionの三軸、
  `approve / hold / return`別のMission＋三壁exact set、五view、二つのDesk focus経路、
  clear / Escape / 二種類reset / stale / fallback / route再入場を被覆
- 回帰境界: RH、B1、B2、B3、B4をsuite単位で接続。repository browser testの
  explicit skip、過去結果、source、visual、人間判断を相互のPassへ転用しない
- Blocked: approved in-repository browser harness、B5観測・失敗注入seam、
  実AT/OS/browser/GPU母集団、三択同格・可読性・人間理解（BLK5-01〜04）
- 起動履歴: 初回と外部再試行はcommand/read allowlist違反で成果物未作成。
  人間承認のfresh Toki例外再起動で正本全文readを許可し、基準全件一致後に分析を作成
- 次のゲート: 人間が本分析を明示承認した後だけ、fresh primary Ritsuによる
  B5 test skeleton作成へ進む

## 27. Babylon.js 3D Slice B5テスト骨組み（2026-07-25）

- 状態: **fresh primary Ritsuの骨組み完成・人間レビュー待ち。
  product/test code、隔離copy、RED/GREEN、build/lint/browserは未着手**
- 人間判断: B5 Toki分析を「承認。すすめて」と明示承認
- 契約: `docs/work/ritsu-mission-room-babylonjs-b5-skeleton-request.md`
  （188行、SHA-256
  `076af5bece3b1e35138fb2240653231921f37755b52742f43b1edc25845d7d9a`）
- 成果物: `docs/work/ritsu-mission-room-babylonjs-b5-test-skeleton.md`
  （76行、SHA-256
  `ae155e281d62d09f63ffe50e52f5ac3c41d7bba33883dbdb8d28bcdb90c57a14`）
- Gen受入れ: B5-01〜30、B5C-01〜22、三軸state/interface、
  approve / hold / returnのexact Mission＋三壁set、RED-1〜6、
  RH/B1〜B4 grouped regressionを確認
- 所有境界: 同じprimary Ritsuが使い捨て隔離copyで`app/3d/` 6fileと
  新規B5 test 4fileを単独所有する計画。既存test、package/lock、`/`、configはread-only
- 証拠境界: repository browser testはexplicit skip/non-Pass。
  external browser、visual、console/network、人間理解はGen/人間所有
- 環境事実: 承認後のplain `jj st`はsandboxが`.git/objects`へsnapshotを書けず失敗。
  権限拡張や別VCS操作はせず、Toki/product/test SHA-256全件一致で競合gateを確認
- 次のゲート: 人間が本skeletonを明示承認した後だけ、同じ
  `/root/ritsu_babylon_b5`へ隔離TDD実装requestを追加する

## 28. Babylon.js 3D Slice B5実装・Gen検証・Rinレビュー（2026-07-25）

- 状態: **実装・限定統合・main自動検証・外部browser QA・fresh Rin review完了。
  P0なし、P1四件はrisk未受容で人間判断待ち**
- 人間判断: skeletonを「ok。すすめて」と明示承認し、同じRitsu threadの隔離TDDへ進行
- Ritsu契約:
  `docs/work/ritsu-mission-room-babylonjs-b5-implementation-request.md`
  （240行、SHA-256
  `7fbeb4a06d4f725a8421f7ce0310849dfdcc895bb93d666edd2c7f2a675d07b0`）
- Ritsu結果:
  `docs/work/ritsu-mission-room-babylonjs-b5-result.md`
  （75行、SHA-256
  `44d2e82bc22a848abd208fbf6f2b17d9931cd685f766045c0c91785109b4fe6f`）
- 隔離/TDD: `/private/tmp/mission-room-babylon-b5.NoKOas`で6 source＋新規B5 test
  4fileだけを変更。Genがalternate/stale outcome replacementと`onDeskPick` predicateの
  抜けを発見し、許可済み一回の同一Ritsu reworkでguardと直接oracleを追加した
- 統合境界: main側B4基準hashと競合なしを確認し、上記10fileだけを`apply_patch`で統合。
  package/lock、既存test、`/`、config/workerは不変
- main自動検証: focused B5 `8 pass / 0 fail / 2 skip`、RH+B1〜B5
  `41 pass / 0 fail / 6 skip`、production build / lint exit 0。skipはPassへ転用しない
- Gen外部browser:
  `docs/work/gen-mission-room-babylonjs-b5-verification.md`
  （87行、SHA-256
  `b2d37e3b9499394c63e6c04e3e70bf3abcd9862e973e79e1e407f7c55abfe0b6`）
  - 1440×1000 / 390×844で三outcome、五view、native/real Desk、三real card、
    plain wall、orbit/zoom、clear/Escape、二reset、三route再入場を確認
  - exact Mission＋三壁set、representation/mesh各3、unrelated intersection空、
    console warning/error 0、runtime asset 41/41 same-origin、global overflow 0
  - WebGL failure injection、Enter/Space activation、実AT/OS/GPU、人間理解はBlocked/pending
- fresh Rin request:
  `docs/work/rin-mission-room-babylonjs-b5-request.md`
  （94行、SHA-256
  `ca2ced506899265e084c790adf8a5d3828ed8273ecb023199c36ed60c0bbbb94`）
- Rin結果:
  `docs/work/risk-review-babylonjs-b5.md`
  （167行、SHA-256
  `accd8c710c9c327902e99179f92a0f15df73edb94d9a4151a832cd90edecf7fc`）
  - P0 0 / P1 4 / P2 5、risk未受容
  - P1-1: rapid alternate/stale actionでReact outcomeとscene outcomeが分岐し得る
  - P1-2: B5 automated runtime testがsource regex中心でbehavior exactnessを実行しない
  - P1-3: lifecycle/geometry属性が実測でなく自己申告値中心
  - P1-4: fixed promptの四段階journeyに対しvisible/accessibility flowが三段階のまま
- 次のゲート: 人間がP1四件を修正必須・保留・risk受容のどれにするか明示判断する。
  Genは未判断のまま次Slice、deploy、正本変更、VCS操作へ進まない

## 29. Babylon.js 3D Slice B5 P1修正・flow closure（2026-07-25）

- 人間判断: 「4件とも修正で進めて」
- 原Rin reviewへ判断を記録。P1-1〜4を修正対象、P2-1〜5を今回の判断対象外とした
- fresh Ritsu P1 remediation:
  `docs/work/ritsu-mission-room-babylonjs-b5-p1-remediation-result.md`
  （SHA-256
  `9d61bad4c9ffcb2078ce4146c94ea9d7d22ab917c1f8f036720f1cf1616639d4`）
- 修正:
  canonical decision state、runtime受理後だけのReact commit、fixture/projection deep equality、
  full-scene transform diff、実collection/observer/resource count、
  一つのordered four-step visible/accessibility flow
- Gen統合後: focused 24/24、full 52 total / 46 pass / 6 skip、build/lint exit 0。
  desktop browserで4段階、A/H/R、reset、実測属性、same-origin、overflow/consoleを確認
- 同じRin一回diff再review:
  `docs/work/risk-review-babylonjs-b5-p1-rereview.md`
  （119行、SHA-256
  `1b774aecb5662bed58c82b0df42edf3e9f34e5137f4b95d14350326982dcf1e7`）
  - P1-1 / P1-2 / P1-3 Closed
  - P1-4 Partially closed
  - P1-R1: Step 4がaccepted outcomeでなくB4 pre-decision結果を表示
  - P1-R2: clear/Escape後に保持中のupdate/decisionをflowがupcoming表示
- fresh flow-closure:
  `docs/work/ritsu-mission-room-babylonjs-b5-flow-closure-result.md`
  （72行、SHA-256
  `a2f9c340cadc426359b951e6af1e5ec35fdba228520dd61dfb735991e1ab9f9e`）
  - Step 4をselected outcome Mission＋exact三壁before→afterへbind
  - 未決定時を判断前previewとして分離
  - pure journey functionでclear-after-update=3、clear-after-decision=4を保持
  - 保持結果と再選択要件をlive statusへ明示
- final main自動検証: focused 26/26、full 54 total / 48 pass / 0 fail / 6 skip、
  build/lint exit 0
- Gen final verification:
  `docs/work/gen-mission-room-babylonjs-b5-flow-closure-verification.md`
- Blocked: 最終buildのfresh browser serverは承認サービス利用上限、
  既存targetはbrowser security policyで拒否。回避せずpost-closure browser再観測を未Passとした
- 残留境界: 元P2-1〜5（WebGL/context loss、keyboard/AT、重複presentation、
  mobile/visual/human母集団、evidence retention）は未解決・未受容
- 未実施: deploy、正本変更、VCS操作

## 30. Agent-team Medium 2スライス試運転prompt（2026-08-02）

- 状態: **新セッション用prompt作成済み。試運転分析・実装は未着手**
- 成果物:
  `docs/work/agent-team-medium-two-slice-pilot-launcher.md`（新セッションへ貼る短いprompt）
  と
  `docs/work/agent-team-medium-two-slice-pilot-new-session-prompt.md`
  （workspace内で全文読む詳細契約）
- 仮候補:
  - M1: B5 P2-3のDecision case semantic owner一本化
  - M2: B5 P2-1のready後WebGL lossに対するtruthful fallback
- 試運転境界: 送信時点ではMedium判定、fresh Toki差分分析、decision briefまで。
  product/test変更、Ritsu実装、skeleton単独承認の省略、2件目着手は、最初の
  人間ゲートによる一括の明示承認後だけ行う
- 測定: accepted completion時間、人間gate数、外部rework数、review後新規P1、
  人間必読artifact数を主指標とし、再提示回数と内部artifact数も併記する
- 最終境界: slice受入れ後にaccepted completionを確定し、fresh Rinのmetric/reviewを
  統合した同一final proposalで、案A/B/Cの採用・却下・保留を人間へ戻す
- 未実施: Toki/Ritsu/Rin起動、product/test変更、正本・adapter・roadmap変更、
  growth-log反映、VCS、deploy
- 次の操作: 人間が新セッションへlauncherのtext blockだけを送信する

## 31. Agent-team Medium 2スライス試運転・最初の人間ゲート準備（2026-08-02）

- 状態: **開始確認とGenの暫定Medium判定を完了。fresh named Tokiの差分分析へ進む**
- 目的: B5の未解決P2からM1/M2を2スライスで試し、安全境界と独立レビューを維持したまま、
  Toki承認とtest skeleton承認を一つの人間ゲートへまとめられるかを測る
- 対象:
  - M1: `decision-lantern-01`のSSR説明とinteractive panelを一つのsemantic ownerへ統合
  - M2: ready後WebGL/runtime lossを決定論的failure seamでtruthful fallbackへ遷移
- 非対象: product/test変更、Ritsu/Rin/Hayate起動、test skeleton単独承認の省略、2件目着手、
  正本・adapter・roadmap・growth-log・package・依存・外部service・VCS・deploy・production変更
- Gen暫定判定: **M1/M2ともMedium候補を維持**
  - M1は`page.tsx`と`babylon-room-client.tsx`を跨ぐpresentation責務変更でLowではないが、
    B5の一件case・human-only境界を維持でき、重要な新規architecture判断は現時点で不要
  - M2はclient/runtime/sceneの状態遷移とlifecycle testを跨ぐためLowではないが、
    決定論的seamと既存fallback契約の拡張で固定でき、network・package・永続dataを要しない
  - いずれもlocal/reversibleで、security/auth/schema/production/外部serviceを含まない
  - 将来のRitsu実装はslice別の使い捨てcopy、現行SHA基準、write前競合停止、Genの独立差分確認、
    main workspaceを復旧主体とする条件を固定可能。人間承認前には隔離copyも作らない
- 専門工程:
  - Toki: 適用。2候補を一つのfresh named Tokiでcompact差分分析する
  - Shino: 省略。候補の意味と利用者成功結果は詳細契約とB5 P2で固定済み。未取得観点は新しい
    要件競合の独立整理であり、Tokiが競合を見つけた場合に上流へ戻す
  - Kai: 省略。重要な新規責務境界の複数案は未観測。必要になればHighへ再分類する
  - Hayate: 省略。両候補は複数fileまたは状態遷移を含み、Medium候補である
  - Ritsu/Rin: この人間ゲート前は非適用。実装・reviewは未承認
- 開始証拠:
  - 指定正本、handoff先頭、current-task、roadmap成長ループ/Stage 5、B5四成果物、
    `app/3d/`全source、rendered HTMLとB1〜B5全testを確認
  - plain `jj st` / `jj diff`はいずれも`.git/objects`へのsnapshot書込み権限で失敗。
    権限拡張、git、別jj commandへ迂回していない
  - 代替SHA照合でpackage/lock、7 source、B4/B5 final manifest対象testが既知値と一致
- 停止条件: Medium条件の不成立、要件/重要architecture/oracleの不足、baseline mismatch、
  named Toki不成立、allowlist逸脱、network/VCS/package mutation要求を観測した場合は停止する
- 次の人間ゲート: `medium-two-slice-pilot-decision-brief.md`一件でM1/M2採用、Toki分析受入れ、
  今回限りのtest skeleton単独承認省略を一括判断してもらう
- Toki結果: `test-analysis-medium-two-slice-pilot.md`（81行、SHA-256
  `bc49607dc14eef2cd266b62214a941c60fbde4ac9134fdf8ccb86c2dfb5e24c1`）。固定母集団13/13を追跡し、
  test未実行、analysis-draft、ゲート利用不可
- 判定更新: M1はsemantic owner counting rule未固定のため条件付きMedium、M2はloss通知owner、
  決定論的刺激、generation/dispose、同一turn action oracle未固定のためMedium断定不可
- 停止: 詳細契約の「一つでも不明ならMediumと断定しない」と停止条件を適用。
  M1/M2を両方Mediumとする一括実装ゲート、Ritsu、product/test変更、2件目には進まない
- 次の判断: `medium-two-slice-pilot-decision-brief.md`を読み、M2をHighへ戻して本pairを保留し、
  M1 counting rule固定とfresh KaiによるM2責務境界分析を別途許可するか、人間へ戻す

## 32. Medium 2スライス試運転・限定分析の人間承認（2026-08-03）

- 人間判断: M2をHighへ戻してM1/M2 pairの実装ゲートを保留し、次の限定分析として
  M1 semantic owner counting ruleの固定とfresh KaiによるM2責務境界・成立案比較までを承認
- 対象:
  - Genが`medium-two-slice-pilot-m1-owner-counting-rule.md`へM1のcounting rule draftを固定
  - fresh named Kaiが`architecture-options-medium-two-slice-pilot-m2.md`へ複数案を比較
  - GenがM1のMedium再判定とM2の選択肢を統合して人間へ戻す
- 非対象: product/test変更、Ritsu/Toki/Rin/Hayate起動、test skeleton、RED/GREEN、
  M1/M2実装、2件目着手、package/network、正本・adapter・roadmap・growth-log、VCS、deploy、production
- 適用工程: Kaiのみ追加適用。Shinoは固定済み利用者成功結果に新競合がないため省略。
  Tokiは前回分析を入力として再起動しない。Rinはfinal proposal/正本draftではない限定分析のため未適用。
  未取得観点はM1 ruleの独立QA再評価とM2案のrisk重大度で、次の人間判断後まで保留
- 停止条件: named Kai/fresh context不成立、allowlist逸脱、重要要件の再定義が必要、
  source/test/package変更、network/VCS、高権限操作が必要な場合は停止
- 次の人間ゲート: M1 counting ruleの採否、M1 Medium再判定、M2設計案の採用/保留、
  および必要なToki差分再分析の可否。実装ゲートとは分離する
- M1成果物: `medium-two-slice-pilot-m1-owner-counting-rule.md`（60行）。stable marker、
  accessible region、完全content subtreeをSSR/hydration前/ready/初期化fallback/ready後loss fallbackで
  各exact 1と定義。内容は人間確認待ちで実装ゲート利用不可
- Kai dispatch: Codex `agent_type: kai` / `fork_turns: none`、返却ID
  `/root/kai_medium_two_slice_m2`。effective per-run model ID/effortはplatform非公開のため`unknown`
- Kai成果物: `architecture-options-medium-two-slice-pilot-m2.md`（101行）。
  案A runtime terminal gateと案B client canvas-event gateをM2-A1〜A7へ追跡し、blockerなし
- Gen推奨: 案A。既存Engine/Scene ownershipとloss observer/dispose ownerを一致させ、
  React state更新前にruntime mutatorをterminal gateで閉じられる。案Bより変更責務が集約される
- 判定: M1はrule採用後にMedium復帰可能。M2は案A採用とToki差分再分析後にMedium復帰候補。
  Engine/Scene公開契約の再設計、generation統合、restore policyが必要ならHighのまま
- 次の判断: M1 rule採用、M2案A選択、fresh named Tokiによる両slice差分再分析までを一括承認するか。
  Ritsu、product/test、実装ゲートは引き続き未承認

## 33. M1 rule・M2案A・Toki差分再分析の人間承認（2026-08-03）

- 人間判断: `medium-two-slice-pilot-decision-brief.md`の一括確認へ「承認します」と回答
- 採用入力:
  - M1: `medium-two-slice-pilot-m1-owner-counting-rule.md`を今回のpilot分析入力として採用
  - M2: Kai案A `runtime terminal gate`を今回のpilot設計入力として選択
  - QA: fresh named TokiによるM1/M2差分再分析までを承認
- M2案Aの固定境界: runtimeがEngine loss observable、runtime lifecycle token、全app-facing mutatorの
  terminal gate、loss observer、one-shot shutdownを所有する。clientはfallback投影と三軸保持を所有し、
  sceneは既存pointer/callback/board cleanupを所有する。real GPU deliveryとrestoreは非対象/Blocked
- 非対象: product/test変更、Ritsu/Kai/Rin/Hayate起動、test skeleton、RED/GREEN、M1/M2実装、
  2件目着手、package/network、正本・adapter・roadmap・growth-log、VCS、deploy、production
- Toki再分析目的: 前回M1-X1/M2-X1の解消確認、13件母集団の差分oracle更新、
  M1/M2のMedium再判定、残るBlockedと上流質問の明示
- 停止条件: named Toki/fresh context不成立、allowlist逸脱、rule/案Aと正本の競合、
  test実行・source/test/package変更、network/VCS、高権限操作が必要な場合は停止
- 次の人間ゲート: Toki差分結果とGen Medium統合判定を同じdecision briefへ反映し、
  成立時だけ詳細契約の最初の実装ゲートを提示する
- Toki dispatch: Codex `agent_type: toki` / `fork_turns: none`、返却ID
  `/root/toki_medium_two_slice_delta`。effective per-run model ID/effortはplatform非公開のため`unknown`
- Toki成果物: `test-analysis-medium-two-slice-pilot-delta.md`（95行、SHA-256
  `da61f0b9d24c5437052d73cbb635303e20cd0f255f2cf554ef268b1753ec217c`）。M1-X1/M2-X1解消、
  固定母集団13/13、test未実行、analysis-draft、blockerなし
- Gen統合判定: M1は採用ruleの範囲、M2は案Aのdeterministic seam範囲でMedium候補へ復帰。
  real GPU/context-loss delivery、restore、実AT/OSはBlockedのまま証拠代替しない
- 保護対象: package/lock、7 source、B5 test 5件の承認前SHA一致を再確認。
  product/test/package、network、VCS、隔離copy、Ritsu/Rin、正本・adapter・deploy・productionは未変更・未実施
- 次の判断: `medium-two-slice-pilot-decision-brief.md`で、M1/M2採用、Toki差分分析受入れ、
  skeleton単独承認を省略してM1の同一Ritsuを隔離RED→GREEN→REFACTORへ進める今回限りの例外を判断する
