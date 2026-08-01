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
