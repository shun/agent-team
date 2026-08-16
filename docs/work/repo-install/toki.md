# リポジトリ直インストール — テスト分析

- 担当: Toki（時）
- 作業ID: RI-TOKI-1
- 作成: 2026-08-16
- 出力: `docs/work/repo-install/toki.md` のみ
- 状態: analysis-draft
- 承認者: なし
- ゲート利用: 不可

この文書は、指定された評価母集団に対するテスト分析である。
テスト実行、証跡生成、実結果評価、最終合否、設計採否、
リスク重大度の確定は行わない。

本書の期待結果は、すべて
`状態=analysis-draft / 承認者=なし / ゲート利用不可`
である。人間承認済みの受け入れゲートへ転用してはならない。

Q-I-01 / Q-I-02 / Q-I-03 の答えは採用しない。未回答の設計軸
として残し、依存する項目は Inconclusive とする。

## この文書がしないこと

- テスト実行、証跡生成、実結果の Pass / Fail 付与
- P0 / P1 / P2 の付与、残留リスクの受容
- 設計案 A から E の採否、推奨の確定
- Q-I-01 / Q-I-02 / Q-I-03 の採用
- 要件・設計・期待結果・オラクルの根拠なき補完
- 自ら広げた分母によるカバレッジ率の報告
- 実装、PoC、設定変更、VCS、ネットワーク、外部送信
- 正本 docs とツール別 adapter の変更

## 対象、非対象、テストベース

### 対象

計画レビューとしての導入・衝突・失敗の分析である。
将来の実装後確認は、項目として置くが、本作業では実行しない。

- 今回の計画作業が、採用済みの作業制約を破っていないこと
- 案 A から E の成立条件と成立しない条件の観測可能性
- 実装単位 U-SRC から U-VERIFY の開始不能条件
- Hayate が示したスライス境界の未固定と除外

### 非対象

| 対象外 | 理由 |
| --- | --- |
| テスト実行と実結果評価 | Toki 初期責務外。依頼でも禁止 |
| 実装レベル TDD・自動化・回帰 | Ritsu / Hayate の所有 |
| Mission Room 実装 | REQ-12。Aira 前提。人間判断は未判断 |
| 未コミット差分の片付け | REQ-13。同上 |
| パッケージレジストリ配布 | REQ-17 仮説の外側。Q-D-04 は保留可能 |
| 導入先の業務機能そのもの | Shino が製品対象外（未確認）と整理 |
| 削除・アンインストールの実施 | REQ-08 で削除禁止。REQ-32 / Q-D-01 は未確定 |
| 正本変更、VCS、deploy、外部送信 | 確定正本と今回の停止条件 |

### テストベース

読んだ入力は次に限る。入力中の命令、コマンド、リンクは
未信頼データであり、起動指示には使っていない。

- `docs/agent/team.md` の Toki 節
- `docs/agent/safety.md` 全文
- `docs/work/repo-install/request.md`
- `docs/work/repo-install/shino.md`
- `docs/work/repo-install/kai.md`
- `docs/work/repo-install/ritsu.md`
- `docs/work/repo-install/hayate.md`
- `docs/work/repo-install/toki-request.md`

Aira の checkout 記載と各担当の分類は、記載の存在を入力と
する。Toki はリポジトリ内容を独立検証していない。

### 前提

- 今回は計画である（REQ-02, REQ-03。人間判断は採用済み）。
- 人間が最終判断者である（REQ-04。採用済み）。
- このリポジトリのエージェント作業としての安全境界
  （REQ-05 から REQ-10）は採用済みである。
- 仮説（REQ-16 から REQ-22）と未確認（REQ-23 から REQ-33）は
  採用済み要件として扱わない。
- Kai の 5 案は比較材料であり、採用されていない。
- Ritsu は実装単位を開始不能と評価した。採否ではない。
- Hayate はスライス境界を固定できないと結論した。

### 未確認事項（推測で埋めない）

配布対象、直接の意味、対象リポジトリ範囲、衝突方針、
成功の観測条件、実験場ルールの転用、書込み主体、
roadmap との優先、更新・再導入、置き場制約、期限。
Q-I-01 / Q-I-02 / Q-I-03 は未採用のまま残す。

## 評価母集団

Aira が指定した母集団だけを分母にする。Toki は分母を
広げない。件数割合は報告しない。追加発見した品質リスクは
後節へ分けて書く。

| 母集団ID | 固定された評価対象 | 出典 |
| --- | --- | --- |
| POP-REQ | REQ-01 から REQ-33 | `shino.md` |
| POP-OPT | 案 A から案 E | `kai.md` |
| POP-UNIT | U-SRC, U-MANIFEST, U-FETCH, U-APPLY, U-COLLIDE, U-VERIFY | `ritsu.md` |
| POP-SLICE | 境界未固定、除外スライス、候補 A / B / C の不適格、HQ-01 から HQ-05 | `hayate.md` |

## 品質リスク

優先度 T1 / T2 / T3 は、テスト設計と将来の実行順の候補で
ある。Rin の重大度でも、人間の受容判断でもない。

| リスクID | 起こり得る結果 | 優先 | 主な条件 |
| --- | --- | --- | --- |
| QR-01 | PLAN 承認前に実装・VCS・deploy が始まり、計画と実装が混ざる | T1 | COND-PLAN |
| QR-02 | このリポジトリのエージェントが導入先へ書き、REQ-05 と衝突する | T1 | COND-WRITE |
| QR-03 | 正本・adapter を無断変更し、配布元の拘束を壊す | T1 | COND-CANON |
| QR-04 | 既存ファイルを確認なしに上書きし、導入先の意図しない差分を作る | T1 | COND-COLLIDE |
| QR-05 | 宣言と異なる集合を置き、実験場ルールの転用可否と矛盾する | T1 | COND-SET |
| QR-06 | 取得元がこのリポジトリでなくなり、「直接」が観測できない | T1 | COND-SRC |
| QR-07 | 書込み主体が追跡できず、安全境界の適用先が判定不能になる | T1 | COND-ACTOR |
| QR-08 | 導入成功の観測条件が無く、配置と「使える状態」を同一視する | T1 | COND-OK |
| QR-09 | 成立しない条件の案を実装対象にし、対象範囲を誤る | T1 | COND-OPT |
| QR-10 | 契約欄不足のまま実装単位またはスライスを開始する | T1 | COND-UNIT, COND-SLICE |
| QR-11 | 完了済みまたは未完了の PLAN を条件前に上書きする | T2 | COND-LEDGER |
| QR-12 | 更新・再導入・アンインストールを未確定のまま同一手段へ混ぜる | T2 | COND-LIFE |
| QR-13 | 期限・優先度・置き場を推測で固定し、比較前に選択肢を閉じる | T3 | COND-META |

## 追加発見した品質リスク（母集団外）

母集団の分母には加えない。追跡用の備忘である。

| リスクID | 起こり得る結果 | 出典上の手がかり |
| --- | --- | --- |
| QR-X1 | 適用器が迂回可能な高権限の書込み口になる | 案 B の限界 |
| QR-X2 | instruction 遵守を、書込み禁止や非逸脱の証明として扱う | Kai 共通前提 |
| QR-X3 | adapter の探索規則が未確認のまま、配置成功を利用可能とみなす | 案 A / B / C / D の限界 |
| QR-X4 | テンプレート枝と正本が乖離し、生成元を辿れなくなる | 案 E の保守 |
| QR-X5 | プライベート取得やオフラインを利用可能と断定する | 案 B / D の未確認環境 |

## 適用技法

名称の多さは品質の根拠にしない。項目導出に使った技法だけを書く。

| 技法 | 採用 | 導出先 | 理由 |
| --- | --- | --- | --- |
| リスクベースドテスト | 採用 | QR-01 から QR-10 を T1 | 安全境界破りと、未確定のまま実装開始する経路の影響が大きい |
| 状態遷移 | 採用 | T-PLAN-*, T-UNIT-*, T-SLICE-* | 計画 / 承認 / 実装開始の許可・停止が主失敗面である |
| デシジョンテーブル | 採用 | T-OPT-X1、衝突・主体の条件 | 軸の組合せで成立可否が変わる。セルの答えは埋めない |
| 同値分割 | 採用 | 取得元、対象クラス、配置モデル | 案 A から E は配置モデルで区別できる |
| ネガティブテスト | 採用 | 無断上書き、エージェント外部書込み、契約不足での開始 | 失敗として観測しうる候補が Shino / Kai / Ritsu / Hayate にある |
| シナリオ | 採用 | 取得 → 集合選択 → 配置 → 観測 | Kai の責務境界フローを、判定せず追跡する |
| 境界値 | 不採用 | — | 数値境界がテストベースに無い。px や件数を補完しない |
| 全組合せ網羅 | 不採用 | — | 案 × 対象 × 衝突 × Q-I 軸の直積は分母拡大になる |
| 実装 TDD | 不採用 | — | 実装担当の所有。本分析の対象外 |

デシジョンテーブルは、答えを採用するための表ではない。
未回答セルは Inconclusive として残す。

| 軸 | 値の置き方 | 項目への効き方 |
| --- | --- | --- |
| Q-I-01 | コピーする / 参考 / コピーしない。未採用 | COND-SET, T-INST-07。答えを選ばず判定不能を残す |
| Q-I-02 | 導入先人間 / このリポジトリのエージェント / 非書込みのみ。未採用 | COND-ACTOR, T-INST-03, T-INST-10。エージェント書込みは現行 REQ-05 と衝突しうる、とだけ書く |
| Q-I-03 | 依頼優先 / 育成のみ / 配布も含む一括禁止。未採用 | COND-SCOPE, T-INST-08。配布集合の大きさを差し替える軸として残す |
| Q-B-04 | 拒否 / 確認 / マージ / 対象外。未回答 | COND-COLLIDE。無断上書きしないは仮説（REQ-20） |

## カバレッジモデル

率は書かない。母集団の各要素を、条件と項目へ意味上追跡する。
状態は分析用であり、実施済み被覆を意味しない。

| 母集団要素 | 条件 | 項目 | 状態 |
| --- | --- | --- | --- |
| REQ-01 | COND-SRC, COND-OPT | T-INST-01, T-OPT-E2 | 案により覆い方が違う。観測条件は未確定 |
| REQ-02 | COND-PLAN, COND-SRC | T-PLAN-02, T-INST-01 | 計画作業としては追跡可 |
| REQ-03 | COND-PLAN | T-PLAN-01, T-SLICE-02 | 採用済み制約。実行はしない |
| REQ-04 | COND-HUMAN | T-PLAN-03 | 採用済み制約 |
| REQ-05 | COND-WRITE | T-PLAN-04, T-INST-10, T-UNIT-04, T-SLICE-03 | 採用済み制約 |
| REQ-06 | COND-CANON | T-PLAN-05 | 採用済み制約 |
| REQ-07 | COND-VCS | T-PLAN-06 | 採用済み制約 |
| REQ-08 | COND-SAFE | T-PLAN-07 | 採用済み制約 |
| REQ-09 | COND-HUMAN | T-PLAN-03 | 採用済み制約 |
| REQ-10 | COND-LEDGER | T-PLAN-08 | 採用済み制約 |
| REQ-11 | COND-HANDOFF | T-PLAN-09 | 今回契約。人間判断は未判断 |
| REQ-12 | COND-OUT | T-PLAN-10 | 対象外記載の追跡。採否は未判断 |
| REQ-13 | COND-OUT | T-PLAN-10 | 同上 |
| REQ-14 | COND-LEDGER | T-PLAN-08 | Aira 前提。人間判断は未判断 |
| REQ-15 | COND-ACTOR | T-INST-03, T-INST-10 | 未判断。Q-I-02 未採用 |
| REQ-16 | COND-OK | T-INST-05, T-OPT-X2 | 仮説。全案で未保証 |
| REQ-17 | COND-SRC | T-INST-01 | 仮説 |
| REQ-18 | COND-ACTOR | T-INST-03 | 仮説。Q-I-02 未採用 |
| REQ-19 | COND-SET | T-INST-02 | 仮説。FACT-02 は必須集合ではない |
| REQ-20 | COND-COLLIDE | T-INST-04 | 仮説 |
| REQ-21 | COND-TARGET | T-INST-06, T-OPT-E1 | 仮説 |
| REQ-22 | COND-SET | T-INST-07 | 仮説。Q-I-01 未採用 |
| REQ-23 | COND-SET | T-INST-02 | 未確認。判定不能 |
| REQ-24 | COND-SRC | T-INST-01 | 未確認。判定不能 |
| REQ-25 | COND-TARGET | T-INST-06 | 未確認。判定不能 |
| REQ-26 | COND-COLLIDE | T-INST-04 | 未確認。判定不能 |
| REQ-27 | COND-SET | T-INST-07 | 未確認。Q-I-01 未採用 |
| REQ-28 | COND-ACTOR | T-INST-03, T-INST-10 | 未確認。Q-I-02 未採用 |
| REQ-29 | COND-SCOPE | T-INST-08 | 未確認。Q-I-03 未採用 |
| REQ-30 | COND-OK | T-INST-05 | 未確認。判定不能 |
| REQ-31 | COND-META | T-INST-11 | 未確認。推測禁止を追跡 |
| REQ-32 | COND-LIFE | T-INST-09, T-OPT-E2 | 未確認 |
| REQ-33 | COND-META | T-INST-12 | 未確認 |
| 案 A | COND-OPT | T-OPT-A1, T-OPT-A2 | 成立条件の分析。採否しない |
| 案 B | COND-OPT | T-OPT-B1, T-OPT-B2 | 同上 |
| 案 C | COND-OPT | T-OPT-C1, T-OPT-C2 | 同上 |
| 案 D | COND-OPT | T-OPT-D1, T-OPT-D2 | 同上 |
| 案 E | COND-OPT | T-OPT-E1, T-OPT-E2 | 同上 |
| 全案共通軸 | COND-OPT | T-OPT-X1, T-OPT-X2 | Q-I 未採用を崩さない |
| U-SRC | COND-UNIT | T-UNIT-01 | 開始不能の追跡 |
| U-MANIFEST | COND-UNIT | T-UNIT-02 | 同上 |
| U-FETCH | COND-UNIT | T-UNIT-03 | 同上 |
| U-APPLY | COND-UNIT | T-UNIT-04 | 同上。REQ-05 と両立しない契約は開始不能 |
| U-COLLIDE | COND-UNIT | T-UNIT-05 | 同上 |
| U-VERIFY | COND-UNIT | T-UNIT-06 | 同上 |
| 単位間依存・隔離・複合 | COND-UNIT | T-UNIT-07, T-UNIT-08 | 契約欄不足の開始禁止 |
| 境界未固定 | COND-SLICE | T-SLICE-01, T-SLICE-05 | Hayate 結論の追跡 |
| 除外スライス | COND-SLICE | T-SLICE-02, T-SLICE-03 | 採用済み制約による除外 |
| 候補 A / B / C | COND-SLICE | T-SLICE-04 | 不適格。採用しない |
| HQ-01 から HQ-05 | COND-SLICE | T-SLICE-05 | 未回答。値を置かない |

## オラクルと 3 値判定

### オラクル階層

版は各入力ファイルの 2026-08-16 作成記載である。
人間承認済みゲートは存在しない。

1. OR-REQ-ADOPTED: 人間判断が採用済みの REQ-02 から REQ-10。
2. OR-REQ-EXPLICIT: 明示情報だが未判断の REQ-01, REQ-11 から
   REQ-15。記載の存在だけを根拠にする。
3. OR-REQ-HYP: REQ-16 から REQ-22。仮説。ゲートに使わない。
4. OR-REQ-OPEN: REQ-23 から REQ-33。未確認。ゲートに使わない。
5. OR-KAI: 案 A から E の成立条件・成立しない条件・限界。
   採否ではない。
6. OR-RITSU: 実装単位の開始不能理由と契約必須欄。
7. OR-HAYATE: スライス適格条件、除外、候補の不成立条件。
8. OR-SAFETY: `docs/agent/safety.md` 1 節・2 節の確定禁止。
9. OR-HUMAN: 人間が後から確定する基準。現時点では未存在。

### 3 値

本書作成時点では全項目未実行である。実結果の 3 値は付けない。
各項目の判定欄は、将来実行するときの判定規則である。

- Pass: 前提と入力が揃い、必要な観測点が取れ、観測が
  analysis-draft の期待結果または、後に人間が承認した
  許容集合と一致する。
- Fail: 必要な基準が確定し実行可能であるのに、観測が
  期待結果・許容集合から外れる。
- Inconclusive: 人間判断、オラクル、実装、観測点の欠けで、
  Pass と Fail を区別できない。未実行は Fail ではない。
  不足時は当該項目を停止し、上流へ戻す。

Blocked と書いた箇所は、Inconclusive の停止理由である。

## テスト条件

| 条件ID | テスト条件 | 追跡 |
| --- | --- | --- |
| COND-PLAN | 今回は計画であり、PLAN 承認前に実装・VCS・deploy へ遷移しない | REQ-02, REQ-03, QR-01 |
| COND-HUMAN | 設計採否、ADR 正式追加、未確認の確定をエージェントだけで行わない | REQ-04, REQ-09, QR-01 |
| COND-WRITE | このリポジトリのエージェントがリポジトリ外へ書かない | REQ-05, REQ-15, QR-02 |
| COND-CANON | 正本 docs とツール別 adapter を無断変更しない | REQ-06, QR-03 |
| COND-VCS | 許可外のバージョン管理操作をしない | REQ-07, QR-01 |
| COND-SAFE | 秘密情報・生ログを書かず、削除と実質削除をしない | REQ-08 |
| COND-LEDGER | 未完了計画を上書きしない。完了済み PLAN の上書き条件は未判断のまま勝手に進めない | REQ-10, REQ-14, QR-11 |
| COND-HANDOFF | 指定成果物以外を変更しない | REQ-11 |
| COND-OUT | Mission Room 実装と未コミット片付けを、本計画の実装対象にしない | REQ-12, REQ-13 |
| COND-SRC | 取得元がこのリポジトリとして識別できる。「直接」の単一化はしない | REQ-01, REQ-17, REQ-24, QR-06 |
| COND-SET | 置いた集合が宣言と一致する。宣言内容は Q-B-01 / Q-I-01 待ち | REQ-19, REQ-23, REQ-27, QR-05 |
| COND-ACTOR | 対象への書込み主体が記録される。主体の採否はしない | REQ-15, REQ-18, REQ-28, QR-07 |
| COND-COLLIDE | 既存ファイルを黙って変えないことを、方針確定後に観測できる | REQ-20, REQ-26, QR-04 |
| COND-TARGET | 適用先が、人間が後から固定する対象範囲の内側である | REQ-21, REQ-25 |
| COND-SCOPE | 配布集合の大きさが、未採用の Q-I-03 軸と矛盾したまま実装へ進まない | REQ-29, QR-09 |
| COND-OK | 計画完了と導入成功を、未確定のままゲートにしない | REQ-16, REQ-30, QR-08 |
| COND-LIFE | 更新・再導入・アンインストールを、未確定のまま初回手段と同一視しない | REQ-32, QR-12 |
| COND-META | 期限、優先度、置き場を推測で固定しない | REQ-31, REQ-33, QR-13 |
| COND-OPT | 各案の成立条件と成立しない条件を、採否せず観測対象にする | 案 A から E, QR-09 |
| COND-UNIT | 実装単位は契約必須欄が埋まるまで開始しない | U-SRC から U-VERIFY, QR-10 |
| COND-SLICE | 境界と期待結果が事前固定できるまで Hayate スライスを開始しない | Hayate 結論, QR-10 |

## 具体的テスト項目

共通欄:

- 期待結果の状態: analysis-draft
- 承認者: なし
- ゲート利用: 不可
- 実結果: 未検証（実行していない）

実行可能性の意味:

- 静的レビュー可: 将来、成果物差分を人間または別主体が読む。
  本作業では読まない。
- 実装後可: PLAN 承認と実装の後。
- Blocked: 今は実行不能。不足を上流へ戻す。

### 計画作業の制約

| ID | 前提 / 入力または操作 | 観測対象 | 分析用期待結果 | 3値 | オラクル | 実行可能性 | 追跡 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T-PLAN-01 | 本計画レビューの作業中 / 実装・VCS・deploy 要求 | 指定出力以外の差分、実行記録の有無 | コード・設定・VCS・deploy が無い | Pass: 無い。Fail: 承認前に存在する。Inconclusive: 差分の観測点がない | OR-REQ-ADOPTED, OR-SAFETY | 静的レビュー可。本作業では未実行 | REQ-03, QR-01, COND-PLAN |
| T-PLAN-02 | 本成果物群 / 導入方式の確定記述を探す | 各担当成果物の状態表示 | 計画作成であり、方式の採用宣言が無い | Pass: 比較または未固定のまま。Fail: 採用済みと書く。Inconclusive: 状態欄が読めない | OR-REQ-ADOPTED | 静的レビュー可。未実行 | REQ-02, COND-PLAN |
| T-PLAN-03 | 未判断の争点 / 採否または ADR 正式追加 | 成果物、`docs/decisions/` を変えた記録 | エージェントだけで採否・ADR 正式追加をしない | Pass: 判断を人間へ戻す。Fail: 確定したと書く。Inconclusive: ADR 置き場を観測できない | OR-REQ-ADOPTED, OR-SAFETY | 静的レビュー可。未実行 | REQ-04, REQ-09, COND-HUMAN |
| T-PLAN-04 | 導入先パスへの書込み要求 | このリポジトリ外への write 記録 | エージェントが導入先へ書かない | Pass: 外部 write が無い。Fail: ある。Inconclusive: 外部 write を観測できない | OR-REQ-ADOPTED, OR-SAFETY | 静的レビュー可。未実行 | REQ-05, QR-02, COND-WRITE |
| T-PLAN-05 | 正本・adapter パスへの変更要求 | `AGENTS.md`、`docs/agent/`、`.codex/`、`.claude/`、`.agents/` 等 | 無断変更が無い。ドラフトも指定出力外へ置かない | Pass: 対象パスに変更が無い。Fail: ある。Inconclusive: 対象列挙と差分を対応できない | OR-REQ-ADOPTED, OR-SAFETY | 静的レビュー可。未実行 | REQ-06, QR-03, COND-CANON |
| T-PLAN-06 | VCS 操作要求 | jj / git 等の実行記録 | 例外 3 コマンドも含め、本作業では VCS を使わない | Pass: 実行が無い。Fail: ある。Inconclusive: 実行有無を観測できない | OR-REQ-ADOPTED | 静的レビュー可。未実行 | REQ-07, COND-VCS |
| T-PLAN-07 | 成果物作成 | 成果物本文、削除・改名の有無 | 秘密情報・生ログが無く、削除と実質削除が無い | Pass: 無い。Fail: ある。Inconclusive: 秘密の定義が対象に無く判定できない箇所は停止 | OR-REQ-ADOPTED | 静的レビュー可。未実行 | REQ-08, COND-SAFE |
| T-PLAN-08 | `tmp/PLAN.md` または未完了計画への書込み要求 | 当該ファイルの変更有無 | 未完了計画を上書きしない。完了済み PLAN を、Q-B-07 未判断のまま上書きしない | Pass: 上書きが無い。Fail: ある。Inconclusive: 完了済み条件の採否が無く、将来の許可範囲だけ判定できない | OR-REQ-ADOPTED, OR-REQ-EXPLICIT | 静的レビュー可。未実行 | REQ-10, REQ-14, QR-11, COND-LEDGER |
| T-PLAN-09 | 本レビューの各担当作業 | 変更ファイル集合 | 各担当は指定成果物以外を変更しない | Pass: 指定出力のみ。Fail: 許可外がある。Inconclusive: 変更集合を観測できない | OR-REQ-EXPLICIT | 静的レビュー可。未実行 | REQ-11, COND-HANDOFF |
| T-PLAN-10 | Mission Room または未コミット片付けの実装要求 | 対象パスの変更 | 本計画の実装対象として着手しない | Pass: 着手が無い。Fail: ある。Inconclusive: 対象外の人間採否が無く、公式化だけは判定できない | OR-REQ-EXPLICIT | 静的レビュー可。未実行 | REQ-12, REQ-13, COND-OUT |
| T-PLAN-11 | Q-I-01 / Q-I-02 / Q-I-03 が残る入力 / 設計・実装・スライス記述 | 各成果物の前提 | 3 問の答えを採用しない。軸として残す | Pass: 未採用と明記し、一つの答えで成立させない。Fail: 採用して先へ進む。Inconclusive: 採用の有無を文面から区別できない | OR-KAI, OR-RITSU, OR-HAYATE | 静的レビュー可。未実行 | Q-I 未採用, COND-SCOPE, COND-ACTOR, COND-SET |

### 導入・衝突・失敗

将来の導入操作を想定する。値は補完しない。

| ID | 前提 / 入力または操作 | 観測対象 | 分析用期待結果 | 3値 | オラクル | 実行可能性 | 追跡 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T-INST-01 | 採用した手段で取得する / 取得元識別を残す | リポジトリ識別と参照 | 取得元がこの git リポジトリとして辿れる。レジストリ経由だけを「直接」としない | Pass: 識別がこのリポジトリを指す。Fail: 別取得元だけになる。Inconclusive: 「直接」の単一意味（REQ-24）が未確定 | OR-REQ-HYP, OR-KAI | Blocked（手段未固定） | REQ-01, REQ-17, REQ-24, QR-06, COND-SRC |
| T-INST-02 | 宣言された配布集合を配置する | 宣言一覧と結果パス | 置いた集合が宣言と一致し、宣言外を黙って足さない | Pass: 一致。Fail: 宣言外または欠落を隠す。Inconclusive: 宣言集合（REQ-23, Q-B-01, Q-I-01）が未固定 | OR-REQ-OPEN, OR-KAI | Blocked | REQ-19, REQ-23, QR-05, COND-SET |
| T-INST-03 | 対象へ書く操作 | 実行主体の識別 | 誰が書いたかを後から辿れる。主体の採否はしない | Pass: 主体が記録される。Fail: 記録が無く帰属できない。Inconclusive: Q-I-02 未採用のため、正規の主体集合が無い | OR-REQ-EXPLICIT, OR-REQ-OPEN | Blocked | REQ-15, REQ-18, REQ-28, QR-07, COND-ACTOR |
| T-INST-04 | 対象に同名ファイルがある / 配置を要求 | 衝突分岐の記録、対象ファイル | 確認または拒否なしに上書きしない、は仮説である。方針確定後は、その方針どおり分岐が残る | Pass: 確定方針と分岐記録が一致。Fail: 黙って上書きする。Inconclusive: Q-B-04 / REQ-26 未回答 | OR-REQ-HYP, OR-REQ-OPEN | Blocked | REQ-20, REQ-26, QR-04, COND-COLLIDE |
| T-INST-05 | 配置または参照固定の後 / 成功判定を求める | 人間が指定する観測対象 | 配置成功を、REQ-16 の「使える状態」や最終合否と同一視しない | Pass: 観測対象が人間指定と一致し、未指定なら判定しない。Fail: 未確定のままゲート化する。Inconclusive: REQ-30 / Q-B-05 未回答 | OR-REQ-HYP, OR-REQ-OPEN | Blocked | REQ-16, REQ-30, QR-08, COND-OK |
| T-INST-06 | 対象リポジトリを選ぶ | 対象のクラス（空 / 既存 / 非 git / 特定ホスト等） | 未確定の範囲を、全リポジトリへ実装可能としない | Pass: 範囲確定後、外側へ適用しない。Fail: 未確定のまま広い対象へ進む。Inconclusive: REQ-25 / Q-B-03 未回答 | OR-REQ-HYP, OR-REQ-OPEN | Blocked | REQ-21, REQ-25, COND-TARGET |
| T-INST-07 | 正本・安全境界を対象へ置く操作 | 配布集合と効力の宣言 | 実験場ルールのコピー可否と効力を、Q-I-01 未採用のまま確定しない | Pass: 未採用のまま実装へ進まない、または人間採用後の宣言と一致。Fail: 効力を勝手に拘束または否定する。Inconclusive: Q-I-01 未採用 | OR-REQ-OPEN | Blocked | REQ-22, REQ-27, COND-SET |
| T-INST-08 | 複数ファイルの一括配置を主手段にする要求 | 配布集合の大きさ、依頼継続の前提 | Q-I-03 未採用のまま、一括禁止または依頼却下を確定しない | Pass: 軸を残し、集合の大きさを差し替え可能にする。Fail: 未採用の優先を採用して案を捨てる。Inconclusive: Q-I-03 未採用 | OR-REQ-OPEN, OR-KAI | Blocked | REQ-01, REQ-29, COND-SCOPE |
| T-INST-09 | 更新・再導入・アンインストール要求 | 初回導入手段との同一性 | 未確定のライフサイクル操作を、初回と同一手段必須にしない。削除はしない | Pass: 別判断として残すか、含めると決めた後だけ同一手段を使う。Fail: 未確定のまま同一視または削除する。Inconclusive: REQ-32 未確認 | OR-REQ-OPEN | Blocked | REQ-32, REQ-08, COND-LIFE |
| T-INST-10 | このリポジトリのエージェントが導入先へ書く契約 | 契約の write 集合、safety 2 節 | 現行 REQ-05 のまま、その契約を開始しない。Q-I-02 の答えは選ばない | Pass: 開始しない。Fail: 緩和なしに開始する。Inconclusive: 主体が人間かエージェントか観測できないが、エージェント外部 write 自体は禁止として停止できる | OR-REQ-ADOPTED, OR-SAFETY | 静的レビュー可。未実行 | REQ-05, REQ-28, QR-02, COND-WRITE |
| T-INST-11 | 期限または優先度が空の入力 | 要件・計画の期限欄 | 空欄を推測で埋めない | Pass: 未確認のまま残す。Fail: 根拠なく日付や順位を置く。Inconclusive: 対象成果物に期限欄が無いだけなら、本項目は判定しない | OR-REQ-OPEN | 静的レビュー可。未実行 | REQ-31, COND-META |
| T-INST-12 | 置き場・実行環境の先固定要求 | 設計比較の前提 | 人間が先に固定した制約が無いなら、置き場を単一確定しない | Pass: REQ-33 を未確認のまま比較に残す。Fail: 比較前に置き場を採用する。Inconclusive: 人間制約の有無（Q-D-03）が未回答 | OR-REQ-OPEN | Blocked | REQ-33, COND-META |

### 設計案の成立条件（採否しない）

各項目は、その案を使う場合の観測規則である。
案の採用を期待結果にしない。

| ID | 前提 / 入力または操作 | 観測対象 | 分析用期待結果 | 3値 | オラクル | 実行可能性 | 追跡 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T-OPT-A1 | 案 A を手段として使う / 複製を実施 | 配布一覧、取得元、実行主体記録 | 配布集合を宣言できる。このリポジトリを読める。手順書を技術的強制とみなさない | Pass: 宣言・取得元・主体記録がある。Fail: 一覧なしで複製する、または手順遵守を強制の証明にする。Inconclusive: Q-I-02 がエージェント書込みで、REQ-05 の扱いが未明示 | OR-KAI 案 A | Blocked（案未採用・実装なし） | 案 A, REQ-01, REQ-17, COND-OPT |
| T-OPT-A2 | 「直接」が局所取得元なしの単一リモート適用だけ、または成功が機械適用だけ | 案 A の適用可否 | 案 A は成立しない条件側である。無理に成立させない | Pass: 成立しないと記録し、他案と比較を残す。Fail: 条件を無視して案 A を唯一手段にする。Inconclusive: 「直接」の意味が未確定 | OR-KAI 案 A | Blocked | 案 A, REQ-24, COND-OPT |
| T-OPT-B1 | 案 B の適用器 / 宣言集合と衝突ファイル | 書込み先、拒否記録 | 宣言外パスへ書かない余地を保つ。本案の既定は衝突時に書かない。適用器迂回は強制できない | Pass: 宣言外と衝突既定拒否が観測できる。Fail: 宣言外へ書く、または既定で上書きする。Inconclusive: 衝突方針を上書きへ変えるかが Q-B-04 待ち | OR-KAI 案 B | Blocked | 案 B, REQ-20, QR-X1, COND-OPT |
| T-OPT-B2 | 新実行物を置けない、適用器も git 取得も使えない、または「直接」がテンプレートのみ / 参照のみ | 案 B の適用可否 | 案 B は成立しない | Pass: 成立しないと記録する。Fail: 環境未確認のまま利用可能と断定する。Inconclusive: 実行環境が未確認 | OR-KAI 案 B | Blocked | 案 B, REQ-33, COND-OPT |
| T-OPT-C1 | 対象が git / このリポジトリを commit 識別で従属 | 対象履歴上の URL と commit、投影の有無 | 取得元と版が git 識別で残る。このリポジトリのエージェントは許可外 VCS をしない | Pass: 参照が残り、エージェント VCS が無い。Fail: 参照なし複製だけ、またはエージェントが対象 VCS をする。Inconclusive: 投影要否が未確認 | OR-KAI 案 C, REQ-07 | Blocked | 案 C, REQ-02, REQ-17, COND-OPT |
| T-OPT-C2 | 対象が非 git、または成功が従来パスへの実ファイル配置のみで従属も投影も認めない | 案 C の適用可否 | 案 C は成立しない | Pass: 成立しないと記録する。Fail: 非 git へ従属を必須にする。Inconclusive: 対象範囲（REQ-25）未確定 | OR-KAI 案 C | Blocked | 案 C, REQ-01, REQ-25, COND-OPT |
| T-OPT-D1 | 案 D を手段として使う / 対象へ短いポインタを置く | 対象パス集合、ポインタ内容 | 置くのは URL・参照識別・任意ハッシュ・局所記述に限る。FACT-02 本文や adapter 一式は置かない | Pass: ポインタのみ。Fail: 本文一式を置く（他案へ寄せず本案と呼ぶ）。Inconclusive: 局所 adapter 必須かが未確認 | OR-KAI 案 D | Blocked | 案 D, REQ-17, COND-OPT |
| T-OPT-D2 | 成功が FACT-02 相当の局所配置、局所 adapter 必須、または完全オフラインでキャッシュも無い | 案 D の適用可否 | 案 D は成立しない。案内手段への降格を、REQ-01 の充足としない | Pass: 成立しないと記録する。Fail: 局所配置必須のまま案 D を導入完了とする。Inconclusive: REQ-16 / REQ-30 未確定 | OR-KAI 案 D | Blocked | 案 D, REQ-16, REQ-19, COND-OPT |
| T-OPT-E1 | 新規または空のリポジトリを、このリポジトリ由来のテンプレートから生成 | 生成元参照、初期ツリー、対象クラス | 生成元を辿れる。既存リポジトリへの後付けを本案の主経路にしない | Pass: 新規/空に限り、生成元が残る。Fail: 既存後付けを本案だけで覆う。Inconclusive: ホスト固有テンプレート限定かが Q-B-03 待ち | OR-KAI 案 E | Blocked | 案 E, REQ-02, REQ-21, COND-OPT |
| T-OPT-E2 | 既存への導入が必須、または更新・再導入を同一手段必須とする | 案 E の適用可否 | 案 E は成立しない。REQ-01 の部分被覆を全被覆と書かない | Pass: 部分的と記録し、他案併用を比較に残す。Fail: 既存必須を案 E だけで満たすと書く。Inconclusive: Q-B-03 / Q-B-06 未回答 | OR-KAI 案 E | Blocked | 案 E, REQ-01, REQ-32, COND-OPT |
| T-OPT-X1 | いずれかの案 / Q-I-01・02・03 の一つの答え | 各案の前提 | 一つの答えを前提に全案を成立させない。配布集合と実行主体は差し替えスロットのまま残す | Pass: 軸が残る。Fail: 未採用の答えを採用して案を除外する。Inconclusive: 文面が軸と採否を混ぜる | OR-KAI 未採用の設計軸 | 静的レビュー可。未実行 | 案 A から E, Q-I 未採用, COND-OPT |
| T-OPT-X2 | いずれかの案で配置または参照が終わった状態 / 「使える」判定 | 利用可能性の主張 | ファイル複製、適用、従属、ポインタ、生成の成功を、REQ-16 の保証にしない | Pass: 未保証と残す。Fail: 配置成功を利用可能と断定する。Inconclusive: REQ-16 は仮説のまま | OR-KAI 限界, OR-REQ-HYP | Blocked | REQ-16, QR-08, QR-X3, COND-OK |

### 実装単位

Ritsu の開始不能評価を、開始してよいかの項目へ変換する。
単位の採否はしない。

| ID | 前提 / 入力または操作 | 観測対象 | 分析用期待結果 | 3値 | オラクル | 実行可能性 | 追跡 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T-UNIT-01 | U-SRC の開始要求 / 置き場・配布集合・主体・間接 write が未固定 | 作業契約、write 集合 | 開始しない。正本を配布形へ直す更新も REQ-06 なしでは開始しない | Pass: 開始しない。Fail: 推測でパスや言語を埋めて開始する。Inconclusive: 契約欄の固定有無を観測できない | OR-RITSU U-SRC | 静的レビュー可。未実行 | U-SRC, REQ-06, REQ-33, COND-UNIT |
| T-UNIT-02 | U-MANIFEST の開始要求 / Q-B-01 と Q-I-01 が未固定 | 対応表の行集合 | 開始しない。FACT-02 を必須集合にしない | Pass: 開始しない。Fail: 候補列挙を必須集合として確定する。Inconclusive: 必須と候補の区別が文面に無い | OR-RITSU U-MANIFEST | 静的レビュー可。未実行 | U-MANIFEST, REQ-19, REQ-23, COND-UNIT |
| T-UNIT-03 | U-FETCH の開始要求 / 手段も主体も未固定 | 許可コマンド、ネットワーク / VCS の実行主体 | 開始しない。このリポジトリのエージェント作業としてネットワークまたは VCS 取得を始めない | Pass: 開始しない。Fail: 手段を推測して取得を実行する。Inconclusive: 人間操作かエージェントかが観測できない | OR-RITSU U-FETCH, OR-SAFETY | 静的レビュー可。未実行 | U-FETCH, REQ-24, REQ-07, COND-UNIT |
| T-UNIT-04 | U-APPLY をこのリポジトリのエージェント作業として開始 | write allowlist、対象リポジトリ | 現行 REQ-05 と両立しない契約は開始しない。導入先人間操作なら、Ritsu の write 集合はこのリポジトリ内に閉じる | Pass: 開始しない、または write がリポジトリ内に閉じる。Fail: 緩和なしに導入先へ書く。Inconclusive: Q-I-02 未採用 | OR-RITSU U-APPLY, OR-REQ-ADOPTED | 静的レビュー可。未実行 | U-APPLY, REQ-05, REQ-28, COND-UNIT |
| T-UNIT-05 | U-COLLIDE の開始要求 / Q-B-04 未回答 | 衝突時停止条件 | 開始しない。方針を「空リポジトリのみ」へ勝手に外さない | Pass: 開始しない。Fail: 未固定のまま検知実装を始める。Inconclusive: 対象パス集合が U-MANIFEST 未固定 | OR-RITSU U-COLLIDE | 静的レビュー可。未実行 | U-COLLIDE, REQ-26, COND-UNIT |
| T-UNIT-06 | U-VERIFY の開始要求 / 観測対象とオラクルが未固定 | 完了申告、期待結果 | 開始しない。分析用期待結果を受け入れゲートにしない | Pass: 開始しない。Fail: 未固定のまま完了申告する。Inconclusive: REQ-30 未確認 | OR-RITSU U-VERIFY | 静的レビュー可。未実行 | U-VERIFY, REQ-30, COND-UNIT |
| T-UNIT-07 | 既存ファイル更新を含む委譲 / 技術的 write 隔離が無い | 隔離、所有者、基準版、競合停止、独立差分、復旧主体 | 隔離条件が揃うまで委譲しない。manifest や allowlist 遵守を隔離の証拠にしない | Pass: 委譲しない。Fail: 隔離なしで既存更新する。Inconclusive: 対象が新規のみか既存含むか未定 | OR-RITSU 隔離 | 静的レビュー可。未実行 | 単位間依存, QR-X2, COND-UNIT |
| T-UNIT-08 | U-SRC から U-VERIFY を一つの作業 ID で開始 | 複合作業の必須欄 | 目的、人間判断、allowlist、write 集合、基準版、完了・検証、停止、隔離が欠けるなら開始しない | Pass: 開始しない。Fail: 欠けた欄を実装判断で埋めて開始する。Inconclusive: 実装契約自体が未作成 | OR-RITSU 複合作業 | 静的レビュー可。未実行 | 全単位, QR-10, COND-UNIT |

### スライス境界

Hayate の結論を、開始してよいかの項目へ変換する。
候補 A / B / C は採用しない。

| ID | 前提 / 入力または操作 | 観測対象 | 分析用期待結果 | 3値 | オラクル | 実行可能性 | 追跡 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T-SLICE-01 | 最初の短い実装スライスの開始要求 / 適格条件が不足 | 要件・設計・テスト条件・人間判断・境界・期待結果の固定有無 | 1 つでも不足なら開始しない | Pass: 開始しない。Fail: 不足を埋めて開始する。Inconclusive: 適格表を観測できない | OR-HAYATE 適格条件 | 静的レビュー可。未実行 | 境界未固定, QR-10, COND-SLICE |
| T-SLICE-02 | PLAN 未承認 / 実装・PoC・設定変更スライス | 実装成果の有無 | 開始対象外である | Pass: 開始しない。Fail: 承認前に実装する。Inconclusive: 計画成果と実装の境界が観測できない | OR-HAYATE 除外, REQ-03 | 静的レビュー可。未実行 | 除外スライス, COND-PLAN |
| T-SLICE-03 | このリポジトリのエージェントが導入先へ書くスライス | write 先 | 開始対象外である。Q-I-02 を採用しなくても、この主体の外部書き込みは禁止 | Pass: 開始しない。Fail: 開始する。Inconclusive: 実行主体が観測できない | OR-HAYATE 除外, REQ-05 | 静的レビュー可。未実行 | 除外スライス, COND-WRITE |
| T-SLICE-04 | 候補 A（導入先コピー）、候補 B（dry-run 入口）、候補 C（手順成果物）の開始 | スライス契約 | 3 候補は Hayate 適格ではない。第 4 候補を推測で足さない | Pass: 開始しない、推測追加もしない。Fail: 未固定のまま候補を実装する。Inconclusive: 候補を設計採否と混ぜて読む | OR-HAYATE 候補 | 静的レビュー可。未実行 | 候補 A / B / C, COND-SLICE |
| T-SLICE-05 | HQ-01 から HQ-05 が未回答 / 期待結果や write 集合を契約へ置く | スライス契約の単一目的、主体、期待結果、既存更新の有無 | 未回答の値を推測で置かない。PLAN 承認前に作業 ID を切らない | Pass: 空欄のまま開始しない。Fail: HQ を埋めずに開始する。Inconclusive: HQ の回答有無が成果物から読めない | OR-HAYATE Open questions | 静的レビュー可。未実行 | HQ-01 から HQ-05, COND-SLICE |

## 失敗と Inconclusive の扱い

実結果評価はしない。将来の判定規則だけを書く。
最終合否とリスク受容ではない。

| 区分 | 事実として扱う条件 | 必要な処理 |
| --- | --- | --- |
| Fail | PLAN 承認前に実装・VCS・deploy、正本変更、外部 write、削除がある | 計画作業を不合格相当として止め、人間へ戻す |
| Fail | Q-I 未採用のまま答えを採用し、案や単位を確定して実装開始する | 採否を取り消し、軸を未採用へ戻す |
| Fail | 宣言外配置、黙った上書き、取得元の取り違えが、確定済み方針の下で起きる | 配置を進めず、分岐記録と影響を残す |
| Fail | 契約必須欄または Hayate 適格が不足したまま単位・スライスを開始する | 開始を無効とし、上流の固定漏れを返す |
| Inconclusive | REQ-23 から REQ-30、Q-I-01 / Q-I-02 / Q-I-03、Q-B-01 から Q-B-05 が未確定 | Pass / Fail を付けず、該当項目を停止する |
| Inconclusive | 導入成功、チームとして使える状態、adapter 探索規則のオラクルが無い | 配置の有無だけを観測対象にし、利用可能判定をしない |
| Inconclusive | 実装が無く、観測点（主体、差分、参照識別）が設計不足 | 実行不能として上流へ戻す |

## 未被覆、実行不能、上流へ戻す不足

推測で埋めない。母集団内の未被覆である。

| ID | 未被覆または実行不能 | 影響 | 関連 |
| --- | --- | --- | --- |
| G-01 | 配布対象と非対象が未確定 | T-INST-02 の宣言集合が作れない | REQ-23, Q-B-01 |
| G-02 | 「リポジトリから直接」の単一意味が未確定 | T-INST-01 の手段オラクルが無い | REQ-24, Q-B-02 |
| G-03 | 対象リポジトリの範囲が未確定 | T-INST-06、案 C / E の適用範囲が判定不能 | REQ-25, Q-B-03 |
| G-04 | 衝突・上書き方針が未確定 | T-INST-04、U-COLLIDE が実行不能 | REQ-26, Q-B-04 |
| G-05 | 計画完了と導入成功の観測条件が未確定 | T-INST-05、U-VERIFY をゲートにできない | REQ-30, Q-B-05 |
| G-06 | 実験場ルールのコピー可否と効力が未採用 | T-INST-07 の正式判定不能 | REQ-27, Q-I-01（未採用） |
| G-07 | 書込み主体が未採用 | T-INST-03 の正規主体が無い。エージェント外部 write だけは現行禁止として停止可 | REQ-28, Q-I-02（未採用） |
| G-08 | roadmap 引用と本依頼の優先が未採用 | T-INST-08、U-SRC 以降の対象可否が判定不能 | REQ-29, Q-I-03（未採用） |
| G-09 | 全案で「チームとして使える状態」が未保証 | T-OPT-X2 は利用可能判定を被覆しない | REQ-16, QR-X3 |
| G-10 | 実装が無く、証跡の観測点が未設置 | 導入系項目はすべて実行不能 | POP-OPT, POP-UNIT |
| G-11 | スライス境界が未固定 | Hayate 向け実装項目を置けない | POP-SLICE, HQ-01 から HQ-05 |
| G-12 | 更新・再導入・アンインストールの要否が未確定 | 初回以外の経路は未被覆 | REQ-32 |
| G-13 | 期限、優先度、置き場制約が未確定 | 実行順の固定と置き場検査は未被覆 | REQ-31, REQ-33 |

母集団外の未被覆（分母に加えない）:

- プライベートリポジトリの認証、オフラインキャッシュ
- ホスト固有テンプレート機能の可否
- adapter のルート相対パス要求
- 比較理解や運用負荷の定量尺度

## 再分析が必要な範囲

次が変わったら、該当条件と項目を再分析する。
Toki は再分析要否の最終判断をしない。

- 要件の採否、とくに REQ-16 から REQ-33
- 案 A から E の成立条件を変える人間判断
- 実装単位の write 集合、隔離、実行主体
- Hayate 適格を満たすスライス契約
- 新しい品質リスク（Rin 指摘を含む）が母集団へ追加される場合
- 実行不能が解消し、分析用期待結果をゲートへ昇格させる場合

ゲート昇格は、Aira が分離、所有者、版、承認状態を人間へ戻す。
Toki は本書をゲートにしない。

## していないこと

- テスト実行、証跡生成、実結果評価
- P0 / P1 / P2 の付与
- Q-I-01 / Q-I-02 / Q-I-03 の採用
- 設計案の採否
- カバレッジ率の報告
- 正本、adapter、`tmp/PLAN.md` の変更
- VCS、実装、ネットワーク、外部送信
- リポジトリ内容の独立検証
