# current-task: docs/work 整理（完了）

- 更新: 2026-08-22 / 更新者: Aira
- 進行中: なし。整理の正本反映と削除は完了。コミットは人間
- 進捗の正: 本ファイル。handoff-log に移さない
- VCS: エージェントは操作しない

## 1. 目的

`docs/work/` の未正本化ドキュメントを、昇格または削除に仕分ける。

## 2. 完了

- ADR-0022〜0027 を正本へ書いた
- `workflow.md` 10節を追加した
- ADR-0002 / 0014 に注記した
- 作業ドラフト 41 件を削除した
- 残した常設: 本ファイル、`final-proposal.md`、`plans/PLAN.md`、
  却下の Momo ドラフト
- team-plan Skill は消さず、正本への参照だけ直した

## 3. 未決のまま残す進捗（破棄しない）

### 3.1 直インストール

- 状態: 導入先 docs を `.agent-team/docs/` へ隔離。テスト 12 passed
- 次: 変更をリモートに載せてから、他リポでワンライナー確認
- 注意: 以前 `docs/agent/` へ入れたファイルは削除しない

### 3.2 Mission Room B5 残留 P2（未決・未受容）

| ID | 内容 |
| --- | --- |
| P2-1 | ready 後の WebGL / context loss に対する truthful fallback |
| P2-2 | keyboard / AT |
| P2-3 | Decision case の重複 presentation（semantic owner 一本化） |
| P2-4 | mobile / visual / human 母集団 |
| P2-5 | evidence retention |

### 3.3 Medium 2スライス試運転

- M1: P2-3。counting rule 採用済み。実装未承認
- M2: P2-1。Kai 案A 選択済み。実装未承認
