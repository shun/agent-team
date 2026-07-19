# Ritsu Gate S 名前付き起動スモーク契約

- 契約ID: RITSU-GS-01
- 作成日: 2026-07-20
- 作成者: Gen（玄）
- 状態: fresh session実行待ち
- 目的: Ritsuの名前付き起動と必須model・effortのplatform証跡を、成果物制作前に確認する

## dispatch固定値

次の値を変更せず、fresh sessionから1回だけdispatchする。

- `agent_type`: `ritsu`
- `fork_turns`: `none`
- expected model: `gpt-5.6-luna`
- expected reasoning effort: `high`
- timeout上限: 120秒
- 外部再試行: 0回
- fallback: 禁止

## Ritsuへの作業

Ritsuは次の順で機能スモークを行う。

1. `docs/agent/team.md`のRitsu節と`docs/agent/safety.md`を読む。
2. `docs/work/ritsu-gate-s-smoke-contract.md`を読む。
3. ファイルを作成・更新せず、VCS・外部アクセス・コマンド実行を行わない。
4. 最終応答で、契約ID、読み取った必須model・effort、docs-only境界、fallback禁止、
   コード試用停止条件を要約する。

この応答は指示理解の証拠であり、model ID、effort、read非逸脱、安全性の証明ではない。

## Genが記録するplatform証跡

Genは次をRitsuの自己申告と分けて記録する。

- dispatch時刻、dispatch引数、返却されたagent識別子
- platformが`ritsu`を名前付きagent typeとして受理した事実
- platform管理情報が示す実model IDとreasoning effort
- fresh contextであることを示すplatform情報、または未検証表示
- timeout、tool障害、未認識、証跡欠落

adapterファイル値、Ritsuの自己申告、成果物内容からmodel IDまたはeffortを推定しない。

## 判定

- **pass候補**: 名前付き`ritsu`が受理され、platform管理情報からLuna/highを確認し、
  契約応答を1回で返す。
- **fail候補**: 名前付きtypeが未認識、別model・effort、契約逸脱、禁止操作を行う。
- **inconclusive / blocked**: platform管理のmodel ID、effort、fresh性を確認できない、
  またはplatform障害で観測できない。

いずれの場合もdefault agent、汎用worker、別model・effort、履歴付き起動、Gen代行へ
fallbackせず、人間へ結果を戻す。
