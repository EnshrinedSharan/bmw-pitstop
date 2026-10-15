# Publishing BMW Pitstop (Vercel + Render)

The frontend (Next.js) runs on Vercel and the API (FastAPI) runs on Render. The browser only talks to
Vercel; `next.config.ts` rewrites every `/api/*` request to the Render service named in `BMWPM_API_URL`.

## 1. Backend on Render

1. In Render, choose **New → Blueprint** and select this GitHub repository. Render reads `render.yaml`.
2. When asked for the `sync: false` values, enter:
   - `BMWPM_ALLOWED_HOSTS` = `bmw-pitstop-api.onrender.com` (the service's onrender.com host name)
   - `BMWPM_ALLOWED_ORIGINS` = your Vercel URL, e.g. `https://bmw-pitstop.vercel.app`
     (add any custom domain too, comma-separated). You can fill this in after step 2 and redeploy.
   - `OPENAI_API_KEY` = leave empty for a public site. Without it the app uses its supplied replays.
3. Deploy. The build installs the Python packages and seeds the SQLite database from the committed
   G60 source documents (about a minute). Check `https://<service>.onrender.com/api/v1/health`.

## 2. Frontend on Vercel

1. In Vercel, choose **Add New → Project** and import the same repository. Vercel detects Next.js.
2. Add the environment variable `BMWPM_API_URL` = `https://<service>.onrender.com` (no trailing slash).
3. Deploy, then put the resulting URL into Render's `BMWPM_ALLOWED_ORIGINS` if you have not yet.

## Limits of the hosted copy

- **Data resets.** The free Render plan has no persistent disk, so PM decisions, uploads and Reddit runs
  return to the seeded state whenever the service restarts or redeploys. Add a Render disk mounted at a
  path set in `BMWPM_DATA_DIR` (paid plan) to keep them.
- **Cold starts.** Free Render services sleep after 15 idle minutes; the first request then takes ~1 minute.
- **Seeded data only.** The hosted database contains the four committed G60 sources, not the local
  `.local` workspace (its Reddit runs and backups are not in Git).
- **Upload size.** Vercel proxies requests with a body limit of about 4.5 MB, so large document uploads
  through the hosted site may fail.
- **Public access.** Everyone with the URL can view the documents and record decisions.
