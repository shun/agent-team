# handoff-log

セッションごとの作業記録。新しいものを上に追記する。
形式: 日時 / 担当 / 参照した成果物 / 判断したこと / 残課題 / 次に見るべきもの
(定義変更の記録はここではなく growth-log.md に書く)

---

## 2026-07-05(Stage 1 続き)— workflow.md ドラフト、growth-log 運用開始、ループ1周目起票

- **担当**: Gen(玄・メイン会話)
- **参照した成果物**: handoff-log 先頭エントリ / AGENTS.md / docs/agent/team.md / docs/agent/safety.md / docs/work/current-task.md / docs/roadmap.md / original-memo.md セクション16
- **判断したこと**(Gen の起案。確定はすべて人間承認待ち):
  - workflow.md の対象範囲を「人間 ⇄ Gen の最小フロー」に限定(5人体制で memo セクション16 のフローに更新、roadmap Stage 4 どおり)
  - ADR ドラフトの置き場を docs/work/adr-drafts/ とし、昇格は docs/decisions/ への新規作成方式とする(設計判断のため ADR 候補を作成: docs/work/adr-drafts/2026-07-05-adr-draft-location.md)
  - 成長ループ1周目の練習台を「Gen 定義への記録運用(handoff-log の読み書き)の明文化」とする
- **今回やったこと**:
  - docs/agent/workflow.md 初版ドラフトを作成(**人間の承認待ち**。書き込み権限区分 / 正本ドラフトの出し方 / 進捗一本化 / 記録の使い分け / ADR 運用手順を含む)
  - .ai/board/growth-log.md を作成し運用開始。ループ1周目(Gen 定義改善)を「提案・試した結果」まで記入、人間の判断待ち
  - docs/work/adr-drafts/ を新設し ADR 候補1件を作成
  - current-task.md を更新(6節の進捗注記、7節の判断依頼を差し替え)
  - (同セッション追記)人間指摘により VCS 禁止の主語を「Gen」から「全エージェント」に修正(workflow.md 2節 / current-task.md 5節)
  - (同セッション追記)人間提案の作業原則5項を整理: 「なぜを残す」「仮説から調査」は workflow.md 7節に反映(承認待ち)。TDD・テスト分析の3項は時期尚早のため docs/work/pending-rules.md に条件付き保留(実装テーマ着手 or Toki 加入検討時に再提案)。growth-log に記録
- **残課題**: workflow.md ドラフトの人間承認 / growth-log 形式の確認とループ1周目の人間判断(採用なら team.md へ反映)/ 次メンバー提案(ゼロベース。ループ1周目の判断後に着手予定)/ ADR 候補一覧からのドラフト化対象の選択(人間)/ jj コミットは人間にお願いする
- **次に見るべきもの**: docs/work/current-task.md 7節(判断依頼4件)/ docs/agent/workflow.md(承認対象)/ .ai/board/growth-log.md(ループ1周目)

## 2026-07-05(構造決定・承認)— メイン会話 = Gen、safety.md 確定

- **担当**: セッションコーディネータ(Gen 構造決定前のメイン会話。次セッションからはメイン会話が Gen)
- **参照した成果物**: docs/agent/team.md / docs/agent/safety.md / AGENTS.md / docs/roadmap.md
- **判断したこと**(人間の判断):
  - **構造決定: Gen はメイン会話そのもの。サブエージェントとして起動しない**(今日サブエージェントで動かしたのは gen.md 未読み込みによる暫定措置だった)
  - `.claude/agents/gen.md` の削除を承認(ペルソナ正本は docs/agent/team.md に集約。.claude/agents/ は Gen 以外の起動用アダプタ)
  - **safety.md を承認 → 確定**(ADR 条項含む。セクション2の削除ルールの厳しさも現状のまま採用)
  - **進捗管理を current-task.md に一本化**(案A採用)。roadmap.md はチェックボックスをやめ、計画+各 Stage の状態行のみ。状態行は Stage 節目に人間承認で更新。workflow.md 初版に明文化すること
- **今回やったこと**:
  - AGENTS.md に「メインエージェント」節を追加(メイン会話 = Gen / team.md と safety.md の読み込みを MUST 化)
  - docs/agent/team.md の Gen 定義に「動作形態」を追加
  - .claude/agents/gen.md を削除、roadmap の該当記述を更新
  - safety.md のステータスを「確定(2026-07-05 人間承認)」に更新
- **ADR 候補(参考。Gen の洗い出し結果はサブエージェント報告内にあり未固定のため、把握分をここに残す)**:
  1. メイン会話 = Gen の2層構造(サブエージェント起動しない)
  2. 成長型ブートストラップ方式の採用(一括セットアップではなく一人ずつ)
  3. VCS 操作は人間のみ(Q2)
  4. memo の docs 移行は各ステージで少しずつ+凍結コピー(Q4)
  5. handoff-log(セッション記録)と growth-log(定義変更)の使い分け(Q3)
  6. 「設計判断は ADR を残す」ルール自体
  7. 進捗管理の一本化(正は current-task.md、roadmap は計画+状態行のみ)
- **残課題**: workflow.md 初版ドラフト(ADR 運用手順を含む)/ growth-log 作成と成長ループ1周目 / 次メンバー提案(ゼロベース)/ ADR 候補のドラフト化対象の選択(人間)
- **次に見るべきもの**: この一つ下のエントリの残課題 / docs/work/current-task.md 7節

## 2026-07-05(追伸対応)— Q3/Q4 確定、ADR ルール追加

- **担当**: Gen(玄)
- **参照した成果物**: docs/work/current-task.md / docs/agent/safety.md(ドラフト)
- **判断したこと**(人間の判断。コーディネータ経由で伝達):
  - Q3 / Q4 を暫定から**確定**に格上げ
  - 新ルール追加: 「設計判断が必要なことは ADR を残す」。エージェントはドラフト(候補)まで、正式昇格は人間承認
- **今回やったこと**:
  - current-task.md を更新(Q3/Q4 確定化、追加ルールを 5 節・8 節に記載、非対象範囲の ADR 記述を修正)
  - safety.md ドラフトに反映: 3 節「禁止する振る舞い」に「ADR 候補を残さずに設計判断を進める」を追加、4 節に「ADR 候補の作成は可(昇格は人間承認)」を追加
  - 記載先の判断: 境界 = safety.md / 運用手順(いつ・どの粒度・どこに置くか)= workflow.md 初版(次作業)に含める
  - 既存の設計判断からの ADR 候補を洗い出し(一覧は Gen の報告に記載。ドラフト作成は人間の指示待ち)
- **残課題**: 下記エントリの残課題に同じ + ADR 候補一覧からのドラフト化対象の選択(人間)
- **次に見るべきもの**: docs/agent/safety.md(承認対象。ADR 条項を含む)/ Gen の報告(ADR 候補一覧)

## 2026-07-05 — Stage 1 着手(Q1〜Q6 反映、safety.md ドラフト作成)

- **担当**: Gen(玄)
- **参照した成果物**: docs/work/current-task.md / docs/roadmap.md / docs/agent/team.md / tmp/memo.md セクション20
- **判断したこと**(人間の判断。コーディネータ経由で伝達):
  - Q1 確定: docs/work/ は Gen が承認なしで作成・更新可
  - Q2 確定: jj 等バージョン管理操作は常に人間。Gen は一切実行しない
  - Q3 暫定: handoff-log は Stage 1 から開始(セッション記録用)。growth-log は定義変更専用
  - Q4 暫定: memo の docs/ 整理は一括でやらず各ステージで書き足す。tmp/memo.md は docs/notes/original-memo.md に凍結コピー
  - Q5 確定: safety.md にリポジトリ固有の禁止事項を追加可
  - Q6 確定: 次メンバー提案はゼロベースで検討
  - 作業順序(safety → workflow → growth-log → Gen 定義改善 → 次メンバー提案): 採用
- **今回やったこと**:
  - docs/work/current-task.md を更新(Q1〜Q6 の回答反映、状態を「進行中」に)
  - docs/notes/original-memo.md を作成(tmp/memo.md の凍結コピー + 冒頭注記)
  - docs/agent/safety.md 初版ドラフトを作成(**人間の承認待ち**)
  - 本ファイル(handoff-log.md)の運用開始
- **残課題**:
  - safety.md ドラフトの人間承認(承認まで確定させない)
  - docs/agent/workflow.md 初版ドラフト(人間 ⇄ Gen の最小フロー。Q1 の明文化を含む)
  - .ai/board/growth-log.md の作成と成長ループ1周目(練習台: Gen 定義の不足 — current-task.md 8 節で見つかった handoff-log 不整合など)
  - 次メンバー提案(ゼロベース)
  - jj コミットは人間にお願いする(Gen は実行しない)
- **次に見るべきもの**: docs/work/current-task.md(7 節「人間が求めている判断」)/ docs/agent/safety.md(承認対象ドラフト)
