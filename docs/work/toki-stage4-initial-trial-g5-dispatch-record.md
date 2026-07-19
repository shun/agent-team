# Toki Stage 4 初回試運転 G5 dispatch承認・実行記録

- 承認者: 人間
- 承認日: 2026-07-19
- 記録日時: 2026-07-19 23:00:25 JST
- 状態: **G5承認・G6+G7原子的dispatch実行済み**
- 対象試行: `TC-1`初回試行

本書は、G3/G4とは独立した今回のユーザー依頼によるG5承認と、原子的dispatchの
実行事実を記録する。platformはユーザーメッセージの正確な受信時刻を公開しないため、
承認時刻はセッション日、記録時刻は実測値として区別する。

## 1. 人間承認の範囲

人間は、承認済みの低感度・`docs/work/`限定Fast Laneについて、Genが中間承認を
挟まず、契約内で完了までチームを自律運用することを明示的に許可した。

承認対象は次のとおりである。

- G3/G4 digestと完了・停止成果物未存在の照合後にdispatchする。
- 名前付き`agent_type: toki` / `fork_turns: none`を使う。
- 起動確認と分析開始を分離せず、G6+G7を原子的dispatchとして実行する。
- Tokiには`TC-1`のread/write allowlistだけを渡す。
- `EP-1`の非公開標本をTokiへ開示しない。
- fallbackを行わない。
- 追加再試行は`TC-1`の条件内で最大1回とする。
- 停止条件に該当しない限り、人間への中間承認を挟まない。
- Toki成果をGenが`EP-1`で評価し、Rinレビューと原則1周の差分再レビューへ進める。

停止条件は、名前付きToki未認識、digest不一致、成果物既存、allowlist・契約・入力の
競合、外部調査・実装・PoC・設定変更・実テストの必要、機密性・安全境界の変更、
fallbackまたは責務拡張の必要である。

## 2. 原子的dispatchの残留リスク

人間の承認は、起動確認だけを先行できない現在の手順において、名前付きagent typeの
確認と分析開始が同時になる残留リスクを含む。Genはdispatch前に、現在のagent registryへ
`toki`が公開されていること、3 digestの一致、2成果物の未存在を確認した。

本承認は、platform内部のfresh性、instructionによるread/write制限の技術的強制、
非逸脱、安全性、再現性を確認済みと扱うものではない。

## 3. Dispatch実値と結果

実行値とplatform観測は次のとおりである。

| 項目 | 実値または結果 |
|---|---|
| `agent_type` | `toki` |
| `fork_turns` | `none` |
| task名 | `/root/toki_stage4_initial_trial_tc1_attempt1` |
| 試行 | 初回1回 |
| platform結果 | task作成、完了通知 |
| 完了成果物 | `docs/work/test-analysis.md` |
| 停止成果物 | 未作成 |
| 追加再試行 | 0回 |
| fallback | なし |

この結果は名前付きTokiの要求が受理され、成果物が作成された観測である。Toki加入済み、
Stage 4完了、技術方式A・B・C採用、sandbox・permission profile変更、ADR昇格、実装、
PoC、実テスト、または安全性の証明ではない。
