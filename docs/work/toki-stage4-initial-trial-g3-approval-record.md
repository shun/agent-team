# Toki Stage 4 初回試運転 G3承認記録

- 記録日時: 2026-07-19 21:33:01 JST
- 承認者: 人間
- 状態: **G3確定・Toki read allowlist外**
- 次のゲート: G4低感度入力確認

本書は、人間が承認した初回試運転契約と非公開評価計画の内容版・digestを固定する。
Tokiのread allowlistとdispatch promptへ含めない。

## 1. 人間判断

人間は、現行契約案Aと行数ポリシーA2を採用した。

- 契約案A: read/write allowlist、固定母集団、成果物契約、停止成果物、fallback禁止、
  条件付き追加1回の再試行、非公開評価を採用する。
- 行数ポリシーA2: 320行前後を目安とし、必須契約を優先する。超過時は実行行数、
  超過理由、圧縮しなかった必須要素を記録し、行数超過だけでは停止・不合格にしない。

## 2. 固定した内容版とdigest

G3で固定した対象は次のとおりである。

| 対象 | 内容版 | SHA-256 |
|---|---|---|
| `docs/work/toki-stage4-initial-trial-contract-draft.md` | `TC-1` | `ba942a1c33ff58895f81dd58a459c6648a3248593916536bda34481dca510ca9` |
| `docs/work/toki-stage4-initial-trial-evaluation-plan.md` | `EP-1` | `44b14062ce79d90a85dfb33fd2b5a5f96183f318dfa980a92f040da6884ff53d` |

## 3. 失効条件

固定対象の内容または内容版が変わった場合、G3承認は失効する。dispatch前の変更はG3から
再判断し、dispatch後の変更版は当該試運転の評価へ使用しない。試運転前後に本記録の
digestと対象ファイルを照合する。

## 4. 未承認範囲

G3は契約と評価計画の確定だけである。G4の低感度入力確認、G5の原子的dispatch許容、
名前付きToki起動、試運転、`test-analysis.md`、停止成果物、技術方式、sandbox・
permission profile、Stage 4完了、コミットを承認しない。
