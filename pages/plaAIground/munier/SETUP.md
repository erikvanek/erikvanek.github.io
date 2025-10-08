# Quick Setup Guide

## ⚠️ Before you can use the extension, you need to:

### 1. Download Required Libraries (MANDATORY)

**JSZip - for creating ZIP files:**
```bash
curl -o libs/jszip.min.js https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js
```

**html2pdf - for PDF generation:**
```bash
curl -o libs/html2pdf.bundle.min.js https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js
```

Or manually:
1. Visit: https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js
2. Save to: `libs/jszip.min.js`
3. Visit: https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js
4. Save to: `libs/html2pdf.bundle.min.js`

### 2. Create Icon Files (MANDATORY)

The extension won't load without icons. You need 6 files:

**Quick solution - Create solid color PNGs:**
- Gray icons (inactive state): `icon-16.png`, `icon-48.png`, `icon-128.png`
- Green icons (active state): `icon-16-active.png`, `icon-48-active.png`, `icon-128-active.png`

**Using ImageMagick (if installed):**
```bash
cd icons/
convert -size 16x16 xc:gray icon-16.png
convert -size 16x16 xc:green icon-16-active.png
convert -size 48x48 xc:gray icon-48.png
convert -size 48x48 xc:green icon-48-active.png
convert -size 128x128 xc:gray icon-128.png
convert -size 128x128 xc:green icon-128-active.png
```

**Or manually:**
1. Use any image editor (Preview on Mac, Paint on Windows, Photoshop, etc.)
2. Create 6 simple PNG files with the sizes above
3. Gray for inactive, green for active
4. Optionally add "MU" text or 📥 emoji
5. Save to the `icons/` folder

### 3. Load in Chrome

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (top-right toggle)
4. Click "Load unpacked"
5. Select this `munier` folder
6. Done! The extension should appear

## Testing

1. Go to: https://is.muni.cz (log in)
2. Navigate to any curriculum page (with `index.qwarp` in URL)
3. Extension icon should turn green
4. Click it and try downloading

## Problems?

Check `README.md` for detailed troubleshooting steps.
