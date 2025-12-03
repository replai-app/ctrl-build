# Cloudflare Pages Deployment Guide

This guide will help you deploy CTRL — BUILD to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account
2. Node.js 20.x installed
3. Wrangler CLI installed globally: `npm install -g wrangler`

## Environment Variables

Set the following environment variables in Cloudflare Pages dashboard:

### Required Variables

- `NEXT_PUBLIC_SITE_URL` - Your production URL (e.g., `https://ctrl-build.com`)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `GEMINI_API_KEY` - Your Google Gemini API key
- `GEMINI_MODEL` - (Optional) Gemini model name, defaults to `gemini-2.5-flash`

### Supabase Service Role Key (for server-side operations)

If you need server-side Supabase operations, also add:
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (keep this secret!)

## Deployment Methods

### Method 1: Cloudflare Pages Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Connect your Git repository (GitHub, GitLab, or Bitbucket)
4. Configure build settings:
   - **Framework preset**: Next.js (Static HTML Export) or None
   - **Build command**: `npm run build`
   - **Build output directory**: `.next` (or leave empty for auto-detection)
   - **Root directory**: `/` (or leave empty)
   - **Node.js version**: 20
   - **Environment variables**: Add all required variables (see below)
5. Add all environment variables listed above
6. Click **Save and Deploy**

### Method 2: Wrangler CLI

1. Install Wrangler: `npm install -g wrangler`
2. Login to Cloudflare: `wrangler login`
3. Build the project: `npm run build`
4. Deploy: `npm run cf:deploy`

For preview deployments: `npm run cf:preview`

## Build Configuration

The project is configured with:
- **Images**: Unoptimized (Cloudflare handles optimization via CDN)
- **Server Actions**: 2MB body size limit
- **Output**: Standard Next.js build (Cloudflare Pages handles deployment)

## Important Notes

1. **Next.js 16 Support**: Cloudflare Pages has native support for Next.js 16
2. **API Routes**: All API routes will work as Cloudflare Pages Functions
3. **Middleware**: Supabase middleware is compatible with Cloudflare Pages
4. **Static Assets**: Automatically served via Cloudflare CDN

## Custom Domain Setup

1. In Cloudflare Pages dashboard, go to your project
2. Navigate to **Custom domains**
3. Add your domain (e.g., `ctrl-build.com`)
4. Follow DNS configuration instructions
5. SSL/TLS will be automatically provisioned

## Environment-Specific Deployments

### Production
- Uses `wrangler.toml` production environment
- Deploy via: `npm run cf:deploy`

### Preview
- Uses `wrangler.toml` preview environment
- Deploy via: `npm run cf:preview`

## Troubleshooting

### Build Failures

1. **Node.js Version**: Ensure Node.js 20.x is used
   - Check `.nvmrc` file
   - Set in Cloudflare Pages build settings

2. **Environment Variables**: Verify all required variables are set
   - Check Cloudflare Pages → Settings → Environment variables

3. **Build Output**: Ensure `.next` directory is generated
   - Run `npm run build` locally to verify

### Runtime Issues

1. **API Routes Not Working**: 
   - Verify `NEXT_PUBLIC_SITE_URL` is set correctly
   - Check Cloudflare Pages Functions logs

2. **Supabase Connection Issues**:
   - Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Check Supabase project settings

3. **Gemini API Errors**:
   - Verify `GEMINI_API_KEY` is set
   - Check API quota and limits

## Performance Optimization

Cloudflare Pages automatically provides:
- Global CDN distribution
- Edge caching
- DDoS protection
- SSL/TLS encryption
- Image optimization (via Cloudflare Images)

## Monitoring

1. **Analytics**: View in Cloudflare Pages dashboard
2. **Logs**: Check Functions logs in dashboard
3. **Performance**: Use Cloudflare Analytics

## Support

For issues specific to:
- **Cloudflare Pages**: [Cloudflare Docs](https://developers.cloudflare.com/pages/)
- **Next.js on Cloudflare**: [Next.js Docs](https://nextjs.org/docs)
- **Project-specific**: Check repository issues

