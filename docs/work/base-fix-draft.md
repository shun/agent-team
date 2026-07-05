# ドラフト: 土台修正(Rin 指摘 P0-1 / P1-1〜P1-6 の採用分)

- 作成: 2026-07-05 / 起案: Gen(玄)/ 2026-07-05 人間の指摘により単語単位ハイライト形式に書き直し(**mo などブラウザ表示で見ること**。ターミナルで読む場合は末尾の「正確な diff」を参照)
- 状態: **承認・反映済み**(2026-07-05 人間承認 — diff 形式化・単語ハイライト化・Rin 指摘後ループの追記を経て「内容OK」。同日 正本4ファイルへ反映済み)
- 根拠: [risk-review.md](risk-review.md) の P0/P1 全7件採用(2026-07-05 人間、Gen 推奨どおり)。各変更の Why は risk-review.md の該当項目を正とする
- **読み取り専用 jj(判断B)は本ドラフトに含めない**(safety 初緩和のため別途明示確認)

見方: <span style="background:#ffebe9; padding:1px 6px;">赤の行 = 削除</span> / <span style="background:#dafbe1; padding:1px 6px;">緑の行 = 追加</span> / 行内の<span style="background:rgba(255,129,130,.55); padding:1px 4px; border-radius:2px;">濃い赤</span>・<span style="background:rgba(74,222,128,.55); padding:1px 4px; border-radius:2px;">濃い緑</span> = その行の中で実際に変わった部分。無色の行は変更なしの文脈。行の全体が新規のときは行内ハイライトなし。

承認後、Gen が以下のとおり正本へ反映し、growth-log に記録する。

---

## 1. docs/agent/safety.md(2箇所)

### 変更1(P0-1: 正本保護リストの拡大)— 2節

<div style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:12.5px; line-height:1.8; border:1px solid #d0d7de; border-radius:6px; margin:8px 0; padding:4px 0; color:#1f2328; background:#fff; overflow-x:auto;">
<div style="padding:2px 12px; white-space:pre-wrap;">  - &#42;&#42;バージョン管理操作(jj)は一切行わない&#42;&#42;: (…変更なし…)</div>
<div style="background:#ffebe9; padding:2px 12px; white-space:pre-wrap;">− - &#42;&#42;正本 docs(docs/agent/ 配下・docs/roadmap.md・docs/decisions/・<span style="background:rgba(255,129,130,.55); border-radius:2px;">.claude/agents/ 配下</span>)を人間の承認なしに変更しない&#42;&#42;: エージェントはドラフト提示までとする</div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+ - &#42;&#42;正本 docs(<span style="background:rgba(74,222,128,.55); border-radius:2px;">AGENTS.md・CLAUDE.md・</span>docs/agent/ 配下・docs/roadmap.md・docs/decisions/・<span style="background:rgba(74,222,128,.55); border-radius:2px;">.claude/ 配下全体 — agents/ に限定せず、settings.json 等の将来の設定ファイルを含む</span>)を人間の承認なしに変更しない&#42;&#42;: エージェントはドラフト提示までとする<span style="background:rgba(74,222,128,.55); border-radius:2px;">(2026-07-05 Rin 指摘 P0-1 により列挙を拡大)</span></div>
<div style="padding:2px 12px; white-space:pre-wrap;">  - &#42;&#42;docs/notes/original-memo.md(凍結コピー)を編集しない&#42;&#42;: 参考資料であり凍結済み</div>
</div>

### 変更2(P1-1: 書き込み許可を全エージェントに一般化)— 4節

<div style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:12.5px; line-height:1.8; border:1px solid #d0d7de; border-radius:6px; margin:8px 0; padding:4px 0; color:#1f2328; background:#fff; overflow-x:auto;">
<div style="padding:2px 12px; white-space:pre-wrap;">  ## 4. 許可されていること(境界の明確化)</div>
<div style="background:#ffebe9; padding:2px 12px; white-space:pre-wrap;">− - docs/work/ 配下の作業成果物は、<span style="background:rgba(255,129,130,.55); border-radius:2px;">Gen が</span>人間の承認なしに作成・更新してよい(Q1 で確定<span style="background:rgba(255,129,130,.55); border-radius:2px;">)</span></div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+ - docs/work/ 配下の作業成果物は、<span style="background:rgba(74,222,128,.55); border-radius:2px;">&#42;&#42;Gen を含むすべてのエージェント&#42;&#42;が</span>人間の承認なしに作成・更新してよい(Q1 で確定<span style="background:rgba(74,222,128,.55); border-radius:2px;">。2026-07-05 Rin 指摘 P1-1 により、禁止側 Q2 と同様に全エージェントへ一般化)</span></div>
<div style="padding:2px 12px; white-space:pre-wrap;">  - .ai/board/ 配下の記録(handoff-log.md / growth-log.md)の追記</div>
</div>

## 2. docs/agent/workflow.md(2箇所)

### 変更3(P1-2 判断C + P1-3 判断D + P1-4(a): 基本フローの拡張)— 1節

旧 5〜7 を 5〜8 の4行 + 5 の下位2項に差し替え。5 が新規挿入(Rin レビュー + 指摘後のループ。2026-07-05 人間の指摘「Rin が指摘したらどう動くか未定義」を受けて下位2項を追加)、旧5 → 6(判断D を追記)、旧6 → 7(番号のみ)、旧7 → 8(コミット時機を追記)。

<div style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:12.5px; line-height:1.8; border:1px solid #d0d7de; border-radius:6px; margin:8px 0; padding:4px 0; color:#1f2328; background:#fff; overflow-x:auto;">
<div style="padding:2px 12px; white-space:pre-wrap;">  4. Gen が成果物を &#96;docs/work/&#96; 配下に作る。正本 docs の変更が必要ならドラフトを提示する</div>
<div style="background:#ffebe9; padding:2px 12px; white-space:pre-wrap;">− 5. 人間が採用 / 却下 / 保留を判断する</div>
<div style="background:#ffebe9; padding:2px 12px; white-space:pre-wrap;">− 6. 採用分だけ正本 docs に反映する。定義変更は growth-log に記録する</div>
<div style="background:#ffebe9; padding:2px 12px; white-space:pre-wrap;">− 7. セッションの区切りで handoff-log に作業記録を追記する</div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+ 5. <span style="background:rgba(74,222,128,.55); border-radius:2px;">&#42;&#42;正本 docs の変更ドラフトと final-proposal は、人間の判断の前に Rin のレビューを経る&#42;&#42;(必須はこの2種のみ。それ以外は人間または Gen が必要と判断したとき。2026-07-05 判断C)</span></div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+    - Rin が指摘を出したら、Gen が対応(修正または反論)し、修正分は Rin が差分を再レビューする(原則1周まで。収束しなければ争点のまま人間へ)</div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+    - 人間に上げる際、指摘を「修正済み / 見解相違(両論併記)/ 人間の許容判断待ち」に仕分けて添える。&#42;&#42;Rin の OK は人間に上げる前提条件ではない&#42;&#42;(Rin は拒否権を持たない。争点を裁くのは人間。反対は解消してから出すのではなく、見えるまま出す)</div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+ 6. 人間が採用 / 却下 / 保留を判断する<span style="background:rgba(74,222,128,.55); border-radius:2px;">。&#42;&#42;Rin の P0 / P1 指摘は、明示的な判断結果が該当成果物(risk-review.md 等)の該当項目に記録されるまで、当該対象の確定・Stage の完了をしない&#42;&#42;(却下は正常な結果。判断の記録のみを義務とする。2026-07-05 判断D)</span></div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+ 7. 採用分だけ正本 docs に反映する。定義変更は growth-log に記録する</div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+ 8. セッションの区切りで handoff-log に作業記録を追記する<span style="background:rgba(74,222,128,.55); border-radius:2px;">。&#42;&#42;人間はこのタイミングでコミットする&#42;&#42;(未コミット差分の窓を短く保つ。2026-07-05 Rin 指摘 P1-4)</span></div>
</div>

### 変更4(P0-1 + P1-1: 権限表の修正)— 2節

<div style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:12.5px; line-height:1.8; border:1px solid #d0d7de; border-radius:6px; margin:8px 0; padding:4px 0; color:#1f2328; background:#fff; overflow-x:auto;">
<div style="background:#ffebe9; padding:2px 12px; white-space:pre-wrap;">− | 場所 | <span style="background:rgba(255,129,130,.55); border-radius:2px;">Gen 単独での</span>書き込み | 備考 |</div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+ | 場所 | <span style="background:rgba(74,222,128,.55); border-radius:2px;">エージェント単独での</span>書き込み<span style="background:rgba(74,222,128,.55); border-radius:2px;">(全メンバー共通)</span> | 備考 |</div>
<div style="padding:2px 12px; white-space:pre-wrap;">  |---|---|---|</div>
<div style="background:#ffebe9; padding:2px 12px; white-space:pre-wrap;">− | &#96;docs/work/&#96; 配下 | &#42;&#42;可&#42;&#42;(作成・更新。Q1 で確定) | 削除・移動は人間に提案してから |</div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+ | &#96;docs/work/&#96; 配下 | &#42;&#42;可&#42;&#42;(作成・更新。Q1 で確定<span style="background:rgba(74,222,128,.55); border-radius:2px;">、2026-07-05 全エージェントに一般化</span>) | 削除・移動は人間に提案してから |</div>
<div style="padding:2px 12px; white-space:pre-wrap;">  | &#96;.ai/board/&#96; 配下 | &#42;&#42;可&#42;&#42;(追記) | handoff-log / growth-log |</div>
<div style="background:#ffebe9; padding:2px 12px; white-space:pre-wrap;">− | 正本 docs(&#96;docs/agent/&#96;・&#96;docs/roadmap.md&#96;・&#96;docs/decisions/&#96;・<span style="background:rgba(255,129,130,.55); border-radius:2px;">&#96;.claude/agents/&#96;</span>) | &#42;&#42;不可&#42;&#42; | ドラフト提示まで。反映は人間承認後(3・6節) |</div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+ | 正本 docs(<span style="background:rgba(74,222,128,.55); border-radius:2px;">&#96;AGENTS.md&#96;・&#96;CLAUDE.md&#96;・</span>&#96;docs/agent/&#96;・&#96;docs/roadmap.md&#96;・&#96;docs/decisions/&#96;・<span style="background:rgba(74,222,128,.55); border-radius:2px;">&#96;.claude/&#96; 配下全体</span>) | &#42;&#42;不可&#42;&#42; | ドラフト提示まで。反映は人間承認後(3・6節) |</div>
<div style="padding:2px 12px; white-space:pre-wrap;">  | &#96;docs/notes/original-memo.md&#96; | &#42;&#42;不可&#42;&#42; | 凍結コピー。参照のみ |</div>
</div>

## 3. docs/agent/team.md(2箇所)

### 変更5(P1-4(a): Gen の確認責任)— Gen「責任」節の末尾に1行追加

<div style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:12.5px; line-height:1.8; border:1px solid #d0d7de; border-radius:6px; margin:8px 0; padding:4px 0; color:#1f2328; background:#fff; overflow-x:auto;">
<div style="padding:2px 12px; white-space:pre-wrap;">  - セッション開始時に &#96;.ai/board/handoff-log.md&#96; の先頭エントリと &#96;docs/work/current-task.md&#96; を読み、文脈を回復する(2026-07-05 成長ループ1周目で追加)</div>
<div style="padding:2px 12px; white-space:pre-wrap;">  - セッションの区切りで handoff-log に作業記録を追記する(同上)</div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+ - 既存成果物への大きな上書き・書き換えの前に、人間に未コミット差分がないか確認を促す(2026-07-05 Rin 指摘 P1-4 で追加)</div>
</div>

### 変更6(P1-6 判断E: 「重大リスクなし」の正当化と再指摘の抑制)— Rin「責任」節の末尾に2行追加

<div style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:12.5px; line-height:1.8; border:1px solid #d0d7de; border-radius:6px; margin:8px 0; padding:4px 0; color:#1f2328; background:#fff; overflow-x:auto;">
<div style="padding:2px 12px; white-space:pre-wrap;">  - 「このまま進めると危ない点」「やらない方がいい可能性」を指摘する</div>
<div style="padding:2px 12px; white-space:pre-wrap;">  - 人間が許容判断すべきリスクを、判断できる形に整理する</div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+ - 検討した観点の一覧を添えたうえで「重大リスクなし(P2 のみ / ゼロ)」と報告することは、正当な成果である(観点一覧なしの「問題なし」は不可。2026-07-05 判断E)</div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+ - 同一対象への再指摘は、前回からの差分がある場合のみ行う(毎回の再掲をしない)</div>
</div>

## 4. docs/roadmap.md(1箇所)

### 変更7(P1-5: アダプタの起動検証)— Stage 2 の手順に1行追加

<div style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:12.5px; line-height:1.8; border:1px solid #d0d7de; border-radius:6px; margin:8px 0; padding:4px 0; color:#1f2328; background:#fff; overflow-x:auto;">
<div style="padding:2px 12px; white-space:pre-wrap;">  - &#96;.claude/agents/rin.md&#96; を作成(薄いアダプタ。詳細は docs/agent/team.md を参照させる)</div>
<div style="background:#dafbe1; padding:2px 12px; white-space:pre-wrap;">+ - アダプタは「存在する」だけでは完了としない。&#42;&#42;新しいセッションでアダプタ経由の起動が確認できて完了&#42;&#42;とする(2026-07-05 試運転でアダプタ未認識 → インライン起動になった実績から。標準手順として以降の全メンバーに適用)</div>
<div style="padding:2px 12px; white-space:pre-wrap;">  - &#42;&#42;試運転&#42;&#42;: これまでに作った土台(AGENTS.md / workflow / Gen の定義)を Rin にレビューさせ、&#96;docs/work/risk-review.md&#96; に反対意見・弱点を出させる</div>
</div>

---

## 正確な diff(反映作業用・ターミナル向け)

<details>
<summary>クリックで展開(上と同内容の unified diff)</summary>

### 変更1・2: safety.md

```diff
 - **バージョン管理操作(jj)は一切行わない**: (…変更なし…)
-- **正本 docs(docs/agent/ 配下・docs/roadmap.md・docs/decisions/・.claude/agents/ 配下)を人間の承認なしに変更しない**: エージェントはドラフト提示までとする
+- **正本 docs(AGENTS.md・CLAUDE.md・docs/agent/ 配下・docs/roadmap.md・docs/decisions/・.claude/ 配下全体 — agents/ に限定せず、settings.json 等の将来の設定ファイルを含む)を人間の承認なしに変更しない**: エージェントはドラフト提示までとする(2026-07-05 Rin 指摘 P0-1 により列挙を拡大)
 - **docs/notes/original-memo.md(凍結コピー)を編集しない**: 参考資料であり凍結済み
```

```diff
 ## 4. 許可されていること(境界の明確化)
-- docs/work/ 配下の作業成果物は、Gen が人間の承認なしに作成・更新してよい(Q1 で確定)
+- docs/work/ 配下の作業成果物は、**Gen を含むすべてのエージェント**が人間の承認なしに作成・更新してよい(Q1 で確定。2026-07-05 Rin 指摘 P1-1 により、禁止側 Q2 と同様に全エージェントへ一般化)
 - .ai/board/ 配下の記録(handoff-log.md / growth-log.md)の追記
```

### 変更3・4: workflow.md

```diff
 4. Gen が成果物を `docs/work/` 配下に作る。正本 docs の変更が必要ならドラフトを提示する
-5. 人間が採用 / 却下 / 保留を判断する
-6. 採用分だけ正本 docs に反映する。定義変更は growth-log に記録する
-7. セッションの区切りで handoff-log に作業記録を追記する
+5. **正本 docs の変更ドラフトと final-proposal は、人間の判断の前に Rin のレビューを経る**(必須はこの2種のみ。それ以外は人間または Gen が必要と判断したとき。2026-07-05 判断C)
+   - Rin が指摘を出したら、Gen が対応(修正または反論)し、修正分は Rin が差分を再レビューする(原則1周まで。収束しなければ争点のまま人間へ)
+   - 人間に上げる際、指摘を「修正済み / 見解相違(両論併記)/ 人間の許容判断待ち」に仕分けて添える。**Rin の OK は人間に上げる前提条件ではない**(Rin は拒否権を持たない。争点を裁くのは人間。反対は解消してから出すのではなく、見えるまま出す)
+6. 人間が採用 / 却下 / 保留を判断する。**Rin の P0 / P1 指摘は、明示的な判断結果が該当成果物(risk-review.md 等)の該当項目に記録されるまで、当該対象の確定・Stage の完了をしない**(却下は正常な結果。判断の記録のみを義務とする。2026-07-05 判断D)
+7. 採用分だけ正本 docs に反映する。定義変更は growth-log に記録する
+8. セッションの区切りで handoff-log に作業記録を追記する。**人間はこのタイミングでコミットする**(未コミット差分の窓を短く保つ。2026-07-05 Rin 指摘 P1-4)
```

```diff
-| 場所 | Gen 単独での書き込み | 備考 |
+| 場所 | エージェント単独での書き込み(全メンバー共通) | 備考 |
 |---|---|---|
-| `docs/work/` 配下 | **可**(作成・更新。Q1 で確定) | 削除・移動は人間に提案してから |
+| `docs/work/` 配下 | **可**(作成・更新。Q1 で確定、2026-07-05 全エージェントに一般化) | 削除・移動は人間に提案してから |
 | `.ai/board/` 配下 | **可**(追記) | handoff-log / growth-log |
-| 正本 docs(`docs/agent/`・`docs/roadmap.md`・`docs/decisions/`・`.claude/agents/`) | **不可** | ドラフト提示まで。反映は人間承認後(3・6節) |
+| 正本 docs(`AGENTS.md`・`CLAUDE.md`・`docs/agent/`・`docs/roadmap.md`・`docs/decisions/`・`.claude/` 配下全体) | **不可** | ドラフト提示まで。反映は人間承認後(3・6節) |
 | `docs/notes/original-memo.md` | **不可** | 凍結コピー。参照のみ |
```

### 変更5・6: team.md

```diff
 - セッション開始時に `.ai/board/handoff-log.md` の先頭エントリと `docs/work/current-task.md` を読み、文脈を回復する(2026-07-05 成長ループ1周目で追加)
 - セッションの区切りで handoff-log に作業記録を追記する(同上)
+- 既存成果物への大きな上書き・書き換えの前に、人間に未コミット差分がないか確認を促す(2026-07-05 Rin 指摘 P1-4 で追加)
```

```diff
 - 「このまま進めると危ない点」「やらない方がいい可能性」を指摘する
 - 人間が許容判断すべきリスクを、判断できる形に整理する
+- 検討した観点の一覧を添えたうえで「重大リスクなし(P2 のみ / ゼロ)」と報告することは、正当な成果である(観点一覧なしの「問題なし」は不可。2026-07-05 判断E)
+- 同一対象への再指摘は、前回からの差分がある場合のみ行う(毎回の再掲をしない)
```

### 変更7: roadmap.md

```diff
 - `.claude/agents/rin.md` を作成(薄いアダプタ。詳細は docs/agent/team.md を参照させる)
+- アダプタは「存在する」だけでは完了としない。**新しいセッションでアダプタ経由の起動が確認できて完了**とする(2026-07-05 試運転でアダプタ未認識 → インライン起動になった実績から。標準手順として以降の全メンバーに適用)
 - **試運転**: これまでに作った土台(AGENTS.md / workflow / Gen の定義)を Rin にレビューさせ、`docs/work/risk-review.md` に反対意見・弱点を出させる
```

</details>

---

## 補足

- 変更3(判断C・D)と変更6(判断E)は新しい運用ルールのため ADR 候補を作成済み: docs/work/adr-drafts/ の `2026-07-05-rin-review-scope.md` / `2026-07-05-p0-p1-explicit-judgment.md` / `2026-07-05-no-risk-is-valid-output.md`
- Rin 定義の変更(変更6)は反映時に growth-log に記録する(定義変更のため)
- 判断A(技術的強制の要否)・判断B(読み取り専用 jj)・P2 7件・Stage 2 合否は本ドラフトの範囲外(未判断のまま残る)
