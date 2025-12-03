# Cloudflare Pages 404 Troubleshooting

## Issue
Getting 404 error on `https://ctrl-build.pages.dev/`

## Possible Causes

1. **Build Output Directory**: Cloudflare Pages might not be serving the `.next` directory correctly
2. **Next.js 16 Compatibility**: Cloudflare Pages may need specific configuration for Next.js 16
3. **Missing index.html**: Cloudflare Pages might be looking for a static `index.html` file

## Solutions to Try

### Option 1: Verify Build Output Directory in Cloudflare Dashboard

1. Go to Cloudflare Dashboard → Pages → Your Project
2. Go to Settings → Builds & deployments
3. Verify:
   - **Build command**: `npm run build`
   - **Build output directory**: `.next` (or leave empty for auto-detection)
   - **Root directory**: `/` (or leave empty)

### Option 2: Check Build Logs

1. Go to Cloudflare Dashboard → Pages → Your Project
2. Check the latest deployment logs
3. Look for any errors or warnings during the build process
4. Verify the build completed successfully

### Option 3: Try Different Output Directory

If `.next` doesn't work, try:
- Leave output directory empty (Cloudflare auto-detects Next.js)
- Or use `out` if using static export

### Option 4: Environment Variables

Ensure all required environment variables are set in Cloudflare Pages:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GEMINI_API_KEY`

### Option 5: Check Deployment Status

1. Verify the deployment completed successfully
2. Check if there are any failed deployments
3. Try redeploying from the latest commit

### Option 6: Custom Domain vs Pages.dev

If using a custom domain:
- Verify DNS is configured correctly
- Check CNAME records point to your Pages project

## Current Configuration

- **Build command**: `npm run build`
- **Output directory**: `.next` (configured in wrangler.toml)
- **Framework**: Next.js 16.0.7
- **Node version**: 20

## Next Steps

1. Check Cloudflare Pages dashboard for build/deployment errors
2. Verify environment variables are set
3. Check if the build is completing successfully
4. Review deployment logs for specific errors

