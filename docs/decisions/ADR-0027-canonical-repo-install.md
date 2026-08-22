# ADR-0027: このリポジトリを正本とし、下流はインストーラで導入する

> 状態: 承認済み（2026-08-16 人間判断 / 2026-08-22 文面承認 /
> 2026-08-22 導入先 docs 隔離） / 起案: 人間 / 整理: Aira

## 背景

このリポジトリはチームを育てる実験場である。他リポジトリへ同じ入口を配りたい
依頼と、roadmap の「一括セットアップはしない」が衝突した。人間は、育成は
このリポジトリに限り、他リポジトリはこのリポジトリから install / update
し、フィードバックは PR とする配布モデルを採用した。入れ方はインストーラ
（人間指定 A、Kai 案B）である。

## 決定

- このリポジトリが正本である。下流は独自の正本にしない
- 導入先の人間が、対象リポジトリで install / update を実行する。
  このリポジトリのエージェントは他リポジトリへ書かない
- 取得元は `https://github.com/shun/agent-team` に固定する。
  パッケージレジストリは使わない
- 入れ方は宣言パスをコピーするインストーラとする。git 従属（submodule 等）
  は採らない
- 更新は同じインストーラを、このリポジトリの新しい参照で再実行する
- 下流からのフィードバックは、このリポジトリへの PR とする
- インストーラはルートのコンテキストファイル（`AGENTS.md`、`CLAUDE.md`
  など）を作成・上書きしない。導入先の人間が、自分のツール入口へ
  `MUST READ .agent-team/docs/agent/guide.md` を追記する
  （[ADR-0023](ADR-0023-agent-team-guide.md)）
- 置くものと置かないものの正は `scripts/install-manifest.json` である
- このリポジトリの正本レイアウトは `docs/` のままとする。導入先では
  `docs/` 配下の配布物を `.agent-team/docs/` へ写す。既存の `docs/` と
  混ぜない（2026-08-22 人間依頼）
- コピー時に配布ファイル内の `docs/` 参照を `.agent-team/docs/` へ
  書き換える。`.codex/`、`.agents/`、`.claude/agents/` の起動位置は
  変えない

置く（判断時点。括弧内は導入先パス）:

- `docs/agent/`（`.agent-team/docs/agent/`。`guide.md` を含む正本）
- `docs/roadmap.md`（`.agent-team/docs/roadmap.md`）
- `docs/decisions/`（`.agent-team/docs/decisions/`）
- `.codex/`、`.agents/`、`.claude/agents/`
- `scripts/run-plan.ts`

置かない:

- `docs/work/`、`docs/notes/`、`.ai/board/`、`tmp/`、`mission-room/`
- `scripts/run-plan_test.ts`
- ルートのコンテキストファイル

既定の衝突: 宣言ファイルと内容が違う既存ファイルは書かない。
対象: 人間が所有するリポジトリ。本番は含めない。

## 理由

育成の一括セットアップ禁止を、このリポジトリ内に限る。下流へは宣言した
正本と起動口だけを pull で置く。書込み主体を導入先の人間に置けば、
このリポジトリのエージェントがリポジトリ外へ書く禁止と両立する。

## 捨てた選択肢

- 案 A（文書化コピーのみ）: 更新手段が手順の再実行だけになる
- 案 C（git 従属）: デモや runner まで持ち込みうる
- 案 D（参照ピン留めだけ）: 「置いて使える」を満たしにくい
- 案 E（テンプレート新規生成だけ）: 既存リポジトリへ入れられない
- 下流向け `AGENTS.md` を上書きする: ADR-0023 が捨てた
- 導入先でも `docs/` 直下に置く: 既存ドキュメントと混ざる
  （2026-08-22 に捨てた）

## 影響

- `README.md`、`docs/agent/guide.md`、`scripts/install-manifest.json`、
  `scripts/install-agent-team.ts` へ反映済み
- 導入先の追記文は `.agent-team/docs/agent/guide.md` を読む。この
  リポジトリ自身の入口は `docs/agent/guide.md` のままである
- 以前 `docs/agent/` へ入れた下流ファイルは削除しない
- 次の運用確認（リモート掲載後の他リポワンライナー）は進捗として
  `docs/work/current-task.md` に残す。本 ADR の完了条件ではない
