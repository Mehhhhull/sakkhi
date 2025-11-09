# Deploy to Vercel

## Prerequisites

1. ✅ Supabase project set up
2. ✅ Environment variables ready
3. ✅ GitHub repository (optional but recommended)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign in with GitHub/GitLab/Bitbucket

2. **Import Project:**
   - Click "Add New" → "Project"
   - Import your Git repository
   - Or upload your project folder

3. **Configure Project:**
   - Framework Preset: **Vite**
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live! 🎉

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Add Environment Variables:**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

5. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

## Environment Variables

Make sure to add these in Vercel dashboard:

| Variable Name | Value | Where to Find |
|--------------|-------|---------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Supabase → Settings → API |

## Post-Deployment Setup

### 1. Update Supabase Site URL

In Supabase dashboard:
- Go to **Authentication** → **URL Configuration**
- Add your Vercel URL to **Site URL**
- Add your Vercel URL to **Redirect URLs**

Example:
```
Site URL: https://your-app.vercel.app
Redirect URLs: https://your-app.vercel.app/**
```

### 2. Test Your Deployment

Visit your Vercel URL and test:
- ✅ Homepage loads
- ✅ Sign up/Login works
- ✅ Circle of One works
- ✅ Bharosa Library works
- ✅ Admin dashboard (for admin users only)

### 3. Setup Admin Users

If you haven't already, run these SQL scripts in Supabase:
1. `SETUP_ADMIN_ROLE.sql`
2. `SETUP_SPECIFIC_ADMINS.sql`

## Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain

2. **Update DNS:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or follow Vercel's instructions for your DNS provider

3. **Update Supabase:**
   - Add custom domain to Supabase redirect URLs

## Automatic Deployments

If you connected via Git:
- ✅ Push to `main` branch → Auto-deploy to production
- ✅ Push to other branches → Auto-deploy to preview
- ✅ Pull requests → Auto-deploy to preview URLs

## Troubleshooting

### Build Fails

**Check:**
- All dependencies in `package.json`
- Build command is correct: `npm run build`
- No TypeScript errors (if using TS)

**Solution:**
```bash
# Test build locally first
npm run build
```

### Environment Variables Not Working

**Check:**
- Variables start with `VITE_`
- Variables are added in Vercel dashboard
- Redeploy after adding variables

**Solution:**
- Go to Vercel → Settings → Environment Variables
- Add variables
- Redeploy: Deployments → Click "..." → Redeploy

### Authentication Not Working

**Check:**
- Supabase Site URL is set to your Vercel URL
- Redirect URLs include your Vercel URL
- Environment variables are correct

**Solution:**
- Update Supabase Authentication settings
- Add Vercel URL to allowed URLs

### 404 on Routes

**Check:**
- `vercel.json` exists in project root
- Rewrites are configured correctly

**Solution:**
- The `vercel.json` file should handle this
- If still issues, check Vercel logs

### Admin Dashboard Not Working

**Check:**
- Admin users are set up in Supabase
- Admin emails are correct in code
- Users have signed out and signed in again

**Solution:**
- Run `SETUP_SPECIFIC_ADMINS.sql` in Supabase
- Clear browser cache
- Sign out and sign in

## Performance Tips

1. **Enable Vercel Analytics:**
   - Go to project settings
   - Enable Web Analytics
   - Monitor performance

2. **Enable Vercel Speed Insights:**
   - Helps track Core Web Vitals
   - Free for hobby projects

3. **Optimize Images:**
   - Use WebP format
   - Compress images before uploading

## Monitoring

### Check Deployment Status:
- Vercel Dashboard → Deployments
- See build logs
- Check for errors

### Check Runtime Logs:
- Vercel Dashboard → Logs
- Real-time function logs
- Error tracking

## Updating Your App

### Via Git:
```bash
git add .
git commit -m "Update app"
git push
```
Vercel auto-deploys!

### Via CLI:
```bash
vercel --prod
```

## Cost

- **Hobby Plan:** Free
  - Unlimited deployments
  - 100GB bandwidth/month
  - Automatic HTTPS
  - Perfect for this project!

- **Pro Plan:** $20/month
  - More bandwidth
  - Team features
  - Priority support

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord
- Supabase Docs: https://supabase.com/docs

## Checklist

Before deploying:
- [ ] `.env` file is NOT committed to Git
- [ ] `vercel.json` exists
- [ ] Environment variables are ready
- [ ] Supabase project is set up
- [ ] All SQL migrations are run
- [ ] Admin users are configured
- [ ] App builds successfully locally

After deploying:
- [ ] Site loads correctly
- [ ] Authentication works
- [ ] All features work
- [ ] Admin dashboard accessible (for admins)
- [ ] Supabase URLs updated
- [ ] Custom domain configured (if needed)
