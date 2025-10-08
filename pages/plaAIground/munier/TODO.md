# TODO - Before Extension Can Be Used

## Critical (Must Do Before Testing)

- [ ] **Download JSZip library**
  - URL: https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js
  - Save to: `libs/jszip.min.js`
  - Or run: `./setup.sh`

- [ ] **Download html2pdf library**
  - URL: https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js
  - Save to: `libs/html2pdf.bundle.min.js`
  - Or run: `./setup.sh`

- [ ] **Create icon files** (6 files needed)
  - `icons/icon-16.png` (16x16px, gray)
  - `icons/icon-16-active.png` (16x16px, green)
  - `icons/icon-48.png` (48x48px, gray)
  - `icons/icon-48-active.png` (48x48px, green)
  - `icons/icon-128.png` (128x128px, gray)
  - `icons/icon-128-active.png` (128x128px, green)
  - See SETUP.md for instructions

## Testing Checklist

- [ ] Load extension in Chrome (`chrome://extensions/`)
- [ ] Navigate to IS MU curriculum page
- [ ] Verify icon turns green
- [ ] Click extension and try downloading
- [ ] Check that ZIP contains PDF + resources folder
- [ ] Verify resources are correctly named

## Optional Enhancements (Future)

- [ ] Better icon design (with MU branding)
- [ ] Add option to download only PDF (no resources)
- [ ] Add setting for image quality
- [ ] Support for batch downloads (multiple curricula)
- [ ] Better handling of .m3u8 streams (convert to MP3/MP4)
- [ ] Add option to generate EPUB instead of PDF
- [ ] Dark mode for popup UI
- [ ] Add statistics (resources count, file sizes)

## Known Limitations

- Audio/video streams (.m3u8) are linked in PDF, not embedded
- Very large curricula might cause memory issues
- Some resources might fail to download (CORS, authentication)
- PDF generation is slow for content-heavy curricula

## Distribution

When ready to share with classmates:

- [ ] Test thoroughly on different curricula
- [ ] Create a tutorial video/screenshots
- [ ] Package as ZIP with all dependencies
- [ ] Write simple installation guide for non-technical users
- [ ] Host on your GitHub Pages site
