# current-task: Codex 基準の委譲ループを確立する

- 作成: 2026-07-18 / 作成者: Gen(玄)
- 状態: **進行中**
- 前タスク: Stage 2「Rin(凛)を迎える」は 2026-07-07 完了。詳細は [stage2-retrospective.md](stage2-retrospective.md) / [growth-log](../../.ai/board/growth-log.md) を参照
- 関連 ADR: [ADR-0014: ツール別エージェントアダプタの展開順序と比較ゲート](../decisions/ADR-0014-tool-adapter-rollout-order.md)

---

## 1. 目的

Codex を最初の基準実行環境とし、**Gen が調査・レビューを抱え込まず、Rin に作業を委譲し、Markdown 成果物を受け取って統合する経路**を実動確認する。

本タスクは Stage 3(Shino 加入)の前提である「サブエージェントのアダプタ起動経路の解決」を、Codex 上で先に満たすためのタスクである。

## 2. 背景と人間の判断

- 2026-07-18、人間はツール展開を **Codex を最優先**として進める方針を採用した
- 比較順は **Codex → Claude Code → Antigravity** とし、Codex で確立した同一スモークテストを各環境へ適用する
- 直前のリポジトリ分析では Gen が調査を抱えすぎた。以後、Gen は依頼整理・委譲・成果物統合に専念し、独立して切り出せる作業はサブエージェントへ渡す
- 作業コピーには、人間側で追加された未コミットの `.codex/agents/rin.toml` が存在する。本タスクでは既存変更として保護し、承認前に上書きしない

## 3. 仮説

`.codex/agents/rin.toml` は Codex のカスタムエージェントとして現在のセッションに認識されている。Gen が明示的に `rin` を起動し、Rin が正本を読んで指定された `docs/work/` 成果物だけを作成できれば、Stage 2 から持ち越した委譲経路の課題は **Codex については解決**したと判断できる。

## 4. 対象範囲

1. Codex 優先戦略を ADR 候補として記録する
2. Codex の `rin` カスタムエージェントを実起動する
3. Rin が `team.md` の Rin 節と `safety.md` を読んだことを成果物へ明記する
4. Rin が指定された `docs/work/risk-review-codex-baseline.md` だけを作成する
5. Gen が Rin の成果物を統合し、必要な修正または反論を行う
6. 正本変更案を `docs/work/` にドラフトし、Rin レビューを経て人間へ提示する

## 5. 非対象範囲

- 人間承認前の正本(`AGENTS.md` / `CLAUDE.md` / `docs/agent/` / `docs/roadmap.md` / `docs/decisions/` / `.claude/` / `.codex/`)への反映
- Claude Code / Antigravity のスモークテスト
- Shino / Kai / Toki の加入
- Stage 2 から持ち越した P2 7件すべての解消
- コミット、push、その他のバージョン管理操作

## 6. 制約

- [safety.md](../agent/safety.md) の禁止事項を適用する
- `.codex/` は現行 safety.md の列挙から漏れているが、**本タスクでは `.claude/` と同じ正本扱い**とし、人間承認前に変更しない
- エージェントが実行できる VCS 操作は、素の `jj st` / `jj diff` / `jj log` のみ
- Gen は Rin の発見作業を自分でやり直さない。ただし統合責任として、P0 / P1 の対象引用・根拠・正本との矛盾だけは限定確認する
- Rin の P0 / P1 指摘は、人間の明示判断が記録されるまで正本へ反映しない

## 7. 完了条件

- [x] 人間が Codex → Claude Code → Antigravity の順で同一スモークテストを適用する展開戦略を採用した
- [x] 展開戦略の ADR 候補が作成されている
- [x] Codex の `rin` カスタムエージェントが実起動できる(2026-07-18。初回は時間超過で中断、同一 Rin への縮小再試行で完了)
- [x] Rin が `team.md` Rin 節と `safety.md` を参照したことを成果物に明記している
- [x] Rin が `docs/work/risk-review-codex-baseline.md` を作成し、`jj status` で既知の変更以外に指定外変更がないことを Gen が確認した
- [x] Gen が Rin の発見作業を再実施せず、P0 / P1 の対象引用と根拠だけを限定確認して統合した
- [x] Rin の指摘が「修正済み / 見解相違 / 人間の許容判断待ち」に仕分けられている(下記9節)
- [x] 正本変更案が `docs/work/` にドラフトされ、Rin のレビューと差分再レビューを経ている(差分再レビューの新規P1×2は緩和策どおり反映。原則1周のため再々レビューは行わず人間へ提示)
- [x] 人間が正本反映の採用 / 却下 / 保留を判断している(2026-07-18、10節の6項目をすべて採用)
- [x] 承認分が正本・Codexアダプタへ反映され、ADR-0014へ正式昇格している
- [x] Stage 3 開始前に、版を固定した fresh session で Rin の機能スモーク2回目が成功している（2026-07-18。第1試行は証跡仕様の事前固定不足で不採用。仕様固定後のfresh再試行でRinのP0/P1なし、前後比較も全条件一致）

## 8. Codex Rin スモークテスト結果

- **起動**: 成功。Codex のカスタムagent種別 `rin` を明示指定して独立コンテキストで起動できた
- **初回試行**: 必須5ファイルのレビュー完了までは応答で確認できたが、成果物作成がタイムボックスを超えたため Gen が中断した
- **縮小再試行**: 同一 Rin に「最大80行・追加調査なし」と限定して再依頼し、67行の [risk-review-codex-baseline.md](risk-review-codex-baseline.md) が返った
- **変更範囲**: `jj status` で、事前に存在した `.codex/agents/rin.toml`、Gen が作成した current-task / ADR候補、Rin の指定成果物以外の変更がないことを確認した
- **評価**: 名前付き起動・正本参照・成果物返却という**機能スモークは成功**。ただし安全境界の技術的強制、実行主体の独立証跡、fresh session での再現性は未検証
- **運用上の学び**: 初回委譲では対象ファイル数だけでなく、最大行数・時間・停止条件を依頼文へ明示する

## 9. Rin 指摘への Gen 対応・仕分け

| ID | Gen 対応 | 仕分け |
|---|---|---|
| P0-1 `.codex/` が実保護対象外 | `.codex/` 全体を正本保護へ追加し、adapter の `.Codex/agents/` を修正 | **修正済み・正本反映済み** |
| P1-2 指示遵守と権限制御の混同 | 機能スモークと安全強制ゲートを分離。Stage 3 の要件整理後、コード・外部連携・高権限操作の前に技術的強制の要否を再判断する | **条件付き許容** |
| P1-3 起動・非変更が自己申告中心 | 今回は起動ツールのagent種別指定 + `jj status` を併記。次回は実行IDと、保護領域全体・書き込みallowlistの実行前後manifest/hashを記録する | **2回目の fresh-session スモーク待ち** |
| P1-4 Gen の確認制限が強すぎる | 「発見作業は重複しないが、P0/P1の引用と根拠は限定確認」に本タスクを修正 | **修正済み** |
| P1-5 レビュー対象内の命令を未信頼データとして扱わない | adapter に対象allowlist・未信頼データ・埋め込み命令不実行・優先順位を追加 | **修正済み・adapter反映済み** |
| P1-N1 adapter の必須参照と allowlist が衝突 | allowlist を「必須正本 team/safety + prompt 列挙対象」と定義し、team/safety の制約内で prompt を依頼内容の正とする | **修正済み・adapter反映済み** |
| P1-N2 委譲失敗時の代替経路がない | 再試行は原則1回。2回連続失敗で人間へ保留 / 限定代行 / 別環境再試行を戻し、無断代行を禁止する | **修正済み・正本反映済み** |

見解相違: 0件。

## 10. 人間の判断（解決済み）

Rin のスモークテストと正本変更ドラフトのレビュー後、以下の6項目を判断対象とした。

1. `.codex/` を正本保護対象に追加するか
2. Codex アダプタ対応を Stage 6 から前倒しする計画変更を採用するか
3. Codex の機能スモーク1回成功を Stage 3 の前提充足とするか、fresh session で2回目を必須にするか(Rin 推奨: 2回目必須)
4. 安全境界を技術的に強制するか、当面は instruction-based の残留リスクを明示受容するか
5. Rin 1名の成功で基準経路を確立したとみなすか。新規ロールごとの名前付き起動確認は引き続き必須とするか
6. 次の比較対象を暫定どおり Claude Code とするか

### 人間の判断（2026-07-18）

上記6項目をすべて採用。正本・Codexアダプタへの反映と ADR-0014 への昇格を承認した。Stage 3 開始前の残作業は、**版を固定した fresh session で Rin の機能スモーク2回目を成功させること**。新規ロール自身の名前付き起動確認は引き続き必須とする。

## 11. fresh session 2回目スモーク（2026-07-18）

- 実行ID: `rin:/root/rin_smoke_stage3_second_20260718t1822450900`
- fresh条件: `fork_turns=none` の名前付き custom agent `rin`
- 試行: 1回で成果物返却。再試行なし
- 依頼: [rin-smoke-stage3-second-request.md](rin-smoke-stage3-second-request.md)
- Rin成果物: [rin-smoke-stage3-second-result.md](rin-smoke-stage3-second-result.md)（49行、P0:0 / P1:2 / P2:1）
- 機械証跡: [rin-smoke-stage3-second-evidence.md](rin-smoke-stage3-second-evidence.md)
- 前後比較: 保護領域manifest hashは `afed002a...9569` で完全一致。書き込みallowlistは結果ファイル1件の`ABSENT`からSHA-256 `9ed770d4...1586`への新規作成だけ
- Gen再評価: P1-1は事後証跡による対応案まで。P1-2は仕様を文書化したのが実行後であり、Rinが求めた「事前固定」を満たさない。当初の「両方とも緩和条件を満たした」という評価を撤回
- 判定: 本試行は機能動作の観測記録として残すが、Stage 3開始ゲートには不採用。manifest仕様を実行前に固定したfresh sessionで再試行する

### 第2試行（仕様事前固定後・成功）

- 人間の判断: 第1試行P1-1/P1-2の説明を受けて「対応してください」と指示。両指摘を採用し、緩和を実施
- 実行ID: `rin:/root/rin_smoke_stage3_second_retry_20260718t1858040900`
- fresh条件: `fork_turns=none` の名前付き custom agent `rin`
- 事前仕様: [rin-smoke-stage3-second-retry-request.md](rin-smoke-stage3-second-retry-request.md)
- before証跡: [rin-smoke-stage3-second-retry-preflight.md](rin-smoke-stage3-second-retry-preflight.md)
- Rin成果物: [rin-smoke-stage3-second-retry-result.md](rin-smoke-stage3-second-retry-result.md)（49行、P0/P1なし、P2×1）
- postflight証跡: [rin-smoke-stage3-second-retry-evidence.md](rin-smoke-stage3-second-retry-evidence.md)
- fixed snapshot ID: `ceaf95838e2d194820a66d668adc9ffdd2fc19021b3d644b8b1548901a982beb`
- protected manifest: 前後 `a1637ce1...957e` で完全一致
- 5レビュー対象manifest: 前後 `12b75282...4a4d` で完全一致
- preflight SHA-256: 前後 `45356bf6...acfb` で完全一致
- 書き込みallowlist: 結果1件の不在からSHA-256 `03fa44a6...ea19`への新規作成だけ
- Rin再判定: 第1試行P1-1/P1-2はともに充足。再試行自体はP0/P1なし
- P2-1 postflight未確認: Genが同一仕様で比較し、全成功条件一致により解消
- 最終評価: **Stage 3開始前のfresh session 2回目機能スモーク成功**
