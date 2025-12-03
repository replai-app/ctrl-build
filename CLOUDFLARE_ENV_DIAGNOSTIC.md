# Cloudflare Pages Environment Variables Diagnostic

## Critical Issue: Variables Not Reaching Build

Your build logs show:
```
Build environment variables: (none found)
```

This means **Cloudflare Pages is not passing environment variables to the build process**, even if they appear in the dashboard.

## Step-by-Step Verification

### 1. Check Variable Environment Setting

**This is the most common issue:**

1. Go to **Cloudflare Dashboard** → **Pages** → **ctrl-build** → **Settings** → **Environment variables**
2. Look at the **Environment** column for each variable
3. **CRITICAL:** If it says "Preview" or "Branch", it won't work for Production
4. Variables MUST be set for **"Production"** or **"All environments"**

### 2. Verify Variable Names (Exact Match Required)

Variable names are **case-sensitive** and must match exactly:

- ✅ `NEXT_PUBLIC_SUPABASE_URL` (correct)
- ❌ `NEXT_PUBLIC_SUPABASE_url` (wrong - lowercase)
- ❌ `next_public_supabase_url` (wrong - all lowercase)
- ❌ `NEXT_PUBLIC_SUPABASE-URL` (wrong - hyphen instead of underscore)

### 3. Check Variable Type

For `NEXT_PUBLIC_*` variables:
- **Type must be:** "Plain text" (NOT "Secret")
- Secret variables are encrypted and may not be available at build time for `NEXT_PUBLIC_*` vars

### 4. Delete and Re-add Variables

Sometimes Cloudflare Pages has issues with existing variables. Try:

1. **Delete all 4 variables** (click the trash icon)
2. **Wait 30 seconds**
3. **Add them back one by one:**
   - Variable name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: (your Supabase URL)
   - Type: **Plain text**
   - Environment: **Production** (or "All environments")
   - Click **Save**
4. Repeat for all 4 variables

### 5. Verify After Adding

After adding each variable, you should see:
- ✅ Variable appears in the list
- ✅ Environment column shows "Production" or "All environments"
- ✅ Type shows "Plain text" (for NEXT_PUBLIC_* vars)

### 6. Force a Fresh Build

After re-adding variables:

1. Go to **Deployments** tab
2. Click **Retry deployment** on the latest deployment
3. **OR** make a small code change and push to trigger a new build
4. Check the build logs - should now show:
   ```
   Build environment variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, ...
   ```

## Alternative: Check Build Settings

Sometimes the issue is with build configuration:

1. Go to **Settings** → **Builds & deployments**
2. Check **Framework preset** - should be **"Next.js"**
3. **Build command** should be: `npm run build`
4. **Build output directory** should be **EMPTY** (Cloudflare auto-detects `.next`)

## Still Not Working?

If variables are set correctly but still showing "(none found)":

1. **Contact Cloudflare Support** - this may be a platform issue
2. **Try setting variables for "All environments"** instead of just "Production"
3. **Check if there's a "Save" button at the bottom** of the Environment variables page that you haven't clicked
4. **Verify you're editing the correct project** (check the project name in the URL)

## Expected Result

After fixing, your build logs should show:
```
Build environment variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, GEMINI_API_KEY, NEXT_PUBLIC_SITE_URL
```

NOT:
```
Build environment variables: (none found)
```

