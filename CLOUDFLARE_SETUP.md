# Cloudflare Pages Setup Instructions

## Current Issue: 404 Error

If you're seeing a 404 error on `https://ctrl-build.pages.dev/`, follow these steps:

## Step 1: Verify Cloudflare Pages Settings

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages**
2. Select your `ctrl-build` project
3. Go to **Settings** → **Builds & deployments**

### Required Settings:

- **Framework preset**: `Next.js` (or leave as "None" if Next.js is auto-detected)
- **Build command**: `npm run build`
- **Build output directory**: Leave **EMPTY** (Cloudflare will auto-detect) OR set to `.next`
- **Root directory**: Leave **EMPTY** (or `/`)
- **Node.js version**: `20`

## Step 2: Check Build Logs

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Check if the build completed successfully
4. Look for any errors in the build logs

## Step 3: Verify Environment Variables

Go to **Settings** → **Environment variables** and ensure these are set:

### Production Environment:
- `NEXT_PUBLIC_SITE_URL` = `https://ctrl-build.pages.dev` (or your custom domain)
- `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anonymous key
- `GEMINI_API_KEY` = Your Google Gemini API key
- `GEMINI_MODEL` = `gemini-2.5-flash` (optional)

## Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **Retry deployment** on the latest deployment
3. Or push a new commit to trigger a new deployment

## Step 5: Check Custom Domain (if applicable)

If using a custom domain:
1. Go to **Custom domains** tab
2. Verify the domain is properly configured
3. Check DNS settings

## Common Issues

### Issue: Build succeeds but 404 on site
**Solution**: 
- Try leaving the "Build output directory" field **EMPTY** in Cloudflare Pages settings
- Cloudflare should auto-detect Next.js and use the correct output directory

### Issue: Build fails
**Solution**: 
- Check build logs for specific errors
- Verify all environment variables are set
- Ensure Node.js version is set to 20

### Issue: Site loads but routes don't work
**Solution**: 
- This is normal for Next.js - Cloudflare Pages handles routing automatically
- Dynamic routes should work via Cloudflare Pages Functions

## Next.js 16 on Cloudflare Pages

Next.js 16 is supported on Cloudflare Pages, but you may need to:
1. Ensure the build completes successfully
2. Leave output directory empty for auto-detection
3. Set all required environment variables

## Support

If issues persist:
1. Check Cloudflare Pages documentation: https://developers.cloudflare.com/pages/
2. Review build logs in Cloudflare Dashboard
3. Verify all environment variables are set correctly

