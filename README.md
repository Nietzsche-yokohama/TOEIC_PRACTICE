# TOEIC Drill

TOEICのリスニング・リーディングをパート別に、スキマ時間でサクッと練習できる個人用PWA。

## 構成

- フロント: Vite + React + TypeScript（PWA、`vite-plugin-pwa`）
- ホスティング: Cloudflare Pages
- 進捗同期API: Cloudflare Worker（`worker/index.ts`）
- 永続化: Cloudflare KV（ユーザーの学習履歴・成績のみ。問題データはフロントに同梱）
- ローカル保存: IndexedDB（オフライン優先、離脱時も自動同期）
- リスニング音声: ブラウザの Web Speech API（追加コスト・追加インフラなし）

問題バンク（Part1〜7、オリジナル作成）は `src/data/part1.ts` 〜 `part7.ts` に直接同梱しており、オフラインでも即座に出題できます。

## ローカル開発

```bash
npm install
npm run dev          # フロント (http://localhost:5173)
npm run worker:dev    # Worker (別ターミナル, http://localhost:8787)
```

`.env.example` を `.env.local` にコピーし、`VITE_API_BASE` / `VITE_APP_TOKEN` を設定すると進捗のクラウド同期が有効になります（未設定でもローカルのみで動作します）。

## Cloudflareへのデプロイ手順

1. **Cloudflare API Tokenを発行**（Cloudflare Dashboard → My Profile → API Tokens）。必要な権限: `Workers Scripts:Edit`, `Workers KV Storage:Edit`, `Cloudflare Pages:Edit`, `Account:Read`
2. **KV namespaceを作成**し、出力された id を `wrangler.toml` に反映:
   ```bash
   npx wrangler kv namespace create STATE_KV
   npx wrangler kv namespace create STATE_KV --preview
   ```
   `wrangler.toml` の `<KV_NAMESPACE_ID>` / `<KV_PREVIEW_ID>` を実際のidに書き換えてコミットする。
3. **APP_TOKEN**（任意の英数字の秘密文字列）を決めて、Workerにシークレット登録:
   ```bash
   npx wrangler secret put APP_TOKEN
   ```
4. **GitHubリポジトリのSecrets**（Settings → Secrets and variables → Actions）に登録:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `VITE_API_BASE`（例: `https://toeic-drill-worker.<your-subdomain>.workers.dev`）
   - `VITE_APP_TOKEN`（手順3と同じ値）
5. `master` ブランチにpushすると、GitHub Actions (`.github/workflows/deploy.yml`) がPages・Workerを自動デプロイする。

## 問題を追加する

`src/data/part1.ts` 〜 `part7.ts` に `QuestionGroup` を追加するだけで反映されます。フロントに同梱されているため、KVの再構築は不要で、次のデプロイで即反映されます。

### 作問ルール（必ず守る）

**1. 正解は1つだけ。「どちらも正解になりうる」選択肢を作らない。**

- 誤答は「写真・音声・本文から**明確に否定できる**」ものにする。「たぶん違う」「写っていないから多分ない」程度では不可。
- Part 1 では、静止画から判別できない主張を選択肢にしない。特に次は禁止:
  - **動作の向き**（`taking off the shelf` ↔ `putting back on the shelf`、`being lowered` ↔ `being raised`）。静止画ではどちらか決められない。正解には向きに依存しない描写（`is holding` / `is hanging`）を使う。
  - **見えない状態**（`The stove has been turned off.` のように、火や電源が写真に写らないもの）。
  - **数量・全称の曖昧さ**（`The bench is unoccupied.` は複数のベンチが写っていると成立してしまう。`All of the benches are unoccupied.` のように範囲を明示する）。
- Part 5・6 では、文法的に2つ成立しないか必ず確認する。よくある事故:
  - `will launch` の誤答に `launches` を置く（現在形も予定の未来を表せるため両方正解になる）。
  - 現在完了 + `since` / `for` の選択で、空欄後が「期間」か「起点」かが曖昧（`for the past three years` は for のみ、`since 2020` は since のみが成立するように書く）。
  - 接続副詞の設問で `Additionally` と `Therefore` を並べる（追加とも因果とも読めてしまう文脈が生まれやすい）。
- 追加したら、**誤答1つずつについて「なぜ明確に誤りか」を1文で言えるか**を確認する。言えないものは誤答として不適格。

**2. 解説は選択肢の記号 `(A)(B)(C)` で書かない。**

出題時に `buildSession()` が選択肢をシャッフルする（正解が(A)に偏らないようにするため）。解説では選択肢の英文をそのまま引用する:

```
✗ (B)は電話の描写だが、男性は電話で話していない。
✓ 「He is talking on the phone.」→ 電話で話している様子はない。
```

**3. Part 3・4・6・7 は「1つの会話・トーク・文書 + 設問3〜4問」を1 `QuestionGroup` にまとめる。**

同じ `QuestionGroup` の設問は連続して出題され、画面上部に「トーク 1 / 3 ・ 設問 2 / 3」と表示される。設問を別グループに分けると、どの音声・文書に対する設問か分からなくなる。

**4. 設問が話者を性別で指す場合は、`audioScript` の各行に `gender` を必ず付ける。**

"What does **the man** suggest?" のような設問は、音声の男女が入れ替わると解けなくなる。`gender: 'male' | 'female'` を指定すると、その話者には男性/女性の声が固定で割り当てられる（端末に性別の分かる声が無い場合は声色で区別する）。指定を忘れると声がランダムに決まり、同性の声が2つ選ばれた時点で正解不能になる。

```ts
audioScript: [
  { speaker: 'A', gender: 'female', text: 'Hi Tom, did the shipment arrive today?' },
  { speaker: 'B', gender: 'male', text: "No, actually. There's a delay." },
],
```
