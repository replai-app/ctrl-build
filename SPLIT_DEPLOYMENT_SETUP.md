# Split Deployment Setup: Frontend (Cloudflare) + API (Vercel)

This guide explains how to keep your frontend on Cloudflare Pages while hosting your API routes on Vercel. Your domain stays on Cloudflare DNS (no transfer needed).

## Architecture

- **Domain DNS**: Cloudflare (stays there, no transfer needed)
- **Frontend**: Cloudflare Pages (static Next.js build)
- **API Server**: Vercel (running Next.js API routes)
- **Communication**: Frontend calls API via environment variable `NEXT_PUBLIC_API_URL`

## Step 1: Deploy API Routes to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository (`monk-haus/ctrl-build`)
4. Vercel will auto-detect Next.js settings
5. Add environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL` (Plain text)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Plain text)
   - `GEMINI_API_KEY` (Secret)
   - `NEXT_PUBLIC_SITE_URL` (Plain text) - Set to `https://ctrl-build.com`
6. Click "Deploy"
7. After deployment, you'll get a URL like `https://ctrl-build.vercel.app` - **Copy this URL**

## Step 2: Configure Cloudflare Pages Frontend

1. In Cloudflare Pages dashboard → Settings → Environment variables, add:
   - Variable name: `NEXT_PUBLIC_API_URL`
   - Value: Your Vercel deployment URL (e.g., `https://ctrl-build.vercel.app`)
   - Type: Plain text
   - Environment: Production

2. The frontend code is already configured to use `NEXT_PUBLIC_API_URL` if set, otherwise falls back to relative paths.

## Step 3: Configure Domain DNS (Keep on Cloudflare)

Your domain stays on Cloudflare DNS. Configure it to point to Cloudflare Pages:

1. Go to Cloudflare Dashboard → Your Domain → DNS → Records
2. Add/Update CNAME record:
   - Type: `CNAME`
   - Name: `@` (or your root domain)
   - Target: `ctrl-build.pages.dev` (your Cloudflare Pages subdomain)
   - Proxy status: **Enabled** (orange cloud) - OK for static frontend
   - TTL: Auto

3. For www subdomain (optional):
   - Type: `CNAME`
   - Name: `www`
   - Target: `ctrl-build.pages.dev`
   - Proxy: Enabled
   - TTL: Auto

## Step 4: Test the Setup

1. Wait 5-10 minutes for DNS propagation
2. Visit `https://ctrl-build.com` (your Cloudflare Pages frontend)
3. Try the text refinement feature
4. Open browser console (F12) → Network tab
5. Verify API calls are going to your Vercel URL (`https://ctrl-build.vercel.app/api/reconstruct`)
6. Check that the text refinement works correctly

## Benefits

✅ **Domain stays on Cloudflare DNS** (no transfer needed)
✅ **Frontend on Cloudflare Pages** (fast CDN, free tier, DDoS protection)
✅ **API routes on Vercel** (proper Next.js support, environment variables work)
✅ **No environment variable issues** (Vercel handles them correctly)
✅ **Scalable** (can scale API independently)
✅ **Best of both worlds** (Cloudflare CDN + Vercel API)

## File Structure

The codebase is already set up for this:
- `src/lib/api-client.ts` - Handles API URL configuration
- All API calls use `getApiUrl()` which checks `NEXT_PUBLIC_API_URL`
- Falls back to relative paths if not set (for local development)

## Troubleshooting

**CORS Errors:**
- Add your Cloudflare Pages domain to your API platform's CORS settings
- Or configure CORS in your API routes

**API Not Found:**
- Verify `NEXT_PUBLIC_API_URL` is set in Cloudflare Pages
- Check the API server is deployed and accessible
- Test the API URL directly in browser

