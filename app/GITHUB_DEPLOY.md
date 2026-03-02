# 🚀 GitHub Pages Deployment - Step by Step

## 📋 Before You Start

Make sure you have:
- ✅ All your files ready (index.html, styles.css, app.js, manifest.json, sw.js)
- ✅ About 10 minutes of time
- ✅ An email address

---

## Step 1: Create GitHub Account (2 minutes)

1. Go to **https://github.com**
2. Click **"Sign up"** (top right)
3. Enter your email → Create password → Choose username
4. **Verify your email** (check inbox for GitHub email)
5. Click the verification link

✅ **Done!** You now have a GitHub account.

---

## Step 2: Create a New Repository (2 minutes)

1. Click the **+** button (top right of GitHub)
2. Select **"New repository"**
3. Fill in these details:
   - **Repository name:** `eddy-currents-explorer`
   - **Description:** `Interactive physics lab exploring eddy currents and maglev technology`
   - **Visibility:** ✅ Public (must be public for free hosting)
   - **Initialize with README:** ❌ Uncheck this

4. Click **"Create repository"**

✅ **Done!** Your repository is created.

---

## Step 3: Upload Your Files (3 minutes)

### Option A: Drag & Drop (Easiest)

1. In your new repo, look for: **"...or drag and drop files here"**
2. **Open your file explorer** (Finder on Mac, File Explorer on Windows)
3. Navigate to your `eddy-currents-app` folder
4. **Select ALL these files:**
   - `index.html`
   - `styles.css`
   - `app.js`
   - `manifest.json`
   - `sw.js`
   - `DEPLOY.md` (optional)
   - `README.md` (optional)

5. **Drag them** into the GitHub browser window
6. Wait for upload (shows "Uploading 7 files...")
7. Scroll down → Click **"Commit changes"**

✅ **Done!** Files are uploaded.

### Option B: Command Line (If you prefer)

Open terminal/command prompt in your eddy-currents-app folder:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Eddy Current Explorer"

# Connect to GitHub (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/eddy-currents-explorer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 4: Enable GitHub Pages (2 minutes)

1. In your repository, click **"Settings"** (top right tab)
2. Look at the **left sidebar** → Click **"Pages"**
3. Under **"Source"** section:
   - Select: **"Deploy from a branch"**
   - Branch: **"main"** 
   - Folder: **"/ (root)"**
4. Click **"Save"**

✅ **Done!** GitHub Pages is enabled.

---

## Step 5: Wait & Access Your Site (2-5 minutes)

1. Wait 2-5 minutes for deployment
2. Refresh the page if needed
3. You'll see a green box saying:
   ```
   🟢 Your site is live at https://YOUR_USERNAME.github.io/eddy-currents-explorer
   ```

4. **Click the link!** Your site is live! 🎉

---

## 🎉 Your Site is Live!

**URL Format:**
```
https://YOUR_USERNAME.github.io/eddy-currents-explorer
```

**Example:**
```
https://johnsmith.github.io/eddy-currents-explorer
```

---

## 🔄 Making Updates (Future Changes)

To update your site after making changes:

### Option A: Web Interface
1. Go to your repository on GitHub
2. Click the file you want to edit
3. Click the **pencil icon** (Edit)
4. Make changes
5. Scroll down → Click **"Commit changes"**
6. Wait 2 minutes for update

### Option B: Upload New Files
1. Go to repository
2. Click **"Add file"** → **"Upload files"**
3. Drag new files
4. Click **"Commit changes"**

---

## 🎁 Adding a Custom Domain (Optional)

### Step A: Buy Domain (~$12/year)

1. Go to **https://namecheap.com**
2. Search for a domain name:
   - `eddy-currents.com`
   - `physics-lab.io`
   - `yourname-physics.com`
3. Add to cart → Checkout
4. Create Namecheap account
5. Complete purchase

### Step B: Connect Domain to GitHub

**In GitHub:**
1. Repository → Settings → Pages
2. Under "Custom domain", enter: `eddy-currents.com`
3. Click **Save**
4. ✅ Check "Enforce HTTPS"

**In Namecheap:**
1. Go to Domain List → Manage
2. Go to **Advanced DNS** tab
3. Delete existing records
4. Add these 4 records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 185.199.108.153 | Automatic |
| A Record | @ | 185.199.109.153 | Automatic |
| A Record | @ | 185.199.110.153 | Automatic |
| A Record | @ | 185.199.111.153 | Automatic |
| CNAME Record | www | YOUR_USERNAME.github.io | Automatic |

5. Save changes
6. Wait 24-48 hours for DNS propagation

✅ **Done!** Your site works at `https://eddy-currents.com`

---

## 📱 Install as App on Your Phone

Once your site is live:

### iPhone/iPad:
1. Safari → Open your GitHub Pages URL
2. Tap **Share button** (square with arrow)
3. Scroll down → Tap **"Add to Home Screen"**
4. Tap **"Add"**
5. App icon appears on home screen!

### Android:
1. Chrome → Open your GitHub Pages URL
2. Tap **Menu (3 dots)** → **"Add to Home Screen"**
3. Tap **"Add"**
4. App icon appears!

---

## 🆘 Troubleshooting

### Problem: "Site not found" or 404
**Solution:** Wait 5 more minutes, then refresh

### Problem: Changes not showing
**Solution:** 
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Or clear browser cache

### Problem: CSS/JS not loading
**Solution:** Check that file names match exactly (case sensitive!)
- ✅ `styles.css` 
- ❌ `Styles.css` (capital S won't work)

### Problem: Custom domain not working
**Solution:** Wait 48 hours for DNS. Check DNS records are correct.

---

## ✅ Quick Checklist

- [ ] Created GitHub account
- [ ] Created repository named `eddy-currents-explorer`
- [ ] Uploaded all files
- [ ] Enabled GitHub Pages in Settings
- [ ] Waited 2-5 minutes
- [ ] Site loads at `https://username.github.io/eddy-currents-explorer`
- [ ] Tested on phone
- [ ] Added to home screen (optional)

---

## 🎊 Success!

Your Eddy Current Explorer is now live on the internet!

**Share your URL:**
- Send to friends
- Share on social media
- Use in classrooms
- Add to your portfolio

**Questions?** Check GitHub's help: https://docs.github.com/en/pages
