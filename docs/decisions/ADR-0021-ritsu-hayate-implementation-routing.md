# ADR-0021: RitsuとHayateを条件付きroutingで採用する

> 状態: **承認済み（2026-07-21 人間承認）** / 起案: 人間 / 整理: Gen（玄）

Ritsuの固定実装pilot、Work mode文書試行、HayateのTypeScript、Go、Rust各3回比較を経て、
人間は両名を加入済みメンバーとして採用した。本決定は、役割採用と性能・安全証明を分離し、
実装担当の選択条件を固定する。

## 決定

Ritsuを標準実装担当、Hayateを短時間制約付き限定実装担当とする。

- 「加入済み」は組織上の役割採用と条件付きrouting eligibilityだけを意味する。
- Ritsuを既定とし、Hayateは単一責務、固定API、低リスク、独立oracle、時間上限、
  事前実行可能な独立受入れその他の全条件を満たす場合だけ選ぶ。
- Hayateは外部再作業を行わない。契約・oracle不足は上流、command・sandbox疑義はRinと
  人間判断、固定契約下の機能不合格だけは新しい作業IDのRitsuへ切り替える。
- 機能受入れとcommand・sandbox complianceを別々に記録し、通常完了には両方のpassを
  要求する。未観測は`unknown`とし、別軸のpassで相殺しない。
- 技術的write隔離、基準版、write前競合停止、独立差分確認、復旧主体を実証できない環境では、
  既存repository fileをRitsuまたはHayateへ委譲しない。

詳細なrouting条件と失敗時分岐は[ワークフロー](../agent/workflow.md)を正とする。

## 理由

Ritsuは固定合成課題3言語で機能・hidden testを通過し、複数工程と通常のデバッグを担う
標準実装担当の候補として好材料を得た。Hayateは約110〜136秒の実行時間を観測した一方、
機能合格率と固定API遵守が言語・run間で揺れた。両者を同じ用途で競わせるより、Ritsuを
既定にし、独立検証が安い限定作業だけHayateへ委譲する方が、速度シグナルを利用しながら
accepted completionの品質を守れる。

## 採用しなかった選択肢

次の選択肢は、品質または速度の評価を歪めるため採用しない。

- Hayateを全実装の既定にする案: first-pass品質とAPI遵守の再現性が不足する。
- Ritsuだけを採用する案: 小さな固定作業で観測したHayateの短時間シグナルを利用できない。
- Hayateへ同一作業を繰り返す案: 検証と再作業の時間が速度利点を失わせる。
- 機能passだけで完了する案: command・sandbox疑義を安全上の完了として扱えない。

## 確定しない事項

本決定では、次の性能とplatform能力を確定しない。

- HayateのRitsuに対する一般的な速度優位、速度SLA、または品質非劣性
- per-runの実model、reasoning effort、fresh性、tool・network非逸脱
- adapter、自己申告、repository manifestによるsandbox強制の証明
- production、VCS、外部送信、正本変更その他の個別作業承認

## 評価結果

時間はdispatch直前M0からcompletion通知受領直後M1までのE2E秒で、queue、platform処理、
通知遅延を含む。全runは外部再試行0回、fallbackなし。Ritsuの固定実装は各言語1回、
Hayateは各言語3 valid sample、Work mode文書はRitsu 3回を直列実行した。

| 担当・対象 | E2E秒 | 機能・hidden test | 固定API / 厳格条件 | command・sandbox境界 |
|---|---|---|---|---|
| Ritsu TypeScript | 135.967982125 | 自作8/8、hidden 5/5 | 98/100、format差分のみ | repository差分なし。per-run強制は未実証 |
| Ritsu Go | 159.303889041 | 自作8/8、hidden 4/4 | 98/100、format差分のみ | 同上 |
| Ritsu Rust | 157.047179125 | 自作8/8、hidden 4/4 | 98/100、format差分のみ | 同上 |
| Hayate TypeScript run 1/2/3 | 135.956455 / 110.465254 / 120.798567 | 機能1/3 | 厳格0/3。API誤認・分岐欠落等 | 未観測log断定あり。独立監査なし |
| Hayate Go run 1/2-valid/3 | 124.996851 / 122.292661 / 132.744403 | 機能2/3 | 厳格1/3。固定API変更あり | 許可外`ls`自己申告あり。独立監査なし |
| Hayate Rust valid 1/2/3 | 114.212109 / 111.678052 / 111.980911 | 機能3/3 | 厳格1/3 | valid 2/3で許可外`true`自己申告。独立監査なし |

Hayate平均はTypeScript 122.406759秒、Go 126.677972秒、Rust 112.623690秒だった。
Ritsu Work mode文書3回は100.398700 / 82.451175 / 89.075671秒、平均90.641848秒、
CV 8.18%、固定rubric 95 / 90 / 87、pass候補2/3だった。未指定のretry log semanticsを
runごとに逆向きへ確定したため、構造の安定と意味精度の安定を分けて扱う。

9 valid Hayate runはrepository manifestがbefore/after一致したが、これは事後検知であり、
per-runのmodel、effort、fresh性、tool・network非逸脱、予防的sandbox強制は`unknown`である。
Ritsuも同様に自己申告やmanifest一致を技術的強制のpassへ変換しない。機能、hidden test、
固定API、command compliance、sandbox証拠は別軸であり、`unknown`を別軸のpassで相殺しない。

## 判断証跡

以下は判断時に参照したrepository内成果物の論理パス、byte数、SHA-256である。内容は本ADRへ
要約済みで、元成果物は正本ではない。

| 論理パス | bytes | SHA-256 |
|---|---:|---|
| `docs/work/ritsu-code-implementation-pilot-result.md` | 7,074 | `46a236f0bf3dd34c5ef544bd89f10b617ca2f6d784d5ed6187c1d5492f53d14e` |
| `docs/work/ritsu-go-rust-code-pilot-result.md` | 8,424 | `cc238fae66a1af2612b070085e4c068b8cef07a5f8cd9831223c2d8693fa1692` |
| `docs/work/ritsu-work-mode-variability-result.md` | 6,917 | `cfc6d1b38c27c373970ab87bb04b423549e567abe3b3f4ad2bf0c7059021faeb` |
| `docs/work/hayate-trilang-three-runs-result.md` | 8,499 | `677e87f367232db0e2cbe3ab4f4047a880068304738fa4f5c6be9b87d5a261c7` |
| `docs/work/ritsu-code-implementation-pilot-v2-contract.md` | 8,283 | `91b52dc5b62b0832d4218f94da68bbc626e29b81c522dbfd1fcf8e22ca67c29b` |
| `docs/work/ritsu-go-rust-code-pilot-contract.md` | 9,808 | `43c884d9139cab4911f19786ead4f146d29ff0e9d6319ba098429a6c541e401b` |
| `docs/work/ritsu-go-code-pilot-v2-runtime-contract.md` | 2,028 | `59db0e2b6e309a4c7540e414ccdf61f2fb46a7ff8d6882909a279fc807be546f` |
| `docs/work/ritsu-rust-code-pilot-runtime-addendum.md` | 1,633 | `a433eec289e82d103c8de2117f9f10ae10628661c6cc1386128586f0a7e26a50` |
| `docs/work/hayate-trilang-three-runs-runbook.md` | 4,309 | `f69c1266a9489d3c41457b4c4c0ba424327a7a2bc54b4d90f7028c897f1325f4` |
| `docs/work/ritsu-work-mode-variability-v2-contract.md` | 6,249 | `78adb5f065fc6ec7035bc862a43ce70e5c7916d15ae62cd35a1f0010f49bd25e` |
| `docs/work/ritsu-work-mode-variability-v2-run-01.md` | 6,566 | `bd9976e2755c97274255881c5e2d038d31c7427ae850547b364d1658b6caf43f` |
| `docs/work/ritsu-work-mode-variability-v2-run-02.md` | 5,166 | `03e3b2db702693f05ef5ab165ce2fc494c8bba5a559cf4d418653fa7e99a7f59` |
| `docs/work/ritsu-work-mode-variability-v2-run-03.md` | 5,874 | `5982c43909dd11beb91f518dcc43c56663339bafa9ba8181a4305d7430e4d19c` |
| `docs/work/ritsu-platform-capability-assessment.md` | 4,015 | `fb26862c409f2961d80078e28a3f468b99975de57dcd81215d93e908061f9378` |
| `docs/work/ritsu-participation-human-decision-record.md` | 1,589 | `a806836af10d69bcd42a02cc4059bef2d4ce5427a1019e2072f91c4bda3c1045` |
| `docs/work/hayate-participation-human-decision-record.md` | 2,846 | `b6d6b1eaa18c3b539c75291f670f6afe59242b0c429ffe3d58f8ffd7c9559931` |
| `docs/work/ritsu-hayate-promotion-draft.md` | 8,083 | `0b81258eade2fed71155162390796cbf157634e546688d44b0bef2597f63f6a6` |
| `docs/work/ritsu-hayate-promotion-risk-review.md` | 12,221 | `ebc7b93c010c20e740abdc27793e55ad3bc3c8d04816e8b9770a9ed39a4b649e` |

Rinの昇格レビューは初回P0 1 / P1 6 / P2 2。技術的write隔離、加入の意味、Hayateの
全条件routing、原因別切替、機能/compliance二軸、実装ゲート、ADR-0020との関係を反映し、
差分再レビューで全P0/P1解消、新規P0/P1なし、正本化可能となった。人間はこの境界を条件に
両名の役割採用を承認し、一般的速度優位や包括権限は承認していない。

## 以前の判断との関係

[ADR-0020](ADR-0020-ritsu-implementation-worker.md)は、Ritsuを先行して段階的に迎えた当時の
判断として保持する。本ADRはADR-0020を削除または過去へ遡って変更せず、2026-07-21以降の
加入状態とroutingを置き換える。Stage RとStage Hの完了は役割採用の完了だけを意味し、
未実証の性能、platform能力、技術的write隔離、長期再現性を完了扱いしない。

段階的な参加判断、最終昇格案、Rinレビューの判断要旨とdigestは本ADRへ吸収済みである。
