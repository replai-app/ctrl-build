# Fixing 404 Error on Cloudflare Pages

## The Problem
Getting `HTTP ERROR 404` on `https://ctrl-build.pages.dev/`

## Root Cause
Cloudflare Pages might not be detecting or serving the Next.js build correctly.

## Solution Steps

### Step 1: Check Cloudflare Pages Dashboard Settings

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **ctrl-build** project
3. Go to **Settings** → **Builds & deployments**

### Step 2: Configure Build Settings

**CRITICAL SETTINGS:**

1. **Framework preset**: 
   - Select **"Next.js"** from the dropdown
   - OR leave as "None" if auto-detection is enabled

2. **Build command**: 
   ```
   npm run build
   ```

3. **Build output directory**: 
   - **LEAVE THIS FIELD COMPLETELY EMPTY**
   - Cloudflare will auto-detect `.next` directory
   - Do NOT set it to `.next` manually

4. **Root directory**: 
   - Leave empty (defaults to `/`)

5. **Node.js version**: 
   - Set to **20**

### Step 3: Verify Environment Variables

Go to **Settings** → **Environment variables** → **Production**

Ensure these are set:
- `NEXT_PUBLIC_SITE_URL` = `https://ctrl-build.pages.dev`
- `NEXT_PUBLIC_SUPABASE_URL` = (your Supabase URL)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your Supabase key)
- `GEMINI_API_KEY` = (your Gemini API key)

### Step 4: Check Build Logs

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Check the build logs for:
   - ✅ Build completion message
   - ❌ Any errors or warnings
   - 📦 Output directory detection

**What to look for:**
- Should see: "Detected Next.js framework"
- Should see: "Build completed successfully"
- Should NOT see: "No output directory found"

### Step 5: Redeploy

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click **Retry deployment** (three dots menu)
4. Wait for build to complete
5. Check the deployment URL again

### Step 6: Alternative - Manual Trigger

If retry doesn't work:
1. Go to your GitHub repository
2. Make a small change (add a space to README)
3. Commit and push
4. This will trigger a new deployment

## Common Issues & Fixes

### Issue: "Build output directory not found"
**Fix**: Leave "Build output directory" field EMPTY in Cloudflare settings

### Issue: Build succeeds but 404 persists
**Fix**: 
1. Check if Framework preset is set to "Next.js"
2. Verify Node.js version is 20
3. Clear Cloudflare cache (if using custom domain)

### Issue: Environment variables not loading
**Fix**: 
1. Ensure variables are set for "Production" environment
2. Redeploy after adding variables

### Issue: "Next.js not detected"
**Fix**: 
1. Manually set Framework preset to "Next.js"
2. Ensure `package.json` has `next` dependency
3. Verify build command is `npm run build`

## Verification Checklist

- [ ] Framework preset = "Next.js"
- [ ] Build command = `npm run build`
- [ ] Build output directory = **EMPTY**
- [ ] Node.js version = 20
- [ ] All environment variables set
- [ ] Latest deployment shows "Success"
- [ ] Build logs show no errors

## Still Not Working?

1. **Check deployment status**: Go to Deployments → Check if status is "Success"
2. **Review build logs**: Look for specific error messages
3. **Try custom domain**: Sometimes `.pages.dev` has caching issues
4. **Contact Cloudflare Support**: If all else fails, reach out with deployment logs

## Important Notes

- **DO NOT** set build output directory to `.next` manually
- **DO** let Cloudflare auto-detect Next.js
- **DO** ensure Framework preset is "Next.js"
- Next.js 16 is supported natively by Cloudflare Pages (no adapter needed)

