# Squeeze Page Implementation Guide

## 🎯 What Was Created

Three high-conversion squeeze pages for your paid ad campaign:

1. **intern.html** - `/intern` - Corporate Survivor concept (Lead_Corporate)
2. **granny.html** - `/granny` - Bingo Rampage concept (Lead_Grandma)  
3. **janitor.html** - `/janitor` - Dungeon Janitor concept (Lead_Janitor)

**✅ PLACEHOLDER VIDEOS ADDED**: Each page now uses free stock videos from Coverr.co as placeholders so you can test immediately.

**✅ NAVIGATION LINKS ADDED**: A new "🔥 Alpha Games" section has been added to your main index.html page with cards linking to all three squeeze pages.

## 📁 File Locations

All files are in the root directory of your project:
- `A:\GitHubRepositorys\bluewhirl.github.io\intern.html`
- `A:\GitHubRepositorys\bluewhirl.github.io\granny.html`
- `A:\GitHubRepositorys\bluewhirl.github.io\janitor.html`

## 🚀 What You Need to Do Next

### STEP 1: Add Your Video Files (OPTIONAL - Placeholders Already Working)

**Current Setup**: Each squeeze page is using free stock video placeholders from Coverr.co:
- **intern.html**: Office worker typing (represents corporate grind)
- **granny.html**: Elderly woman on laptop (represents grandma character)
- **janitor.html**: Man mopping floor (represents janitor character)

**These work right now!** You can test and deploy immediately.

**To Replace with Your UE5 Videos** (when ready):

Create the following directory structure:
```
A:\GitHubRepositorys\bluewhirl.github.io\assets\videos\
```

Add these video files (you need to create/compress them):
- `Corporate_Survivor.mp4` (for intern.html)
- `Bingo_Rampage.mp4` (for granny.html)
- `Dungeon_Janitor.mp4` (for janitor.html)

Then update each HTML file to point to your local videos:
- In **intern.html** line 99: Change `https://cdn.coverr.co/videos/...` to `assets/videos/Corporate_Survivor.mp4`
- In **granny.html** line 99: Change `https://cdn.coverr.co/videos/...` to `assets/videos/Bingo_Rampage.mp4`
- In **janitor.html** line 99: Change `https://cdn.coverr.co/videos/...` to `assets/videos/Dungeon_Janitor.mp4`

### STEP 2: Compress Your Videos

**CRITICAL FOR MOBILE PERFORMANCE**

Each video MUST be under 2MB for instant mobile loading.

#### Using HandBrake (Free):
1. Download HandBrake: https://handbrake.fr/
2. Open your UE5 rendered video
3. Use these settings:
   - **Preset**: "Fast 480p30" (mobile optimized)
   - **Video Codec**: H.264
   - **Framerate**: 30fps (or 24fps for smaller size)
   - **Quality**: RF 28-32 (higher = smaller file)
   - **Resolution**: 720p max (1280x720)
   - **Duration**: 6-10 seconds, looping
4. Check file size - aim for **1.5-2MB**

#### Using FFmpeg (Command Line):
```bash
ffmpeg -i input.mp4 -vf "scale=1280:720" -c:v libx264 -crf 28 -preset slow -movflags +faststart -an output.mp4
```

### STEP 3: Add Your Meta Pixel ID

Open each HTML file and replace `'YOUR_PIXEL_ID'` (appears twice in each file):

**Line 18 in each file:**
```javascript
fbq('init', 'YOUR_PIXEL_ID');  // ← Replace this
```

**Line 21 in each file:**
```html
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
```

**Where to find your Pixel ID:**
1. Go to Facebook Events Manager: https://business.facebook.com/events_manager
2. Click your Pixel
3. Copy the Pixel ID (looks like: `1234567890123456`)

### STEP 4: Connect Your Backend

Each page has a `fetch()` call that needs your email collection endpoint.

**Line 220 in each file** (approximately):
```javascript
fetch('https://your-backend-api.com/api/leads', {
```

**Options:**

#### A) FormSpree (Easiest - Free)
1. Go to https://formspree.io/
2. Create a free form
3. Get your endpoint URL
4. Replace the fetch URL with: `https://formspree.io/f/YOUR_FORM_ID`

#### B) Google Sheets via Google Apps Script
1. Create a Google Sheet
2. Tools → Script Editor
3. Deploy as web app
4. Use the deployment URL

#### C) Your Own Backend
If you have a backend API, point to your `/api/leads` endpoint.

**Expected Request Format:**
```json
{
  "email": "user@example.com",
  "concept": "Lead_Corporate",
  "source": "intern_squeeze_page",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### STEP 5: Test Locally

**READY TO TEST NOW!** Open your browser and navigate to:
- `file:///A:/GitHubRepositorys/bluewhirl.github.io/index.html`
- Scroll to the "🔥 Alpha Game Concepts" section
- Click any "Claim Alpha Key" button to test the squeeze pages

Or test the squeeze pages directly:
1. Open `intern.html`, `granny.html`, or `janitor.html` in your browser
2. Test on desktop
3. **CRITICAL**: Test on mobile (open Chrome DevTools → Toggle Device Toolbar)
4. Check:
   - Video plays automatically (placeholder videos should work)
   - Form submits correctly
   - Error messages display
   - Success messages display
   - Page loads in under 3 seconds

### STEP 6: Deploy to GitHub Pages

Since your repo is already on GitHub Pages:

```bash
cd A:\GitHubRepositorys\bluewhirl.github.io
git add intern.html granny.html janitor.html index.html SQUEEZE_PAGES_README.md
git commit -m "Add squeeze pages for paid ad campaign with navigation"
git push origin main
```

**Your pages will be live at:**
- `https://moviesgames12345.github.io/bluewhirl.github.io/intern.html`
- `https://moviesgames12345.github.io/bluewhirl.github.io/granny.html`
- `https://moviesgames12345.github.io/bluewhirl.github.io/janitor.html`

**Users can also access them from your main page:**
- Visit `https://moviesgames12345.github.io/bluewhirl.github.io/`
- Click "Games" or scroll down
- See the "🔥 Alpha Game Concepts" section with all three games
- Click "Claim Alpha Key" on any game card

### STEP 7: Create Your Facebook Ads

**Ad Setup:**
1. Facebook Ads Manager → Create Campaign
2. Objective: **Lead Generation** (or Conversions)
3. Set your Pixel as the conversion event
4. Create 3 separate ad sets (one per concept)

**Landing Page URLs:**
- Ad 1 → `https://yourdomain.com/intern.html`
- Ad 2 → `https://yourdomain.com/granny.html`
- Ad 3 → `https://yourdomain.com/janitor.html`

**Budget Recommendation:**
- Start with $10-20/day per ad set
- Let Facebook's AI optimize for 3-5 days
- Kill underperformers, scale winners

## 🎨 Design Features

### Mobile-First Optimization
- Responsive typography (clamp())
- Touch-friendly 48px+ button height
- Instant load with embedded styles
- No external dependencies

### Conversion Optimization
- Full-screen video background
- High-contrast text (white on dark overlay)
- Scarcity messaging (pulsing red text)
- Single-field form (email only)
- Large, high-visibility CTA button
- Disabled state during submission
- Error/success messaging

### Tracking Integration
- Meta Pixel pageview tracking
- Lead event tracking on submission
- Google Analytics compatible (if present)
- Console logging for debugging

## 📊 Measuring Success

### Key Metrics to Track

**In Facebook Ads Manager:**
- CPM (Cost Per Thousand Impressions) - aim for under $10
- CTR (Click-Through Rate) - aim for 2%+
- CPL (Cost Per Lead) - aim for under $5
- Conversion Rate - aim for 20%+

**Formula:**
```
Conversion Rate = (Leads / Clicks) × 100
If 100 people click your ad and 25 submit their email = 25% conversion rate
```

### Testing Strategy

**Week 1: Data Collection**
- Run all 3 concepts with equal budget
- Don't change anything
- Collect at least 50 clicks per page

**Week 2: Optimization**
- Kill the worst performer
- Double budget on the best performer
- Test variations of the winner

## 🔧 Troubleshooting

### Video Won't Play on Mobile
- Check file size (must be under 2MB)
- Ensure `playsinline` attribute is present (it is)
- Some browsers block autoplay - this is expected

### Form Doesn't Submit
1. Open browser console (F12)
2. Check for errors
3. Verify your backend URL is correct
4. Test backend URL with Postman/curl

### Meta Pixel Not Tracking
1. Install Meta Pixel Helper Chrome extension
2. Visit your page
3. Check if Pixel fires (should turn green)
4. Verify Pixel ID is correct

### Page Loads Slowly
1. Check video file size (use `dir assets\videos` in PowerShell)
2. Re-compress videos to under 2MB
3. Test on real mobile device, not just DevTools

## 💰 Expected Economics

**If you spend $100 on ads:**
- 5,000 impressions (at $20 CPM)
- 100 clicks (at 2% CTR)
- 20-30 email leads (at 20-30% conversion)
- **Cost Per Lead: $3.33 - $5.00**

**Each lead is worth the lifetime value of a potential customer.**

If 1 in 10 leads buys a $20 game, each lead is worth $2. You're paying $5 to acquire a $2 customer = **not profitable**.

**Solution:** Optimize for viral spread, upsells, or higher-priced products.

## 📞 What To Do If You Get Stuck

1. Check browser console for errors
2. Test on incognito/private browsing
3. Verify video files exist and play in VLC
4. Double-check Meta Pixel ID
5. Test backend endpoint separately

## 🎯 Next Steps After Launch

1. **Email Automation**: Set up Mailchimp/ConvertKit to auto-send alpha keys
2. **Thank You Page**: Create a confirmation page
3. **A/B Testing**: Test different headlines/CTAs
4. **Retargeting**: Create Facebook Custom Audience from Pixel data
5. **Scale**: When you hit $3 CPL, increase budget 20% every 3 days

---

**Questions? Check the inline comments in the HTML files.**

Good luck with your campaign! 🚀