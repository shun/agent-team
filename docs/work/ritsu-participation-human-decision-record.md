# Ritsu参加開始の人間判断記録

- 判断日: 2026-07-20
- 判断者: 人間
- 記録者: Gen（玄）
- 状態: 正本反映済み・fresh session待ち

## 人間の発言

人間は、Toki部分をコミットしたことを伝えたうえで、「じゃー、ritsuを進めよう」と
指示した。

## 採用した解釈

- Ritsuを次の一人として先行し、Hayateは今回進めない。
- Ritsuの正本定義、Codex adapter、成長ループ開始を承認した。
- Ritsuの正本表示は`加入準備中`、lifecycle状態は`未加入`とし、adapter作成だけで
  試用済みまたは加入済みと扱わない。
- 指定Luna/highのfresh起動、docs-only試用、コード試用、振り返り、加入判断を個別に行う。
- Stage 5は未着手のまま維持し、Ritsuのgrowth loop完了後に開始ゲートへ戻る。

## 今回承認していないこと

- Hayateの正本反映、adapter作成、試用、加入
- Ritsuの正式加入または既存コード・正本への書込み
- コード試用の隔離方式、実コードタスク、PoC、外部調査、設定変更
- 速度25%・「爆速」50%の閾値、固定タスク、反復数、baseline、blind reviewer
- merge、deploy、VCS操作、本番・高権限操作、外部送信

## 次のゲート

新しいCodexセッションで`agent_type: ritsu` / `fork_turns: none`を使用し、名前付きRitsu、
`gpt-5.6-luna`、reasoning effort `high`を信頼できるplatform証跡から確認する。
確認不能ならfallbackせず停止し、人間へ戻す。
