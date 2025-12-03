# Cloudflare DNS Setup for Vercel Deployment

You can keep your domain on Cloudflare DNS and point it to Vercel without transferring the domain. Here's how:

## Option 1: Point Domain to Vercel (Recommended - Simplest)

### Step 1: Add Domain to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain: `ctrl-build.com` (and `www.ctrl-build.com` if needed)
3. Vercel will show you DNS records to add

### Step 2: Configure Cloudflare DNS

1. Go to Cloudflare Dashboard → Your Domain → DNS → Records
2. Add/Update these records:

**For root domain (`ctrl-build.com`):**
- Type: `CNAME`
- Name: `@` (or root domain)
- Target: `cname.vercel-dns.com`
- Proxy status: **DNS only** (gray cloud) - Important! Vercel needs direct DNS
- TTL: Auto

**For www subdomain (if needed):**
- Type: `CNAME`
- Name: `www`
- Target: `cname.vercel-dns.com`
- Proxy status: **DNS only** (gray cloud)
- TTL: Auto

### Step 3: Verify in Vercel

1. Go back to Vercel → Domains
2. Wait for DNS propagation (usually 1-5 minutes)
3. Vercel will automatically provision SSL certificate

## Option 2: Split Deployment (Cloudflare Pages Frontend + Vercel API)

If you want to use Cloudflare Pages for the frontend:

### Step 1: Deploy Frontend to Cloudflare Pages

1. Keep your current Cloudflare Pages deployment
2. Point your domain to Cloudflare Pages:
   - Type: `CNAME`
   - Name: `@`
   - Target: `ctrl-build.pages.dev` (or your Pages subdomain)
   - Proxy: Enabled (orange cloud) - OK for static frontend

### Step 2: Deploy API to Vercel

1. Deploy your project to Vercel (same repo)
2. Get your Vercel deployment URL: `https://ctrl-build.vercel.app`

### Step 3: Configure Frontend to Use Vercel API

1. In Cloudflare Pages → Settings → Environment Variables
2. Add:
   - Variable name: `NEXT_PUBLIC_API_URL`
   - Value: `https://ctrl-build.vercel.app` (your Vercel URL)
   - Type: Plain text
   - Environment: Production

### Step 4: Update Vercel Environment Variables

1. In Vercel Dashboard → Settings → Environment Variables
2. Add all required variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` (should be `https://ctrl-build.com`)

## Important Notes

### Cloudflare Proxy (Orange Cloud) vs DNS Only (Gray Cloud)

- **Orange Cloud (Proxy)**: Traffic goes through Cloudflare CDN
  - ✅ Good for static frontend (faster, DDoS protection)
  - ❌ Can cause issues with API routes (may interfere with Vercel)
  
- **Gray Cloud (DNS Only)**: Direct DNS resolution, no Cloudflare proxy
  - ✅ Required for Vercel to work properly
  - ✅ Better for API routes
  - ❌ No Cloudflare CDN benefits

### For Split Deployment

- **Frontend (Cloudflare Pages)**: Can use Orange Cloud (proxy enabled)
- **API (Vercel)**: Must use Gray Cloud (DNS only) if pointing domain directly

### For Full Vercel Deployment

- Use Gray Cloud (DNS only) for the domain pointing to Vercel
- Vercel has its own CDN, so you don't need Cloudflare's proxy

## Testing

After setting up DNS:

1. Wait 5-10 minutes for DNS propagation
2. Visit `https://ctrl-build.com`
3. Test the text refinement feature
4. Check browser console for API calls
5. Verify API routes are working

## Troubleshooting

**Domain not resolving:**
- Check DNS records are correct
- Ensure proxy is set to "DNS only" (gray cloud) for Vercel
- Wait longer for DNS propagation (can take up to 24 hours)

**SSL Certificate issues:**
- Vercel automatically provisions SSL
- Cloudflare SSL + Vercel SSL can conflict - use DNS only mode

**API not working:**
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify Vercel deployment is live
- Check browser console for CORS errors

