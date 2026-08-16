# Plan: リポジトリ直インストール（インストーラ）

- Plan ID: `repo-install-2026-08-16`
- Status: `completed`
- 判断記録: `docs/work/repo-install/human-decision-2026-08-16.md`
- 実行台帳: `tmp/PLAN.md`
- 写し: このファイル
- 開始承認: 2026-08-16 人間「OK。承認します。」
- 完了条件: T-001 と T-003 がチェック済み。T-002 は開始前に先行実施済み
- 非対象: VCS、deploy、safety 緩和、Mission Room、他リポへのエージェント書き込み

```plan
id: repo-install-2026-08-16
status: completed
tasks:
  - id: T-001
    done: true
    depends: []
    runner: aira
  - id: T-002
    done: true
    depends: []
    runner: aira
  - id: T-003
    done: true
    depends: [T-001, T-002]
    runner: deno
```

## Wave 1 — 配布宣言を固定

- [x] T-001 — 配布マニフェストをこのリポジトリに置く
  - Goal: インストーラが読む、宣言されたパス一覧がある
  - Complete when: 入れる / 入れないが機械可読で一致し、人間が一覧を再確認できる
  - Depends on: none
  - Dispatch: aira
  - Required handoff: `scripts/install-manifest.json`。実 checkout の列挙テストで
    work / notes / mission-room / AGENTS.md / CLAUDE.md を除外することを確認
  - Reattempt context: 未記入

- [x] T-002 — `docs/agent/guide.md` と、追記用の一文を置く
  - Goal: ツールごとのルートコンテキストが違っても、同じ docs 入口を読める
  - Complete when: guide.md があり、このリポの AGENTS.md は薄い入口である
  - Depends on: none（開始前に人間依頼で先行実施）
  - Dispatch: aira
  - Required handoff: 2026-08-16 人間依頼で作成済み
  - Reattempt context: 未記入

## Wave 2 — インストーラ

- [x] T-003 — Deno インストーラとテストを実装する
  - Goal: 導入先の人間が、このリポジトリを取得元に install / update できる
  - Complete when:
    - 宣言パスだけを対象ディレクトリへ書く
    - 取得元をこのリポジトリの git 参照に固定できる
    - 既存の異なる内容は上書きしない（ロックハッシュ一致なら更新可）
    - 置いた参照を記録し、再実行で更新できる
    - ルートのコンテキストファイルを作成・上書きしない
    - 終了時に、追記用の一文を表示する
    - 指定した対象ディレクトリ以外に書かない
    - テストで上記を示し、Aira が完了条件を確認する
  - Depends on: T-001, T-002
  - Dispatch: deno
  - Required handoff: `deno test --allow-read --allow-write scripts/install-agent-team_test.ts`
    7 passed / 0 failed。`run-plan_test.ts` は 8 passed。未実施: git URL からの clone
  - Reattempt context: 未記入

## Open issues

- （なし）
