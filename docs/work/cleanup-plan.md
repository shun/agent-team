# 整理プラン: docs/work/ の片付け

- 作成: 2026-07-06 / 起案: Gen(玄)/ 状態: **ドラフト(Rin レビュー前 → 人間承認前)**
- 目的: 完了ドラフトの整理と、判断待ち項目の棚卸し(忘れる前に片付ける)
- 方針: 削除・移動は safety 2節により提案制。**既定はアーカイブ(`docs/work/archive/` へ移動)を推奨** — 記録(なぜそう決めたか)を残しつつ現役ディレクトリを軽くできる。jj 履歴でも復元可

## レビュー観点(カテゴリ別)

- **完了ドラフト**: その草稿の "why" が正本 docs / growth-log / ADR に保存済みか。保存済み → 整理してよい。唯一の記録 → 残す
- **ADR 候補**: 記録した判断は今も有効か / 昇格の価値があるか / 候補どうしの矛盾・重複
- **P2 指摘**: 今も妥当か / 今やる価値(優先度)

---

## A. 完了ドラフト(承認・反映済み)→ 整理対象(推奨: アーカイブ)

| ファイル | 内容(why)の保存先 | 推奨 |
|---|---|---|
| next-member-proposal.md | ADR候補 second-member-rin + growth-log(Rin 追加の記録) | アーカイブ |
| rin-definition-draft.md | team.md(Rin 定義の本体)+ growth-log | アーカイブ |
| base-fix-draft.md | 4正本 + growth-log + ADR候補3件(C/D/E) | アーカイブ |
| workflow-diagram-draft.md | workflow.md(図本体)+ growth-log(P1-6 を止めた記録) | アーカイブ |
| jj-readonly-draft.md | 4正本 + growth-log(safety 初緩和の前例) | アーカイブ |

→ Rin への主眼: 上記「保存先」が本当に十分か(=各ファイルをアーカイブ/削除して**失う情報がないか**)。

## B. まだ開いている / 現役 → 残す

| ファイル | 理由 |
|---|---|
| risk-review.md | **P2 7件が未判断**(唯一の記録)。C-2 の決着後に整理対象へ |
| risk-review-request.md | 上とペア。risk-review 整理時に一緒に |
| current-task.md | 現役の進捗正本 |
| pending-rules.md | 条件付き保留(コードを書くテーマ着手時に再検討。生きている) |
| cleanup-plan.md(本ファイル) | 整理作業そのものの記録。完了後に自身も A 扱い |

## C. 判断が必要な持ち越し(整理とは別トラック。今回やるか後回しか選べる)

- **C-1: ADR 候補11件の昇格** — `docs/decisions/` へ昇格するか候補のまま残すか(人間判断。昇格は正本追加=要 Rin レビュー + 承認)。foundational な政策系(main-agent-is-gen / growth-bootstrap / vcs-human-only / log-separation / progress-single-source / adr-required)と、今セッション由来(second-member-rin / rin-review-scope / p0-p1-explicit-judgment / no-risk-is-valid-output)に分かれる
- **C-2: risk-review の P2 7件** — 対応 / 却下 / 保留(人間判断)

## 段取り

1. (完了)Gen がこのプラン作成 + current-task 状態行を実態に同期
2. Rin がこのプランをレビュー(観点: A の「保存済み」判定が正しいか=消して失うものがないか / B・C の振り分けは妥当か / アーカイブ方式そのもののリスク)
3. 人間が承認・決定(アーカイブ or 削除 / C-1・C-2 を今やるか後回しか)
4. 承認後: Gen が A をアーカイブ移動、C は選択に応じて別途着手

## 人間に決めてほしいこと

1. **アーカイブ or 削除**(推奨: アーカイブ = `docs/work/archive/` へ移動)
2. **今回のスコープ**: A の整理だけ先にやるか / C-1(ADR)・C-2(P2)も続けて片付けるか

---

## Rin レビュー(2026-07-06)

- レビュー対象: 本整理プラン(A の保存先十分性 / B・C の振り分け / アーカイブ方式のリスク)
- 突き合わせ: A の5ドラフト各本体と、その保存先とされる team.md / workflow.md / growth-log / ADR 候補を照合。参照リンクは repo 全体を grep で洗った(jj は未実行、grep/Read で完結)

### 結論

**P0: 0 / P1: 1 / P2: 3**。A の「消して失う情報」は各ドラフトの why 本体としては**なし**(保存先は十分)。ただし**アーカイブ方式そのものに P1 の参照断リスク**がある(正本 workflow.md と growth-log が、移動対象のパスを「経緯の全記録」として名指ししている)。これは A の判定とは別軸の、方式(c)の穴。

### 主眼 A の検証(1ドラフトずつ、失う情報の有無)

- **next-member-proposal.md → 十分**。候補比較(Shino/Kai/Toki/誰も迎えない を含むゼロベース)・cons3件と手当は ADR `second-member-rin`(背景でゼロベース検討に言及)と growth-log(2026-07-05 Rin 定義エントリの背景)に要点が残る。厳密には「候補比較の表そのもの」は草稿にしか残らないが、これは**採用に至らなかった選択肢の検討過程**であり、失っても判断の再構成に支障はない(P2 未満、指摘とせず所見)。
- **rin-definition-draft.md → 十分**。定義本体は team.md Rin 節に一字一句反映済み。C 節の論点6件(セキュリティ守備範囲・P2 の3段階化・見る観点の追加 等)のうち、判断に残すべきもの(セキュリティ境界)は growth-log と team.md 本文に、論点1〜5の設計判断過程は失っても実害小。
- **base-fix-draft.md → 十分(ただし下記 P2-2 の注意)**。10変更の diff は正本4ファイルに反映済み、各変更の Why は risk-review.md の該当項目が正(ドラフト5行目が明言)。**このドラフト単体には固有 why はなく、risk-review.md への転送でできている** → base-fix をアーカイブしても、risk-review.md が現役(B で残置)なら why は追える。**依存関係**: base-fix の why は risk-review.md に依存するため、両者の相対リンク(base-fix→risk-review、risk-review→base-fix 多数)が片方の移動で切れる(P1-1 の一部)。
- **workflow-diagram-draft.md → 十分だが要注意**。図本体は workflow.md 1節、P1-6(mermaid ASCII 括弧で描画不能)を止めた経緯は growth-log(2026-07-05 エントリ)に要約済み。**ただし workflow.md 44行目が「経緯の全記録は docs/work/workflow-diagram-draft.md」と正本から名指し**している → 移動でこの参照が指す先が変わる(P1-1 の中核)。
- **jj-readonly-draft.md → 十分だが要注意**。文言は4正本、初緩和の経緯・塞いだ穴(P1-1〜P2-6)は growth-log(2026-07-06 エントリ)に要約済み。**growth-log 15行目が「経緯の全記録: docs/work/jj-readonly-draft.md」と名指し** → 同上(P1-1)。

**A の主眼への回答**: 「これは草稿にしかない」= why 本体としては該当なし(5件すべて保存先が十分)。したがって**アーカイブ/削除で判断の why を失うことはない**。ただし「削除」を選ぶと下記 P1-1 の名指し参照は復元不能な断裂になる(アーカイブなら移動先へ追える)。

### P1 指摘

- **P1-1: アーカイブ移動で、正本 docs と growth-log 内の「経緯の全記録」名指しリンクが参照断を起こす**(対象: 方式(c) = `docs/work/archive/` への移動)。実在する名指し(grep 確認済み):
  - `docs/agent/workflow.md:44` →「経緯は docs/work/workflow-diagram-draft.md」(**正本からの参照**)
  - `.ai/board/growth-log.md:15` →「経緯の全記録: docs/work/jj-readonly-draft.md」
  - `.ai/board/growth-log.md:23` →「経緯の全記録: docs/work/workflow-diagram-draft.md」
  - 加えて current-task.md・risk-review.md・ADR `second-member-rin`・handoff-log 多数が5ファイルを相対リンク/パス言及。**特に正本 workflow.md からの参照**は、正本が「今は存在しないパス」を指す状態を生み、safety の思想(記録の追跡可能性)に反する。**削除を選んだ場合は完全な参照断**。緩和策: (1) アーカイブを選び、移動と同一の承認・反映で上記3つの名指しパスを `docs/work/archive/…` に更新する(正本 workflow.md の更新は要人間承認 = このプランの承認範囲に含める必要がある)。(2) または「経緯の全記録」を名指しされているファイル(workflow-diagram-draft / jj-readonly-draft)は**現役に残す**(B へ回す)。名指しは「そのファイルが一次資料」の宣言なので、一次資料を動かすなら参照元も直すのが筋。

### P2 指摘

- **P2-2: base-fix-draft と risk-review の相互依存を崩す順序で片付けると、why チェーンが切れる**(対象: A の base-fix-draft と B の risk-review の扱いの分離)。base-fix の why は risk-review.md に転送されており(ドラフト5行目)、risk-review は B で「P2 未判断だから残す」。今は整合するが、将来 C-2 決着後に risk-review をアーカイブする際、base-fix が先にアーカイブ済みだと「反映済みドラフトの why が、別のアーカイブファイルにしかない」二段の追跡になる。緩和策: base-fix と risk-review は**同一タイミングで整理**する(依存ペアとして B か A に揃える)。または base-fix アーカイブ時に「why は risk-review.md(同 archive)」とパスを更新。
- **P2-3: 「B: risk-review を P2 未判断だから残す」の妥当性 — 妥当。ただし risk-review-request.md とのペア扱いに非対称**(対象: B 表 の risk-review.md / risk-review-request.md)。P2 7件が唯一の記録である以上、判断が着くまで現役に残す判断は正しい(A に回すべきではない)。逆に A→B の誤振り分けもなし。ただし risk-review-request.md は「レビュー依頼」であり P2 判断の記録は持たない。C-2 決着後に risk-review を整理するとき request も一緒に、という B の注記は妥当。指摘ではなく確認: request 側に固有の why はない(依頼文のみ)ので、request は risk-review より先にアーカイブしても情報損失はない。
- **P2-4: 削除 vs アーカイブの選択肢に「削除」が残っているが、本プランの情報は削除に耐えない**(対象: 「人間に決めてほしいこと」1)。P1-1 のとおり正本・growth-log から名指しされる一次資料が含まれるため、**削除は参照断を確定させる**(jj 履歴で復元可でも、リンクは切れたまま)。アーカイブ一択に絞るか、「削除」を選ぶなら名指し参照の除去/付け替えを必須条件として明記すべき。プランは既にアーカイブ推奨だが、選択肢として削除を対等に並べている点が危うい。

### 検討した観点一覧(指摘なしを含む)

1. A 各ドラフトの why 本体の保存先十分性(1件ずつ照合) → 5件すべて十分(P1/P2 なし。所見のみ)
2. 草稿にしか残らない固有情報(捨てた選択肢・論点の検討過程) → next-member の候補比較表・各ドラフトの C 節論点。いずれも「採用に至らなかった検討過程」で判断の再構成に不要 → 指摘とせず
3. B・C の振り分けの妥当性(A⇄B の誤り、risk-review 残置の是非) → 誤振り分けなし。risk-review 残置は妥当(P2-3 で確認)
4. アーカイブ方式の参照断(相対リンク・正本からの名指し) → P1-1(正本 workflow.md + growth-log の名指し)
5. 削除 vs アーカイブ → P2-4(削除は情報特性に不適合)
6. 依存ペアの整理順序 → P2-2(base-fix ⇄ risk-review)
7. archive 先自体のリスク(docs/work/archive/ が新設ディレクトリで、状態行・目次がないと「これは何の墓場か」が失われる) → 所見: archive/ に README か、各ファイル冒頭の状態行が「アーカイブ済み(反映先)」を示せば足りる。現状ドラフトに archive/ の中の扱いの定めがない(軽微、P2 未満)
8. safety 整合(移動は提案制) → プランは提案制を守っており整合。ただし P1-1 の「正本 workflow.md のパス更新」は正本変更なので、このプランの承認に**正本1行の変更承認が含まれる**ことを人間に明示すべき(P1-1 緩和策(1) の含意)

### 人間に許容判断を求めるもの

- **P1-1 の方針選択**: (方式1)アーカイブ + 正本 workflow.md/growth-log の名指しパスを同時更新(正本変更の承認が要る)か、(方式2)名指しされる2ファイル(workflow-diagram-draft / jj-readonly-draft)は現役据え置き(B へ)、か。**どちらでも情報は失われない**が、正本を触るか触らないかの判断。
- **削除を選択肢に残すか**(P2-4): アーカイブ一択にするか。

## Gen 対応(2026-07-06)— 仕分けと方針見直し

Rin の指摘を受け、方針を見直した。主眼 A(why の保存先)は5件とも十分だが、Rin の P1-1 で「移動という方式」に参照断リスクが判明したため、**推奨を「物理移動」から「インデックス優先」に変える**。

- **P2-4(採用)**: 「削除」は選択肢から外す。正本・growth-log から名指しされる一次資料を含むため、削除は参照断を確定させる。**アーカイブ一択**(それも下記のとおり慎重に)
- **P2-2(採用)**: base-fix-draft は risk-review と依存ペア。**A から B へ移す**(risk-review の P2 決着まで一緒に据え置き)
- **P1-1(方針転換)**: 移動は正本 workflow.md:44・growth-log:15/23 等の名指しパスを壊す。これを避けるため、**まず物理移動をせず、docs/work/README.md(状態インデックス)を新設**して「何が・どの状態か」を一覧化する案を第一候補にする(参照断ゼロ、clarity は得られる)

### 見直し後の選択肢(人間へ)

- **案A(推奨・軽量): インデックスのみ**。docs/work/README.md に全ファイルの状態表を置く。物理移動なし=参照断ゼロ。完了ドラフトは各自の状態行(承認・反映済み)で既に自己ラベル済み。C-1/C-2 決着後に物理アーカイブを再検討
- **案B(フル物理アーカイブ): archive + 参照修正**。next-member / rin-definition / workflow-diagram / jj-readonly を docs/work/archive/ へ移動し、名指し参照(**正本 workflow.md:44 の1行**+ growth-log:15/23 + current-task/ADR/handoff の該当箇所)を同時に付け替える。docs/work は最小になるが、正本1行の変更承認を含み、churn が大きい。base-fix は B 据え置き

### 更新後の分類(案A/B 共通)
- A(整理対象): next-member-proposal / rin-definition-draft / workflow-diagram-draft / jj-readonly-draft
- B(残す): risk-review / risk-review-request / **base-fix-draft(risk-review とペア)** / current-task / pending-rules / cleanup-plan / (案A なら)README

## Gen 対応2(2026-07-06)— 人間の方針「削除+昇格+参照修正」で組み直し

人間の指示: 不要なものは削除 / 昇格すべき ADR は昇格 / 参照は修正。案A(インデックスのみ)から転換。「参照も直す」なら Rin の P1-1(参照断)は解消するので削除は clean になる。以下を提案する(削除・正本変更は実行前に人間の確認 + 正本部分は Rin レビューを通す)。

### ① 削除(完了ドラフト。why は保存先にあり、詳細レビュー履歴は jj 履歴に残る)

- next-member-proposal.md(→ 昇格後の ADR second-member-rin + growth-log)
- rin-definition-draft.md(→ team.md 本体 + growth-log)
- base-fix-draft.md(→ risk-review.md〔残す〕+ 昇格後の ADR C/D/E)
- workflow-diagram-draft.md(→ workflow.md 図本体 + growth-log)
- jj-readonly-draft.md(→ 4正本 + growth-log)
- risk-review-request.md(依頼文のみ、固有 why なし)
- ※ **残す**: risk-review.md(P2 7件が未判断)/ current-task / pending-rules / cleanup-plan
- ※ 留意: workflow-diagram・jj-readonly の**詳細レビュー履歴**(Rin の全指摘・P1-6 を止めた過程)は削除で jj 履歴のみになる。判断の why は growth-log 要約で足りるが、履歴の粒度は落ちる

### ② ADR 昇格(候補 → docs/decisions/。ADR-0002 以降を採番)

Gen 推奨(11件中10件を昇格、1件は候補据え置き):

- **昇格推奨(10)**: main-agent-is-gen / growth-bootstrap / vcs-human-only / adr-required-for-design-decisions / progress-single-source / log-separation / second-member-rin / rin-review-scope / p0-p1-explicit-judgment / no-risk-is-valid-output
- **候補据え置き(1)**: memo-migration-incremental(Q4 の移行方式。過渡的で、standing policy というより経緯。昇格の価値が相対的に低い)
- 昇格した候補ドラフトは「採用・昇格済み(→ ADR-NNNN)」に更新して削除せず残置(ADR-0001 の前例と同じ)

### ③ 参照修正(削除・昇格に伴う付け替え)

- 正本 `workflow.md:44`「経緯は workflow-diagram-draft.md」→ 「経緯は growth-log(2026-07-05)/ jj 履歴」(**正本変更=要承認**)
- `growth-log:15`「経緯の全記録: jj-readonly-draft.md」→ 「経緯: 本エントリ + jj 履歴」
- `growth-log:23`「経緯の全記録: workflow-diagram-draft.md」→ 同上
- ADR second-member-rin 内の next-member-proposal への言及 → 昇格後の自ファイルで完結させる/ jj 履歴参照に
- handoff-log の過去エントリ内の言及 → **歴史記録として原則そのまま**(その時点の事実の記録。追跡は jj 履歴)。ただしリンク切れが読者を惑わすなら注記
- current-task.md の各リンク → 削除対象を指すものを除去/修正

### 実行手順(提案)

1. 人間が①の削除リストと②の昇格リストを確認(削除は提案制、昇格は正本追加=要承認)
2. Gen が②の ADR 正式版と③の参照修正を**ドラフト**化 → Rin レビュー(観点: 参照修正の網羅性=削除後に dangling が残らないか / 昇格候補に陳腐化・矛盾・重複がないか)
3. 人間の最終承認
4. Gen が実行: ADR 昇格(docs/decisions/ 作成)→ 参照修正 → 最後に①削除
5. growth-log・handoff-log に整理の記録

## Gen 対応3(2026-07-06)— 「昇格して残す」を正とする(archive 廃止)

人間の問い「昇格して残せないのか / 昇格せずアーカイブする理由は?」を受け、切り分けを是正:
- **残す価値のある決定 → ADR 昇格(永続)+ ドラフト削除**。archive(塩漬け移動)は使わない
- jj-readonly の決定は ADR 未作成だった(作り忘れ)。**新規 ADR として起こす**(safety 初緩和・緩和の前例フォーマット。safety.md「設計判断は ADR」に該当)
- workflow-diagram(mermaid 追加)は決定が薄く、ワークフロー本体の判断は C/D/E の ADR で既出 → 新規 ADR 不要、ドラフト削除。growth-log + workflow.md で足りる(希望あれば小 ADR 可)

### 更新後の ② ADR 昇格(= 11件)
- 既存候補10件(前掲)+ **新規1件: jj-readonly relaxation の ADR**(safety 初緩和)
- memo-migration-incremental は据え置き(過渡的。ただし人間が希望すれば昇格可)

### ③ 参照修正の変化(昇格でむしろ clean に)
- `growth-log:15`(jj-readonly)→ **新規 ADR を指すよう付け替え**(softening ではなく正式参照。より良い)
- `workflow.md:44`・`growth-log:23`(workflow-diagram)→ 図本体は workflow.md にあるので「経緯は growth-log」に。新規 ADR なし

## Gen 対応4(2026-07-06)— 昇格リスト確定(12件)

memo-migration-incremental の据え置き理由(過渡的)は不適切と判断し撤回。Q4 決定は現役方針(original-memo.md は現在も参照)であり、Q2/Q3 を昇格して Q4 だけ据え置くのは不整合。→ **既存候補11件すべて + 新規 jj-readonly = 12件を昇格**。

### 確定: ADR 採番(案。ADR-0001 は昇格済み)
- ADR-0002 main-agent-is-gen / 0003 growth-bootstrap / 0004 vcs-human-only / 0005 log-separation / 0006 memo-migration-incremental / 0007 progress-single-source / 0008 adr-required-for-design-decisions / 0009 second-member-rin / 0010 rin-review-scope / 0011 p0-p1-explicit-judgment / 0012 no-risk-is-valid-output / 0013 jj-readonly-relaxation(新規起案)

### 削除(①)6件 — 変わらず。ただし jj-readonly は ADR-0013 昇格後に削除

### 参照修正(③)— 削除・昇格後の付け替え(要 Rin による網羅チェック)
- `.ai/board/growth-log.md:15`(jj-readonly draft)→ **ADR-0013 を指す**
- `.ai/board/growth-log.md:23`(workflow-diagram draft)→ growth-log 当該エントリ内で完結(新規 ADR なし)
- 正本 `docs/agent/workflow.md:44`(workflow-diagram draft)→「経緯は growth-log(2026-07-05)」(**正本変更=要承認**)
- `docs/work/risk-review.md` の base-fix-draft への参照 → ADR-0010/0011/0012 + growth-log に付け替え(risk-review は残るので dangling 化させない)
- ADR-0009(second-member-rin)内の next-member-proposal 言及 → 自己完結 or jj 履歴参照に
- `docs/work/current-task.md` の削除対象ドラフトへのリンク → 除去/修正
- handoff-log の過去エントリ → 歴史記録として原則そのまま(追跡は jj 履歴)

### 次: この確定プランを Rin が実行前レビュー → 人間承認 → 実行

---

## Rin 実行前レビュー(2026-07-06)

- レビュー対象: Gen 対応2〜4 の確定プラン(削除6 / ADR 昇格12 / 参照修正)。これは実行前の最後の砦。
- 方法: repo 全体を grep で洗い、削除6ファイルへの全参照と ADR ドラフト間リンクを実地に列挙(jj 未実行、grep/Read で完結)。ADR 12候補は本体を通読。

### 結論

**P0: 0 / P1: 2 / P2: 2**。削除・昇格の大枠は妥当だが、**参照修正(③)に取りこぼしが2件**あり、うち1件は「残すファイルの中に dangling リンクが生まれる」ため実行前に潰す必要がある(P1-3)。昇格12件のうち **ADR-0004 と新規 ADR-0013 が正面から矛盾**する状態で両方昇格しようとしている(P1-4)。ここを直せば実行してよい。

### 観点(b)最重要 — 削除後に dangling が残らないか(全参照を実地列挙)

grep で削除6ファイルへの参照を全て拾い、③の付け替えリストと突き合わせた。**③が拾えていない参照が2件**:

- **P1-3(取りこぼし・最重要): `docs/work/risk-review.md:3` が削除対象 `risk-review-request.md` を markdown リンクで指しており、risk-review.md は「残す」ファイル**(対象: risk-review.md 3行目 `依頼: [risk-review-request.md](risk-review-request.md)`)。③は risk-review 内の base-fix 参照(190行目)だけを挙げ、**この request へのリンクを挙げていない**。request を削除すると、**生き残るファイルの中にリンク切れが1件確定で残る**(まさに観点(b)が防ぎたい状態)。緩和策: ③に1行追加 —「risk-review.md:3 の `[risk-review-request.md](...)` → リンクを外し `依頼: Gen(risk-review-request、削除済み・jj 履歴)` 等の非リンク表記に」。
- **P1-4(昇格の矛盾・陳腐化): ADR-0004(vcs-human-only)と新規 ADR-0013(jj-readonly-relaxation)が正面衝突したまま両方昇格しようとしている**(対象: ②昇格リストの ADR-0004 と ADR-0013)。ADR-0004 ドラフトは**捨てた選択肢に「(b) 読み取り系 jj コマンドのみ許可 …『一切行わない』に倒して単純化した」と明記**し、決定も「一切実行しない」。一方 ADR-0013 はまさにその読み取り系3コマンドを許可する初緩和。**両方を無印で docs/decisions/ に昇格すると、正本 ADR が2件、真逆の決定を主張する**状態になる(観点(a)の「相互矛盾」に該当)。ADR-0004 は当時は正しく、ADR-0013 が後から一部を覆した、が事実。緩和策: 昇格時に ADR-0004 に「一部改訂: 読み取り系3コマンドは ADR-0013 で緩和(2026-07-06)」の追記行を入れ、ADR-0013 側にも「ADR-0004 の (b) の再評価」と明記して**改訂関係を双方向に張る**。これは③の参照修正リストにも、②の昇格手順にも現れていない → 追加が要る。

### 観点(a) — 昇格12件の妥当性(各候補を通読)

- **陳腐化・矛盾**: ADR-0004 のみ問題(→ P1-4)。他11件は現正本と整合し、その後の変更で覆っていない。
- **重複**: ADR-0007(progress-single-source)と ADR-0003(growth-bootstrap)は隣接するが観点が別(進捗一本化 vs 段階導入)で重複ではない。ADR-0010(rin-review-scope)/0011(p0-p1)/0012(no-risk)は同じ Rin レビュー由来だが各々独立の決定で、粒度「1判断=1ファイル」(workflow.md 6節)に合致。重複なし。
- **memo-migration(ADR-0006)を据え置き→昇格に変えた判断(Gen 対応4)= 妥当**。Q2/Q3(vcs / log-separation)を昇格して Q4 だけ据え置くのは不整合、という理由は筋が通る。original-memo.md は現役参照で決定は生きている。**ただし下記 P2-5 の内部リンク修正が伴う**。
- **昇格に値しないほど軽微なもの**: なし。12件いずれも「後から why を問われうる standing policy」で ADR 基準を満たす。workflow-diagram を新規 ADR にしない判断(C/D/E で既出)も妥当。

### 観点(c) — 新規 ADR-0013 は jj-readonly-draft.md の内容で足りるか

- **足りる。ただし2点の補足が要る**。jj-readonly-draft には 背景(P1-4 の未コミット差分確認)/ 決定(3コマンド許可・列挙制)/ 理由 / 塞いだ穴(P1-1〜P2-6)/ 前例フォーマットが揃い、ADR の骨格(背景・決定・理由・捨てた選択肢・影響)を満たせる素材がある。補足すべきは: (1) **捨てた選択肢**を明記(性質ベース許可=拡大解釈余地 / `--ignore-working-copy` 常時義務=用途と両立せず。draft の設計意図・P1 群から再構成できる)。(2) **P1-4 との改訂関係**(上記)。→ これらを載せれば ADR として過不足なし。draft を「そのままコピー」ではなく ADR 体裁(捨てた選択肢の節)に再構成する必要がある点だけ注意。

### P2 指摘

- **P2-5(昇格の内部リンク取りこぼし): ADR-0006(memo-migration)ドラフトは本文に `[2026-07-05-growth-bootstrap.md](2026-07-05-growth-bootstrap.md)` という ADR ドラフト間の相対リンクを持つ**(対象: memo-migration ドラフト7行目)。docs/decisions/ へ昇格すると、このリンクは docs/work/adr-drafts/ を指したまま(=別ディレクトリの、いずれ整理対象になりうるドラフトへの参照)になる。昇格後は **`ADR-0003`(growth-bootstrap の昇格先)を指すよう書き換える**べき。③にも②手順にも「ADR 間の相互リンクの採番付け替え」が無い。他の11ドラフトにドラフト間リンクは無い(grep 済み。これ1件のみ)。緩和策: 昇格手順に「ドラフト内の他ドラフトへの相対リンクは昇格後の ADR-NNNN 参照に置換」を1行追加。
- **P2-6(handoff-log を原則そのままにする判断の確認): ③は handoff-log の過去言及を「歴史記録として原則そのまま」とする**(対象: 193行目)。方針は妥当(その時点の事実の記録で、追跡は jj 履歴)。ただし handoff-log には削除6ファイルへの markdown リンク形式ではなくファイル名プレーン表記が多く(grep 上 `docs/work/xxx.md` の記述はあるがリンク構文 `](...)` は少)、リンク切れというより「存在しないファイルへの言及」になる。読者(人間)が辿ろうとして無い、という軽い混乱のみ。指摘ではなく確認: この方針でよいなら、handoff-log 冒頭か整理エントリに「2026-07-06 に docs/work の完了ドラフト6件を削除(ADR 昇格・jj 履歴に移行)」と1行残すと、過去言及の宛先が読者に分かる。

### 検討した観点一覧(指摘なしを含む)

1. 削除6ファイルへの全参照の実地列挙(観点b) → ③の付け替えで拾えているか全件照合。取りこぼし2件(P1-3 risk-review:3、P2-5 ADR 間リンク)。正本 workflow.md:44・growth-log:15/23・current-task 各行・ADR-0009 の next-member 言及・risk-review:18〜68 の base-fix 参照は③でカバー済み
2. 昇格12候補の陳腐化・覆り → ADR-0004 のみ(P1-4)、他は現正本と整合
3. 昇格候補の相互矛盾 → ADR-0004 ⇄ ADR-0013(P1-4)
4. 昇格候補の重複 → なし(0007/0003、0010/0011/0012 とも独立)
5. 昇格に値しない軽微さ → なし(12件とも基準充足)
6. memo-migration 据え置き撤回の妥当性 → 妥当(整合性の観点で正しい)。内部リンクのみ P2-5
7. ADR-0013 の過不足(観点c) → 骨格は足りる。捨てた選択肢の追記 + P1-4 改訂関係が要る
8. 削除で失う情報(前回 A の再確認) → why 本体は保存先で足りる。詳細レビュー履歴(Rin 全指摘)は jj 履歴のみになる = ①の留意書き(135行目)どおり許容。追加指摘なし
9. 実行順序(手順4: ADR 昇格 → 参照修正 → 削除) → 順序は正しい(先に受け皿を作り、参照を向け替えてから消す)。P1-3/P1-4/P2-5 を「参照修正・昇格」の段で吸収すれば削除段で dangling ゼロになる
10. safety 整合 → 削除は提案制、正本変更(workflow.md:44・ADR 昇格)は人間承認前提で、③・手順が守っている

### 人間に許容判断を求めるもの

- **P1-4 の改訂表現**: ADR-0004 を「一部改訂(ADR-0013 参照)」の追記で残すか、より強く「部分的に supersede」と書くか(ADR の慣行上どちらもあり。決定=正本の言葉遣いなので人間に委ねる)。
- **①の詳細レビュー履歴の喪失**(135行目の留意): workflow-diagram / jj-readonly の Rin 全指摘の粒度が jj 履歴のみになることの許容(前回 A から継続、削除方針で現実化)。

### 実行可否

**P1-3(risk-review:3 のリンク切れ)と P1-4(ADR-0004⇄0013 矛盾)を参照修正・昇格の段で吸収すれば、削除実行後に dangling・矛盾ゼロにできる**。P2-5 も同段で拾うのが安い。これらを③・②手順に反映してからの人間承認を推奨。差分再レビューは原則1周のため、上記反映後の再確認は grep 再実行(削除6基名で dangling ゼロ)で機械判定可。

## 実行結果(2026-07-06)— 完了

human 決定(削除4 / 昇格12 / 部分supersede)に基づき実行:
- **ADR 昇格12件**: ADR-0002〜0012(候補11件、元候補は「採用・昇格済み」に更新して残置)+ 新規 ADR-0013(jj 緩和。ADR-0004 を部分 supersede)
- **削除4件**: next-member-proposal / rin-definition-draft / workflow-diagram-draft / jj-readonly-draft
- **据え置き**: risk-review + risk-review-request + base-fix-draft(P2 決着までクラスタで保持)
- **参照修正**: workflow.md:44(正本)/ growth-log:15,23 / current-task / risk-review-request
- **検証**: 削除後 grep で dangling マークダウンリンク ゼロ・「経緯の全記録: <削除ファイル>」の実リンク ゼロを確認(残るのは本プラン内の引用のみ)
- **記録**: growth-log / handoff-log に追記
- **未実施(human)**: jj コミット。※adr-drafts/ の昇格済み候補12件は削除済み(2026-07-06。空dirは今後の ADR ドラフト置き場として保持)
