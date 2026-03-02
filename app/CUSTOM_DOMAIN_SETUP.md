# 🌐 Custom Domain Setup Guide

## You Bought a Domain - Now Let's Connect It!

---

## Step 1: Add Domain to GitHub Pages (2 minutes)

1. Go to your GitHub repository
2. Click **Settings** tab (top right)
3. Left sidebar → **Pages**
4. Under **"Custom domain"**, enter your domain:
   ```
   eddy-currents.com
   ```
   (or whatever you bought)
5. Click **Save**
6. ✅ Check the box **"Enforce HTTPS"** (wait for this, it takes time)

You'll see a yellow banner saying:
```
⏳ DNS check in progress
```

**Don't worry about this yet!** We need to set up DNS first.

---

## Step 2: Get DNS Settings from GitHub

After saving, GitHub will show you what DNS records to add.

**You should see 4 IP addresses:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**If you see these, great! If not, use the ones above ☝️**

Also note:
- **A records** for root domain (@)
- **CNAME record** for www

---

## Step 3: Add DNS Records at Your Domain Registrar

### If you bought from Namecheap:

1. Go to https://namecheap.com and sign in
2. Click **Domain List** (left sidebar)
3. Find your domain → Click **Manage**
4. Click **Advanced DNS** tab
5. Find **Host Records** section
6. Delete any existing records (trash icon)
7. Add these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 185.199.108.153 | Automatic |
| A Record | @ | 185.199.109.153 | Automatic |
| A Record | @ | 185.199.110.153 | Automatic |
| A Record | @ | 185.199.111.153 | Automatic |
| CNAME Record | www | YOUR_USERNAME.github.io | Automatic |

**Example if your username is "johnsmith":**
```
CNAME www johnsmith.github.io
```

8. Click **Save All Changes**

---

### If you bought from Google Domains:

1. Go to https://domains.google
2. Click your domain
3. Click **DNS** tab (left side)
4. Click **Manage custom records**
5. Delete existing records
6. Create new records:

**Type A records:**
- Name: @
- Data: 185.199.108.153
- Click Add → Add 3 more with other IPs

**Type CNAME record:**
- Name: www
- Data: YOUR_USERNAME.github.io

7. Click **Save**

---

### If you bought from Cloudflare:

1. Go to https://dash.cloudflare.com
2. Select your domain
3. Click **DNS** tab
4. Click **Add record**
5. Add these:

**4 A records:**
```
Type: A
Name: @
IPv4: 185.199.108.153
```
(Repeat for other 3 IPs)

**1 CNAME record:**
```
Type: CNAME
Name: www
Target: YOUR_USERNAME.github.io
```

6. Make sure proxy status is **DNS only** (gray cloud, not orange)
7. Click **Save**

---

## Step 4: Wait for DNS Propagation

⏱️ **This takes 24-48 hours maximum** (usually 2-4 hours)

You can check if it's working:

### Check Method 1: Command Line
```bash
nslookup eddy-currents.com
```
Should show the 4 GitHub IPs

### Check Method 2: Online Tool
Go to: https://dnschecker.org
- Enter your domain
- Select "A" record
- Click Search
- You should see the 4 GitHub IPs

---

## Step 5: Verify on GitHub

1. Go back to GitHub repository → Settings → Pages
2. Wait for the yellow banner to turn green:
   ```
   🟢 Your site is live at https://eddy-currents.com
   ```

3. **HTTPS will be enabled automatically** after DNS propagates

---

## Step 6: Test Your Site

Once DNS is ready:

1. Open browser
2. Go to: `https://eddy-currents.com`
3. Should show your Eddy Current Explorer!
4. Check the lock icon 🔒 (HTTPS working)

Also test:
- `https://www.eddy-currents.com` (should redirect to non-www)

---

## 🆘 Common Issues

### "DNS check unsuccessful" on GitHub
**Solution:** Wait longer (up to 48 hours). DNS takes time.

### "HTTPS certificate error"
**Solution:** Wait 24 hours after DNS works. GitHub generates SSL automatically.

### Site works but shows "Not Secure"
**Solution:** Wait for HTTPS. Or uncheck "Enforce HTTPS", wait, then check it again.

### Domain shows parking page from registrar
**Solution:** You didn't delete the default DNS records. Go back to DNS settings and remove everything, then add only the GitHub records.

---

## ✅ Success Checklist

- [ ] Added custom domain in GitHub Pages settings
- [ ] Added 4 A records pointing to GitHub IPs
- [ ] Added CNAME record for www
- [ ] Saved DNS changes at registrar
- [ ] Waited 2-48 hours
- [ ] GitHub shows green "Your site is live"
- [ ] Site loads at https://yourdomain.com
- [ ] Lock icon shows (HTTPS working)

---

## 📧 Your Domain Should Work At:

**Primary:**
```
https://eddy-currents.com
```

**With www (redirects to primary):**
```
https://www.eddy-currents.com
```

Both should show your Eddy Current Explorer!

---

## 🎉 You're Done!

Your custom domain is now connected to your GitHub Pages site!

**Share your new URL:**
- `https://eddy-currents.com` ⚡

People can now visit your physics lab at your own domain!
