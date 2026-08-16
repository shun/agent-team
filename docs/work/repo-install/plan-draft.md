# Plan 案: リポジトリ直インストール（インストーラ）

- Plan ID: `repo-install-2026-08-16`
- Status: `ready`（開始は人間が「この PLAN を承認。開始してよい」と明示したあと）
- 判断記録: `docs/work/repo-install/human-decision-2026-08-16.md`
- 実行台帳（開始後）: `tmp/PLAN.md`
- 写し: `docs/work/plans/PLAN.md`

## ゴール

導入先の人間が、この git リポジトリを取得元とするインストーラを実行し、
宣言した正本と起動口、`scripts/run-plan.ts` を対象リポジトリへ置ける。
更新は同じインストーラの再実行。このリポジトリのエージェントは
他リポジトリへ書かない。

## 配布一覧（2026-08-16 人間確認）

入れる:

- `docs/agent/` 配下（正本。現在は team / safety / workflow）
- `docs/roadmap.md`（正本）
- `docs/decisions/` 配下（正本 ADR）
- ツール別アダプタ（`.codex/`、`.agents/`、`.claude/agents/`）
- `scripts/run-plan.ts`
- `docs/agent/guide.md`（共通ガイドライン。ルートの `AGENTS.md` /
  `CLAUDE.md` は配らない。導入先が自分のコンテキストから読む）

入れない:

- `docs/work/`（作業成果物。正本ではない）
- `docs/notes/`（凍結コピー。正本列挙にない）
- `.ai/board/`、`tmp/`、`mission-room/`
- `scripts/run-plan_test.ts`
- `.claude/scheduled_tasks.lock` 等の局所ロック

既定の衝突: 宣言ファイルと内容が違う既存ファイルは書かない。
対象: 人間が所有するリポジトリ。本番は含めない。

## 非対象

- VCS、deploy、正本 safety の緩和
- Mission Room
- `--execute` での他 CLI 実起動
- このリポジトリのエージェントによる他リポへの書き込み

```plan
id: repo-install-2026-08-16
status: ready
tasks:
  - id: T-001
    done: false
    depends: []
    runner: aira
  - id: T-002
    done: true
    depends: [T-001]
    runner: aira
  - id: T-003
    done: false
    depends: [T-002]
    runner: deno
```

## Wave 1 — 配布宣言を固定

- [ ] T-001 — 配布マニフェストをこのリポジトリに置く
  - Goal: インストーラが読む、宣言されたパス一覧がある
  - Complete when: 上記の入れる / 入れないが機械可読で一致し、
    人間が一覧を再確認できる
  - Depends on: none
  - Dispatch: aira
  - Required handoff: 未記入
  - Reattempt context: 未記入

- [x] T-002 — `docs/agent/guide.md` と、追記用の一文を置く
  - Goal: Claude / Codex / Antigravity / Cursor など、ルートの
    コンテキストが違っても、同じ `docs/` の入口を読める
  - Complete when:
    - 共通ガイドラインが `docs/agent/guide.md` にある
    - このリポジトリの `AGENTS.md` は guide を読む薄い入口である
    - 導入先人間が追記する一文が guide に示してある
    - インストーラはルートの `AGENTS.md` / `CLAUDE.md` 等を書かない
  - Depends on: T-001
  - Dispatch: aira
  - Required handoff: 未記入
  - Reattempt context: 未記入

## Wave 2 — インストーラ

- [ ] T-003 — Deno インストーラとテストを実装する
  - Goal: 導入先の人間が、このリポジトリを取得元に install / update
    できる
  - Complete when:
    - 宣言パスだけを対象ディレクトリへ書く
    - 取得元をこのリポジトリの git 参照に固定できる
    - 既存の異なる内容は上書きしない
    - 置いた参照を記録し、再実行で更新できる
    - ルートのコンテキストファイルを作成・上書きしない
    - 終了時に、追記用の一文を表示する
    - このリポジトリの外へは、指定した対象ディレクトリ以外に書かない
    - テストで上記を示し、Aira が完了条件を確認する
  - Depends on: T-002
  - Dispatch: deno
  - Required handoff: 未記入
  - Reattempt context: 未記入

## Open issues

- （なし）
