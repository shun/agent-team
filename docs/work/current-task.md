# current-task: Stage R — Ritsu実装・複合実行担当の加入準備

- 更新: 2026-07-20 / 更新者: Gen（玄）
- 状態: **正本・Codex adapter反映済み / fresh session起動待ち**
- 直前の完了: Stage 4 **完了（条件付き）**
- 一時保留: Stage 5 **未着手**
- 次の判断者: fresh sessionでのGen、起動結果確認後の人間

本書はRitsuの成長ループを進捗の正として管理する。Toki関連はコミット済みであり、
Stage 4の確定結果は正本、ADR、成長記録、残した一次証跡を参照する。

## 1. 人間判断

人間は2026-07-20、Toki部分をコミットした後、Ritsuを次の一人として進めるよう指示した。
この判断によりRitsuだけを先行し、Hayateは今回の対象外とする。

採用範囲は次のとおりである。

- Ritsuを実装・複合実行担当の`加入準備中`メンバーとして正本化する
- 必須実行条件を`gpt-5.6-luna` / reasoning effort `high`とする
- 初期dispatchをGenへ集中し、専門担当は判断中核と受入れ確認を保持する
- 状態を`未加入 → docs-only試用 → コード試用 → 役割別加入`に分ける
- Stage 5は未着手のまま維持し、Ritsuのgrowth loop完了後に開始ゲートへ戻る

判断原文と非承認範囲は
[人間判断記録](ritsu-participation-human-decision-record.md)を参照する。

## 2. 反映済み

Ritsuの加入準備に必要な正本と実行adapterは反映済みである。

- [チーム定義](../agent/team.md): Ritsuを`加入準備中`として追加
- [標準workflow](../agent/workflow.md): 固定後作業委譲と実装担当の境界を追加
- [ロードマップ](../roadmap.md): Stage Rを進行中として追加
- [ADR-0020](../decisions/ADR-0020-ritsu-implementation-worker.md): 採用理由と境界を固定
- [Codex adapter](../../.codex/agents/ritsu.toml): Luna/highと停止条件を固定
- [統合リスクレビュー](ritsu-onboarding-risk-review.md): 正本反映前レビューと残留リスク

adapterの存在は、名前付き起動、指定model、effort、fresh性、品質、速度、加入を証明しない。

## 3. 継続する安全境界

Ritsuの正本表示は加入準備中、lifecycle状態は未加入である。次の境界を維持する。

- 指定Luna/highをplatform証跡で確認できなければ`inconclusive / blocked`とする
- default agent、汎用worker、別model、別effort、会話履歴付き起動へfallbackしない
- docs-only試用は、試行専用の新規`docs/work/`出力だけを許可する
- 既存コード、正本、adapter、共有成果物への書込みを試用契約へ含めない
- コード試用は、技術的write隔離、基準版、競合停止、独立差分確認、復旧主体を
  実装・実証し、人間が別途承認するまで開始しない
- VCS、merge、deploy、本番・高権限操作、外部送信を行わない

## 4. Gate S — fresh session機能スモーク

次のCodexセッションで、成果物を作らない機能スモークを1回だけ行う。

1. `.codex/agents/ritsu.toml`が名前付きagent registryへ公開されていることを確認する。
2. `agent_type: ritsu` / `fork_turns: none`でRitsuを起動する。
3. platform応答からagent識別子、名前付きtype、model ID、reasoning effortを記録する。
4. `gpt-5.6-luna` / `high`を確認できればGate S成功候補とする。
5. 未認識、証跡不足、別model・effortの場合は再試行・fallbackせず停止する。

設定ファイル値とRitsuの自己申告だけを実利用証跡として数えない。現セッション開始後に
adapterを追加したため、同一セッション内の未認識を失敗判定へ使わない。

## 5. Gate M — docs-only速度・品質pilot

Gate S成功後、[Ritsu速度・品質評価計画](ritsu-evaluation-plan.md)を入力として固定契約を
作り、人間承認後にpilotを行う。
開始前に次を決める。

1. 低感度の固定タスク、hidden oracle、試行専用の新規出力先。
2. 主評価baselineとなる現行方式の実行者と工程境界。
3. 契約readyから受入れ・Gen統合までの計測点と記録主体。
4. blind reviewer、必須項目、重大指摘、品質非劣性条件。
5. 反復数、実行順、欠測処理、再作業上限。

最初の1試行は機能pilotだけとし、速度改善、品質非劣性、正式加入を主張しない。

## 6. 完了条件

Stage Rは、次をすべて満たし、人間がRitsuの役割別加入を明示承認したときに完了する。

- 名前付きRitsuと指定Luna/highを信頼できるplatform証跡で確認する
- docs-only試用を固定契約で実施し、速度・品質・再作業・Gen負荷を振り返る
- コードwrite境界を技術的に実装・実証し、人間承認済みの回復可能なコード試用を行う
- Rinが試用結果と残留リスクをレビューする
- 人間が加入可否、許容リスク、正本上の`加入済み`表示を判断する

完了後、Stage 5の開始ゲートへ戻る。Hayateは別の人間判断まで進めない。
