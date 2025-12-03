# Cloudflare Pages API Routes Configuration

## Current Issue: API Routes Returning 405

API routes like `/api/reconstruct` are returning `405 Method Not Allowed` because they're being served as static files instead of being executed as serverless functions.

## Solution

**CRITICAL:** Ensure Framework preset is set to "Next.js" in Cloudflare Pages:

1. Go to Cloudflare Dashboard → Pages → ctrl-build → Settings → Builds & deployments
2. **Framework preset**: Must be set to **"Next.js"** (not "None")
3. This enables Cloudflare to automatically convert Next.js API routes to Cloudflare Functions

## Why This Happens

- Next.js API routes (like `/api/reconstruct`) are dynamic and need server-side execution
- Without the "Next.js" Framework preset, Cloudflare Pages serves them as static HTML files
- Static files can't handle POST requests, resulting in 405 errors

## Verification

After setting Framework preset to "Next.js":
1. Redeploy the site
2. Check build logs - should see API routes being processed
3. Test `/api/reconstruct` with a POST request
4. Should return 200 instead of 405

## Note on Supabase Error

If you see "ERROR: Supabase not configured" even after setting environment variables:
- Ensure variables are set for **Production** environment
- Variables must be `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Redeploy after adding variables (they're only available after deployment)

