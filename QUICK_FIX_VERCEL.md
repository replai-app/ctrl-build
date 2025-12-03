# Quick Fix: Point Domain to Vercel

Your domain `ctrl-build.com` is currently pointing to Cloudflare Pages, which isn't passing environment variables. Since Vercel is already working, let's point your domain there.

## Step 1: Add Domain to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `ctrl-build` project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `ctrl-build.com`
6. Click **Add**
7. Vercel will show you DNS records to add

## Step 2: Update Cloudflare DNS

1. Go to Cloudflare Dashboard → Your Domain (`ctrl-build.com`) → **DNS** → **Records**

2. **Find and update your existing CNAME record** (or add new one):
   - **Type**: `CNAME`
   - **Name**: `@` (or root domain)
   - **Target**: `cname.vercel-dns.com`
   - **Proxy status**: **DNS only** (gray cloud) ⚠️ **CRITICAL** - Must be gray, not orange
   - **TTL**: Auto

3. **For www subdomain** (if you want it):
   - **Type**: `CNAME`
   - **Name**: `www`
   - **Target**: `cname.vercel-dns.com`
   - **Proxy status**: **DNS only** (gray cloud)
   - **TTL**: Auto

## Step 3: Verify in Vercel

1. Go back to Vercel → Domains
2. Wait 1-5 minutes for DNS propagation
3. Vercel will automatically provision SSL certificate
4. Status should change to "Valid Configuration"

## Step 4: Test

1. Visit `https://ctrl-build.com`
2. Try the login page - Supabase error should be gone
3. Test text refinement feature
4. Everything should work!

## Why This Works

- ✅ **Vercel handles environment variables correctly** (unlike Cloudflare Pages)
- ✅ **Domain stays on Cloudflare DNS** (no transfer needed)
- ✅ **SSL handled automatically** by Vercel
- ✅ **No split deployment complexity** needed

## Important: DNS Only Mode

**Critical**: The Cloudflare proxy (orange cloud) must be **disabled** (gray cloud) for Vercel to work properly. Orange cloud can interfere with Vercel's SSL and routing.

## Troubleshooting

**Domain not resolving:**
- Wait 5-10 minutes for DNS propagation
- Check DNS record is correct (target: `cname.vercel-dns.com`)
- Verify proxy is **gray** (DNS only), not orange

**SSL issues:**
- Vercel automatically provisions SSL
- Wait a few minutes after DNS propagation
- Clear browser cache

**Still seeing Supabase error:**
- Check Vercel environment variables are set
- Verify domain is pointing to Vercel (not Cloudflare Pages)
- Check browser console for actual errors

