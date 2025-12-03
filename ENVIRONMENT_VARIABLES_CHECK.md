# Environment Variables Troubleshooting

## Supabase Error: "ERROR: Supabase not configured"

If you're seeing this error even though you've set the environment variables in Cloudflare Pages, here's how to verify:

### Step 1: Add Variables One by One (Required)

**Important:** Cloudflare Pages does NOT support uploading a `.env` file. You must add each variable individually.

1. Go to Cloudflare Dashboard → Pages → ctrl-build → Settings → Environment variables
2. Click **Add variable** for each one
3. Add these variables for **Production** environment:

   **Variable 1:**
   - Variable name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: (paste your Supabase project URL from your .env file)
   - Type: **Plain text** (not Secret, because it's a public variable)

   **Variable 2:**
   - Variable name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (paste your Supabase anonymous key from your .env file)
   - Type: **Plain text** (not Secret, because it's a public variable)

   **Variable 3:**
   - Variable name: `GEMINI_API_KEY`
   - Value: (paste your Gemini API key from your .env file)
   - Type: **Secret** (this should be encrypted)

   **Variable 4:**
   - Variable name: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://ctrl-build.com`
   - Type: **Plain text**

4. After adding each variable, click **Save** or **Add variable**
5. Make sure **Production** is selected (or select "All environments" if you want it for both Production and Preview)

### Step 2: Important Notes

- **`NEXT_PUBLIC_*` variables are replaced at BUILD TIME**
- If variables are added AFTER a build, they won't be in that deployment
- You MUST redeploy after adding/changing environment variables

### Step 3: Redeploy

After setting/changing environment variables:
1. Go to Deployments tab
2. Click **Retry deployment** on the latest deployment
3. OR push a new commit to trigger a fresh build

### Step 4: Verify Variables Are Actually Set

**Critical Check:** After adding variables, verify they appear in the dashboard:

1. Go to Cloudflare Dashboard → Pages → ctrl-build → Settings → Environment variables
2. You should see a list of all your variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`
3. Check the **Environment** column - make sure it says **Production** (not Preview)
4. If variables are missing or set for Preview only, add them again for Production

### Step 5: Verify in Build Logs

After redeploying, check the build logs:
- ❌ **"Build environment variables: (none found)"** = Variables are NOT set or not available
- ✅ **"Build environment variables: [list]"** = Variables are set (values are hidden for security)

**Your current build shows:** `Build environment variables: (none found)` - this confirms variables are not being passed to the build.

### Common Issues

1. **Variables set but still showing error:**
   - Variables might be set for wrong environment (Preview instead of Production)
   - Need to redeploy after adding variables

2. **Variables not available at runtime:**
   - `NEXT_PUBLIC_*` variables are injected at build time
   - Must rebuild/redeploy after adding them

3. **Console shows variables are undefined:**
   - Check browser console for actual values
   - Variables should be in the built JavaScript bundle

### Testing

After redeploying with variables set:
1. Open browser console (F12)
2. Check for any Supabase-related errors
3. Try signing in/signing up
4. Should work if variables are correctly set

