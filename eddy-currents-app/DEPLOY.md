# 🚀 Deploy Eddy Current Explorer to the Web

## Option 1: GitHub Pages (Recommended - FREE)

### Step 1: Create a GitHub Account
1. Go to https://github.com
2. Sign up for free
3. Verify your email

### Step 2: Create a New Repository
1. Click the **+** button → **New repository**
2. Name it: `eddy-currents-explorer`
3. Make it **Public**
4. Click **Create repository**

### Step 3: Upload Your Files
**Option A - Web Interface (Easiest):**
1. In your new repo, click **"uploading an existing file"**
2. Drag and drop ALL files from `eddy-currents-app/` folder:
   - `index.html`
   - `styles.css`
   - `app.js`
3. Click **Commit changes**

**Option B - Command Line:**
```bash
# Navigate to your project folder
cd eddy-currents-app

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/eddy-currents-explorer.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. In your GitHub repo, click **Settings** (top right)
2. Scroll down to **Pages** section (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Select **main** branch and **/ (root)** folder
5. Click **Save**
6. Wait 2-5 minutes for deployment

### Step 5: Your Site is Live! 🎉
- **URL:** `https://YOUR_USERNAME.github.io/eddy-currents-explorer`
- Example: `https://johndoe.github.io/eddy-currents-explorer`

---

## Option 2: Netlify (FREE - Easiest Drag & Drop)

### Step 1: Sign Up
1. Go to https://www.netlify.com
2. Sign up with GitHub or email

### Step 2: Deploy
1. Click **"Add new site"** → **"Deploy manually"**
2. Drag and drop your `eddy-currents-app` folder
3. Wait 30 seconds for deployment
4. **Your site is live!**

### Step 3: Custom Domain (Optional)
1. Click **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow DNS instructions

---

## Option 3: Vercel (FREE)

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy
```bash
cd eddy-currents-app
vercel
```

Follow the prompts. Your site will be live in seconds!

---

## 🎁 Getting a Custom Domain

### Free Subdomains:
- `yourproject.netlify.app`
- `yourproject.vercel.app`
- `yourproject.github.io`

### Buy Your Own Domain (~$10-15/year):
**Best registrars:**
- **Namecheap** - https://namecheap.com (cheap + good support)
- **Google Domains** - https://domains.google (simple)
- **Cloudflare** - https://dash.cloudflare.com (free privacy protection)

**Popular science/education domains:**
- `eddy-currents.com` - $12/year
- `physics-lab.io` - $35/year
- `electromagnetic.fun` - $20/year
- `eddyexplorer.science` - $25/year

### Connect Custom Domain to GitHub Pages:
1. Buy domain (e.g., from Namecheap)
2. In your GitHub repo → Settings → Pages
3. Under "Custom domain", enter your domain
4. Add these DNS records at your domain registrar:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

5. Wait 24-48 hours for DNS propagation
6. Your site works at: `https://yourdomain.com` ✅

---

## 🔒 Enable HTTPS (SSL Certificate)

### GitHub Pages:
- ✅ **Automatic!** Just check "Enforce HTTPS" in Pages settings

### Netlify:
- ✅ **Automatic!** Free SSL certificate included

### Vercel:
- ✅ **Automatic!** Free SSL certificate included

---

## 📱 Make It a PWA (Installable App)

Want users to "install" it like an app on their phone?

Add these files to your project (I can create them for you):
1. `manifest.json` - App configuration
2. `service-worker.js` - Offline support
3. App icons for mobile

Then users can:
- Add to home screen on iOS/Android
- Use offline
- Get fullscreen experience

---

## 💰 Cost Summary

| Option | Hosting | Domain | SSL | Total |
|--------|---------|--------|-----|-------|
| GitHub Pages + Free subdomain | FREE | FREE | FREE | **$0** |
| GitHub Pages + Custom domain | FREE | ~$12/yr | FREE | **$12/yr** |
| Netlify + Free subdomain | FREE | FREE | FREE | **$0** |
| Netlify + Custom domain | FREE | ~$12/yr | FREE | **$12/yr** |

---

## 🚀 Quick Start Recommendation

**For fastest setup:**
1. Use **GitHub Pages** (free, reliable)
2. Start with free subdomain: `yourname.github.io/eddy-currents-explorer`
3. Later add custom domain for ~$12/year

**Want me to help with any step?** Just ask!
