# Split Deployment Setup: Frontend (Cloudflare) + API (Separate Platform)

This guide explains how to keep your frontend on Cloudflare Pages while hosting your API routes on a platform that properly supports Next.js API routes and environment variables (like Vercel, Railway, or Render).

## Architecture

- **Frontend**: Cloudflare Pages (static Next.js build)
- **API Server**: Separate platform (Vercel/Railway/Render) running Next.js API routes
- **Communication**: Frontend calls API via environment variable `NEXT_PUBLIC_API_URL`

## Step 1: Deploy API Routes to Separate Platform

### Option A: Vercel (Recommended - Best Next.js Support)

1. Create a new Vercel project
2. Connect your GitHub repository
3. Set **Root Directory** to your project root
4. Set **Build Command**: `npm run build`
5. Set **Output Directory**: `.next`
6. Add environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL` (Plain text)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Plain text)
   - `GEMINI_API_KEY` (Secret)
   - `NEXT_PUBLIC_SITE_URL` (Plain text)
7. Deploy - you'll get a URL like `https://ctrl-build-api.vercel.app`

### Option B: Railway

1. Create new Railway project
2. Connect GitHub repository
3. Set environment variables
4. Deploy - you'll get a URL like `https://ctrl-build-api.up.railway.app`

### Option C: Render

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy - you'll get a URL like `https://ctrl-build-api.onrender.com`

## Step 2: Update Frontend Configuration

1. In Cloudflare Pages dashboard, add environment variable:
   - Variable name: `NEXT_PUBLIC_API_URL`
   - Value: Your API server URL (e.g., `https://ctrl-build-api.vercel.app`)
   - Type: Plain text
   - Environment: Production

2. The frontend code is already configured to use `NEXT_PUBLIC_API_URL` if set, otherwise falls back to relative paths.

## Step 3: Update API Routes (If Needed)

The API routes are already set up. They just need to be deployed to a platform that supports Next.js API routes.

## Step 4: Test

1. Visit your Cloudflare Pages site
2. Try the text refinement feature
3. Check browser console for API calls
4. Verify they're going to your separate API server

## Benefits

✅ **Frontend stays on Cloudflare Pages** (fast CDN, free tier)
✅ **API routes work properly** (proper environment variable support)
✅ **No environment variable issues** (API platform handles them correctly)
✅ **Scalable** (can scale API independently)

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

