#!/bin/bash

# Setup script for IS MU Offline Curriculum Extension
# This script downloads required libraries

echo "📦 Setting up IS MU Offline Curriculum Extension..."
echo ""

# Check if we're in the right directory
if [ ! -f "manifest.json" ]; then
    echo "❌ Error: manifest.json not found. Run this script from the extension root directory."
    exit 1
fi

# Create libs directory if it doesn't exist
mkdir -p libs

echo "⬇️  Downloading JSZip..."
curl -L -o libs/jszip.min.js https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js

if [ $? -eq 0 ]; then
    echo "✅ JSZip downloaded successfully"
else
    echo "❌ Failed to download JSZip"
    exit 1
fi

echo ""
echo "⬇️  Downloading html2pdf..."
curl -L -o libs/html2pdf.bundle.min.js https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js

if [ $? -eq 0 ]; then
    echo "✅ html2pdf downloaded successfully"
else
    echo "❌ Failed to download html2pdf"
    exit 1
fi

echo ""
echo "✅ Libraries downloaded successfully!"
echo ""
echo "⚠️  You still need to create icon files manually:"
echo "   - icons/icon-16.png (16x16px, gray)"
echo "   - icons/icon-16-active.png (16x16px, green)"
echo "   - icons/icon-48.png (48x48px, gray)"
echo "   - icons/icon-48-active.png (48x48px, green)"
echo "   - icons/icon-128.png (128x128px, gray)"
echo "   - icons/icon-128-active.png (128x128px, green)"
echo ""
echo "See SETUP.md for instructions on creating icons."
echo ""
echo "Once icons are created, load the extension in Chrome:"
echo "1. Go to chrome://extensions/"
echo "2. Enable Developer mode"
echo "3. Click 'Load unpacked'"
echo "4. Select this directory"
