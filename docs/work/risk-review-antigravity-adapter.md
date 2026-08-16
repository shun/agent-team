# リスクレビュー: Antigravity subagent adapter

> レビュー担当: Rin（凛） / 2026-07-22
> 対象: `.agents/agents.md`、`.agents/workflows/agent-team.md`、
> `docs/work/adr-drafts/2026-07-22-antigravity-subagent-adapter.md`
> 初回判定: P0 1件、P1 2件、P2 0件
> 差分再レビュー判定: **オープン指摘なし（P0 0件、P1 0件、P2 0件）。**

## 前提

- 本レビューは文面の整合性レビューであり、Antigravity実機、model表示、
  `define_subagent` / `invoke_subagent`、tool権限、fresh contextを観測していない。
- adapter内の命令が守られることと、platformが技術的に逸脱を防ぐことは区別する。
- 正式ADRへの昇格、adapterの採用、残留リスク受容は人間の判断事項である。

## 差分再レビュー（2026-07-22、許可された1周）

Genの緩和差分を現行ファイルで再確認した。前回のP0/P1はすべて解消済みであり、
新しい指摘はない。これはAntigravity実機のpass判定ではなく、未実証値を`unknown`のまま
停止・報告するadapter契約が成立したという文面判定である。

## 初回指摘と解消確認（重大度順）

### 解消済み P0-1: 自動Git worktreeを起動前に無効化・検証するゲートがない

- **状態**: **解消済み**。

- **対象箇所**:
  - `.agents/agents.md`「Runtime contract」の「Do not use an automatically created Git worktree」
  - `.agents/workflows/agent-team.md`手順8の「Do not ask Antigravity to create a Git worktree」
  - ADR候補「判断案」の自動Git worktree不使用、および「影響と未検証」
- **失敗パターン**: `invoke_subagent`またはwrite tools有効化に伴うplatform既定動作が、
  指示文を解釈するagentより前または外側でworktreeを作る。agentがVCS commandを実行して
  いなくても、このrepositoryの「VCS操作は人間のみ」という安全境界に違反する。
- **初回根拠（緩和前）**: 文面は「使わない／依頼しない」と指示するだけで、dispatch前に自動作成設定を
  確認する項目、無効化できない場合の全role共通停止条件、実機証跡を定めていない。
  手順8の停止はRitsu/Hayateが既存fileを扱う場合に限定されるが、自動worktree発生可能性は
  roleや作業内容に依存しない。ADR自身もAntigravity実機を未実証としている。
- **要求した緩和**: 最初のsubagent定義・起動より前に、platformの自動worktree作成が無効であることを
  UIまたは公式に観測可能な設定で確認し、証跡と確認者を記録する。無効化状態を確認できない、
  または起動自体がworktreeを作り得る場合は、docs-only試運転を含めてdispatchを停止する。
- **解消根拠**: `.agents/agents.md`は全subagent定義前に親のLocal Modeと既存checkoutを
  確認し、全`invoke_subagent`で親の同一workspace継承を明示選択するよう要求した。
  `.agents/workflows/agent-team.md`手順3・7も全role共通のpreflightとし、optionまたは結果を
  起動前に確認できなければ全dispatchを停止し、確認者とworkspace pathを記録する。
  ADR候補も同じ停止条件と未実証状態を明記した。
- **人間判断要否**: **追加判断不要**。各runでpreflightをpassできなければ停止する。

### 解消済み P1-1: write toolsのBoolean制御では、task allowlistとVCS禁止を技術的に強制できない

- **状態**: **解消済み**。

- **対象箇所**:
  - `.agents/agents.md`「Runtime contract」の`enable_write_tools: true`の指定
  - 同節の「Read and write only the task contract's allowlists」
  - `.agents/workflows/agent-team.md`手順5の「Boolean write-tool flag does not technically
    enforce a per-file allowlist」と手順4〜8
- **失敗パターン**: 未信頼入力の誘導、commandの間接副作用、cache・generated file生成、
  またはtool誤用により、指定成果物以外の既存file、`.agents/`、VCS metadataへwriteする。
  成果物manifestや完了自己申告だけでは、既に発生した逸脱を防げない。
- **初回根拠（第1差分時点）**: 更新後のworkflowは、明示outputがある契約だけwrite toolsを有効化し、Boolean
  flagがper-file強制ではないことを正しく開示した。ただし「inherited project permissions」は
  repository内のtask単位path制限を証明せず、instruction遵守を技術的強制へ昇格できない。
  正本はRitsu/Hayateの既存file更新に技術的write隔離を要求する。
- **要求した緩和**: subagentごと・契約ごとにwrite toolsを必要時だけ有効化する現行記述を維持し、
  OS/platform側で明示output pathだけへ制限できる場合は適用する。技術的path制限が実証できない
  初回試運転は、衝突しない新規`docs/work/`成果物だけに限定し、直接・間接write集合と
  事後差分を独立確認する。
  Ritsu/Hayateの既存repository file更新は、正本のwrite隔離条件を満たすまで禁止を維持する。
- **解消根拠**: `.agents/agents.md`とworkflow手順6はwrite toolsをdefault falseとし、
  明示outputと親Project permissions確認後だけ個別に有効化する。Boolean flagがper-file強制では
  なく、未観測のpath・command containmentは`unknown`と記録するため、instruction-only境界を
  技術的強制と誤表示しない。Ritsu/Hayateの既存file更新には別途承認・準備済みwrite隔離を
  必須とする停止条件も維持した。
- **人間判断要否**: **追加判断不要**。path containmentは実証済みへ昇格せず、各runの
  未検証platform propertyとして報告する。

### 解消済み P1-2: fresh context・権限・model継承の能力断定が、未実証記載と矛盾する

- **状態**: **解消済み**。

- **対象箇所**:
  - ADR候補「理由」の「custom subagentはfresh contextと権限継承を提供する」
  - ADR候補「判断案」の親model継承と「影響と未検証」のmodel継承・fresh性・tool権限未実証
  - `.agents/agents.md`と`.agents/workflows/agent-team.md`のmodel継承・fresh context要求
- **失敗パターン**: adapter文面をplatform能力の証拠と誤認し、親会話や前taskの情報が混入した
  subagent、想定外toolまたは人間選択と異なるmodel tierを持つsubagentの成果物を、独立した
  専門レビューとして統合する。結果として役割分離、入力allowlist、model条件、
  No Consensus Without Dissentの信頼性が崩れる。
- **初回根拠（緩和前）**: 同じADR内で能力を断定した直後に実機未実証としており、正本はper-runで観測できない
  model、effort、fresh性、tool、networkを`unknown`とし、自己申告をplatform証跡へ昇格しない。
  `agy 1.1.5 models`での3 ID列挙は利用候補の存在を示すが、現在の親選択や子への継承は示さない。
- **要求した緩和**: ADRの理由を「提供すると想定するため、成立時に限り」に弱める。初回試運転では、
  親／別taskのcanary非露出、無効化toolの利用不能、許可toolの利用可能性を外部観測し、
  未観測項目を`unknown`としてmodel labelとともに永続成果物へ記録する。
- **解消根拠**: ADR候補はfresh context・親権限・model継承を「公式仕様上の期待」とし、
  本repositoryでのper-run実証前はすべて`unknown`と明記した。影響と未検証にもmodel継承、
  fresh性、Local Mode、同一workspace、tool権限、成果物受渡しを列挙し、成立時に限って
  実行経路を追加できるという条件付き判断へ変更した。
- **人間判断要否**: **追加判断不要**。未観測値は各runで`unknown`として報告する。

## 更新で解消した指摘

- **旧P2-1（model label判定の曖昧さ）**: `.agents/agents.md`、workflow手順2、ADR候補が
  `gemini-3.6-flash-high` / `gemini-3.6-flash-medium` / `gemini-3.6-flash-low`の3 IDへ
  判定集合を固定し、現在の`/model` IDの記録、不一致時停止、人間選択tierの維持を定めたため
  解消した。`agy 1.1.5 models`での列挙確認はmodel存在の局所証跡であり、親の現在選択、
  subagentへの継承、実modelの証跡には昇格しない。この残限界はP1-2に含める。

## 確認観点と、上記以外の結果

| 観点 | 結果 |
|---|---|
| Genがmainか | Genはsubagent定義から除外され、Shino/Kai/Toki/Rin/Ritsu/Hayateのみ固定名で定義される。文面上の役割逆転なし。 |
| 役割・成果物・停止条件 | 各summaryは正本sectionの先読みを要求し、専門判断の代行禁止を維持する。Ritsu/Hayateのrouting条件は要約されるが、正本参照により優先される。上記P1-1以外の変更なし。 |
| model継承・未観測値 | 許容IDは3値へ完全一致で固定された。現在ID記録、fallback禁止、人間選択tier維持、継承未実証時の`unknown`が整合する。 |
| tool・fresh・Markdown受渡し | write default false、per-file非強制の明記、fresh/tool/model継承のper-run `unknown`、成果物を正とする完了通知が整合する。 |
| VCS境界 | 全role共通でLocal Mode、既存checkout、同一workspace継承を起動前確認し、確認不能時は全dispatch停止となった。P0-1は解消済み。 |
| `.agents/`の正本保護 | `docs/agent/safety.md`と`docs/agent/workflow.md`は`.agents/`配下全体を保護し、`AGENTS.md`も薄いadapterとして参照する。列挙漏れは確認できない。 |

## 人間へ戻す判断

- **オープンなP0/P1/P2に対するリスク受容判断はない。**
- adapterの採用、実機pilotの開始、正式ADR昇格は、Rinの無指摘とは別の人間判断である。
- 実行時にmodel ID、Local Mode、同一workspace選択、write権限、fresh性、tool/model継承の
  いずれかを確認できない場合、adapter契約どおり停止または`unknown`報告とし、passへ丸めない。
