# IS MU Offline Curriculum Extension

Chrome extension to download IS MU interactive curriculum for offline reading on reMarkable and other devices.

## Features

- ✅ **Auto-detection**: Icon turns green when curriculum page is detected
- ✅ **One-click download**: Click extension → starts processing
- ✅ **PDF output**: Clean, formatted curriculum content
- ✅ **Resources folder**: All external files organized with smart naming
- ✅ **Collision handling**: Duplicate names get (1), (2), etc.
- ✅ **Progress indicator**: Shows what's being processed

## Installation

### 1. Download Required Libraries

The extension needs two JavaScript libraries. Download them and place them in the `libs/` folder:

**a) JSZip (for creating ZIP files)**
- Go to: https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js
- Save as: `libs/jszip.min.js`

**b) html2pdf.js (for PDF generation)**
- Go to: https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js
- Save as: `libs/html2pdf.bundle.min.js`

### 2. Create Icons

You need to create placeholder icons or the extension won't load. Create simple PNG files:

- `icons/icon-16.png` (16x16px) - gray icon
- `icons/icon-16-active.png` (16x16px) - green icon
- `icons/icon-48.png` (48x48px) - gray icon
- `icons/icon-48-active.png` (48x48px) - green icon
- `icons/icon-128.png` (128x128px) - gray icon
- `icons/icon-128-active.png` (128x128px) - green icon

**Quick way to create icons:**
1. Open any image editor (Preview on Mac, Paint on Windows)
2. Create a 128x128px image with a solid color (gray for inactive, green for active)
3. Add text "MU" or "📥" in the center
4. Resize/save copies as 16x16 and 48x48
5. Save in the `icons/` folder

### 3. Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select the `munier` folder
5. The extension should now appear in your extensions list

### 4. Pin the Extension (Optional)

1. Click the puzzle piece icon in Chrome toolbar
2. Find "IS MU Offline Curriculum"
3. Click the pin icon to keep it visible

## Usage

1. **Navigate** to any IS MU curriculum page (e.g., `https://is.muni.cz/auth/el/phil/podzim2025/DESB54/index.qwarp`)
2. **Icon turns green** when curriculum is detected
3. **Click the extension icon**
4. **Click "Download Curriculum"** button
5. **Wait** for processing (progress shown in popup)
6. **Save** the ZIP file when prompted

## Output Structure

```
DESB54-Learning_Design.zip
├── DESB54-Learning_Design.pdf
└── resources/
    ├── Uvodni_pozdrav_k_1_modulu.mp3
    ├── Learning_design.png
    ├── Terminologie.png
    ├── ADDIE_model.png
    └── ...
```

## Troubleshooting

### Extension won't load
- Check that all files are in place
- Make sure libraries are in `libs/` folder
- Verify icons exist in `icons/` folder

### Icon doesn't turn green
- Make sure you're on a page with `index.qwarp` in the URL
- Try refreshing the page
- Check the console for errors (F12)

### Download fails
- Check your internet connection
- Some resources might be unavailable
- Try refreshing the page and downloading again

### "Curriculum not detected"
- Navigate to the curriculum page (with `index.qwarp`)
- Click the extension icon again

## Technical Details

- **Manifest Version**: 3
- **Required Permissions**: 
  - `activeTab`: Access current page content
  - `downloads`: Save files to disk
  - `storage`: Remember settings
  - `scripting`: Inject content scripts
- **Host Permissions**: `https://is.muni.cz/*`

## Notes

- Audio/video streams (.m3u8) may not download properly - these are links in the PDF
- Large curricula might take a few minutes to process
- Make sure you have enough disk space
- The extension works only on authenticated IS MU pages (you must be logged in)

## Sharing with Classmates

To share this extension with classmates:

1. Zip the entire `munier` folder
2. Share the ZIP file
3. Include these installation instructions
4. Tell them to download the required libraries (jszip and html2pdf)
5. Help them create simple icons if needed

## Version

**v1.0.0** - Initial MVP release

## License

Created for educational purposes at Masaryk University.
