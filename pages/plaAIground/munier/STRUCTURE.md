# IS MU Offline Curriculum Extension - Project Structure

## Current Directory Structure

```
munier/
├── manifest.json           ✅ Extension configuration
├── background.js           ✅ Icon state management
├── content.js              ✅ Page detection & content extraction
├── popup.html              ✅ Extension popup UI
├── popup.js                ✅ Download logic
├── popup.css               ✅ Styling
├── setup.sh                ✅ Setup script (downloads libraries)
├── README.md               ✅ Full documentation
├── SETUP.md                ✅ Quick setup guide
├── TODO.md                 ✅ Task checklist
├── STRUCTURE.md            ✅ This file
│
├── icons/                  ⚠️  NEEDS ICONS (6 PNG files)
│   ├── icon-16.png         ❌ Required
│   ├── icon-16-active.png  ❌ Required
│   ├── icon-48.png         ❌ Required
│   ├── icon-48-active.png  ❌ Required
│   ├── icon-128.png        ❌ Required
│   └── icon-128-active.png ❌ Required
│
└── libs/                   ⚠️  NEEDS LIBRARIES (2 JS files)
    ├── jszip.min.js        ❌ Required - Download from CDN
    └── html2pdf.bundle.min.js ❌ Required - Download from CDN
```

## What's Complete ✅

All core extension code is written and ready:
- Manifest configuration
- Background service worker (icon management)
- Content script (curriculum detection & extraction)
- Popup UI (HTML + CSS)
- Download logic (PDF + ZIP generation)
- Documentation (README, SETUP, TODO)
- Setup script for downloading libraries

## What's Missing ❌

### 1. Libraries (CRITICAL)
You need to download 2 JavaScript libraries:

**Quick way:**
```bash
cd /Users/erik/dev/erikvanek.github.io/pages/plaAIground/munier
chmod +x setup.sh
./setup.sh
```

**Manual way:**
See SETUP.md for URLs and manual download instructions.

### 2. Icons (CRITICAL)
You need to create 6 PNG icon files. The extension won't load without them.

**Simplest way (placeholder icons):**
Use any image editor to create simple colored squares:
- Gray (RGB: 128, 128, 128) for inactive icons
- Green (RGB: 0, 200, 0) for active icons
- Sizes: 16x16, 48x48, 128x128 pixels

**Better way:**
Design proper icons with "MU" text or a download symbol (📥)

See SETUP.md for detailed instructions.

## Next Steps

1. **Run setup script** or download libraries manually
2. **Create icon files** (6 PNG files in icons/ folder)
3. **Load extension** in Chrome:
   - Go to `chrome://extensions/`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select the `munier` folder
4. **Test** on IS MU curriculum page
5. **Share** with classmates!

## File Sizes (Approximate)

- Core extension code: ~50 KB
- JSZip library: ~100 KB
- html2pdf library: ~500 KB
- Icons (6 files): ~50 KB
- **Total**: ~700 KB

## Browser Compatibility

- ✅ Chrome/Edge/Brave: Primary target (Manifest V3)
- ⚠️  Firefox: Should work with minor adjustments
- ❌ Safari: Requires more work

## Technical Stack

- Pure HTML + CSS + JavaScript (no frameworks)
- No external API calls
- No tracking or analytics
- Offline-first approach
- Privacy-focused

## Questions?

Check the documentation:
- `README.md` - Full documentation
- `SETUP.md` - Quick setup guide
- `TODO.md` - Checklist and future enhancements
