# 🆘 GitHub Pages Troubleshooting Guide

## Error: "The content of the page cannot be displayed"

---

## 🔧 Quick Fixes (Try these first)

### Fix 1: Check the URL Format
**Wrong:** ❌
```
https://github.com/YOUR_USERNAME/eddy-currents-explorer
https://YOUR_USERNAME.github.io
```

**Correct:** ✅
```
https://YOUR_USERNAME.github.io/eddy-currents-explorer
```

**Must be exactly:** `username.github.io/repository-name`

---

### Fix 2: Wait Longer
GitHub Pages takes time to deploy:
- ⏱️ First deployment: **2-10 minutes**
- 🔄 Subsequent updates: **2-5 minutes**

**What to do:**
1. Make a note of the time
2. Wait 10 minutes
3. Try again

---

### Fix 3: Hard Refresh
Your browser might be showing a cached error:

**Windows:** `Ctrl + Shift + R`
**Mac:** `Cmd + Shift + R`
**Mobile:** Clear browser cache in settings

---

### Fix 4: Check Repository is Public
GitHub Pages only works with **Public** repositories on free accounts.

**How to check:**
1. Go to your repository
2. Look under the repo name - should say "Public"
3. If it says "Private":
   - Settings (top right)
   - General → Danger Zone
   - Change visibility → Make public

---

## 🔍 Diagnostic Steps

### Step 1: Verify Your Files Are Uploaded

1. Go to: `https://github.com/YOUR_USERNAME/eddy-currents-explorer`
2. You should see your files listed:
   - ✅ index.html
   - ✅ styles.css
   - ✅ app.js
   - ✅ manifest.json
   - ✅ sw.js

**If files are missing:**
- Upload them again (drag & drop to main page)

---

### Step 2: Check GitHub Pages is Enabled

1. Go to: `https://github.com/YOUR_USERNAME/eddy-currents-explorer`
2. Click **Settings** tab
3. Left sidebar → **Pages**
4. You should see:
   ```
   🟢 Your site is live at https://YOUR_USERNAME.github.io/eddy-currents-explorer
   ```

**If you see red error:**
- Make sure Source is set to "Deploy from a branch"
- Make sure Branch is "main" and folder is "/ (root)"
- Click Save

---

### Step 3: Check index.html Exists

1. In your repository, click on **index.html**
2. You should see the HTML code, not an error
3. If index.html is missing or named differently:
   - Rename it to exactly: `index.html` (lowercase)
   - Re-upload

---

### Step 4: Try the Raw GitHub URL

Test if files are accessible:
```
https://raw.githubusercontent.com/YOUR_USERNAME/eddy-currents-explorer/main/index.html
```

**If this shows code:** ✅ Files are there
**If this shows 404:** ❌ Files aren't uploaded correctly

---

## 🛠️ Common Mistakes & Fixes

### Mistake 1: Repository Name Has Spaces
**Wrong:** `eddy current explorer` ❌  
**Correct:** `eddy-currents-explorer` ✅

**Fix:** Rename repository:
1. Settings tab
2. Repository name
3. Change to: `eddy-currents-explorer`
4. Rename

---

### Mistake 2: Files in a Subfolder
**Wrong:**
```
repository/
  └── eddy-currents-app/
      ├── index.html
      └── styles.css
```

**Correct:**
```
repository/
  ├── index.html
  ├── styles.css
  └── app.js
```

**Fix:**
1. Go to your repository
2. If you see a folder, click it
3. Click each file
4. Click "Delete" (trash icon)
5. Re-upload files to ROOT (not in a folder)

---

### Mistake 3: Case Sensitivity Issue
GitHub is case-sensitive!

**Wrong:** ❌
```
Index.html      (capital I)
Styles.css      (capital S)
```

**Correct:** ✅
```
index.html      (lowercase)
styles.css      (lowercase)
```

**Fix:**
1. Delete incorrectly named files
2. Rename on your computer to lowercase
3. Re-upload

---

### Mistake 4: Using README.md Instead of index.html
GitHub won't automatically show your site if you only have README.md

**Fix:** Make sure `index.html` exists!

---

## 🧪 Test Your Setup

### Test 1: Direct HTML Test
```
https://YOUR_USERNAME.github.io/eddy-currents-explorer/index.html
```

### Test 2: Check CSS Loads
```
https://YOUR_USERNAME.github.io/eddy-currents-explorer/styles.css
```

Should show CSS code, not 404.

---

## 🔥 Nuclear Option (Start Fresh)

If nothing works, delete and restart:

1. Go to repository → Settings
2. Scroll to bottom → "Delete this repository"
3. Type repo name → Delete
4. Create new repository
5. Upload files again
6. Enable Pages again

---

## 📧 Still Not Working?

Check GitHub Status: https://www.githubstatus.com/

Or try **Netlify** instead (also free):
1. https://netlify.com
2. Drag & drop your folder
3. Done!

---

## ✅ Success Checklist

- [ ] URL format is correct: `username.github.io/repo-name`
- [ ] Waited at least 10 minutes
- [ ] Repository is Public
- [ ] index.html is in root (not a subfolder)
- [ ] GitHub Pages shows green "Your site is live"
- [ ] Hard refreshed browser (Ctrl+Shift+R)
