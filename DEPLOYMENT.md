# Deployment

## Vercel (one-click)

1. Push this project to GitHub.
2. In Vercel, click **Add New Project** and import the repo.
3. Framework preset: **Other**.
4. Add environment variables:
   - `OPENAI_API_KEY` = your key
   - `OPENAI_MODEL` = `gpt-4.1-mini` (optional)
5. Click **Deploy**.

Vercel serves static files and uses `/api/chat` from `api/chat.js`.

## Render (one-click via render.yaml)

1. Push this project to GitHub.
2. In Render, click **New +** > **Blueprint**.
3. Connect your repo and select it.
4. Render will read `render.yaml` automatically.
5. Set `OPENAI_API_KEY` when prompted.
6. Click **Apply**.

Render runs `server.mjs` and serves both frontend and `/api/chat`.
