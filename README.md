Personal site built using [eleventy](https://www.11ty.dev/).

![Deployed](https://github.com/erikvanek/erikvanek.github.io/workflows/Deploy%20new%20version/badge.svg)

## How to edit?

- clone repo
- source for site content can be found in _pages_ folder
- use `yarn serve` script to leverage live reload when editing project content locally
- when ready to publish a new version of site build it using `yarn build` script
- final output should be regenerated in _docs_ folder
- if everything went wrong, commit your changes and push to the `master` branch of this repo
- in several seconds, new site version should be deployed

## Converting videos to usable format

- use `ffmpeg` bu running `ffmpeg -i input.mp4 -c:v libx264 -crf 15 -preset fast -c:a aac -b:a 1080k  output.mp4`

## Exporting slides to PDF

- install [decktape](https://github.com/astefanutti/decktape)
- run `decktape [slides URL] [path/final-filename.pdf]`
- e.g. `decktape --slides 1-26 http://localhost:8080/sxd-25/ pages/presentations/kisk/export/sxd-25.pdf` or `decktape http://localhost:8080/sdw-25-IV/ ./pages/presentations/kisk/export/sdw-25-IV.pdf`
    - sadly it has some issues with https so what helps is to turn it off in `.eleventy.js` file for export purposes
    - `text-shadow` CSS property can be also problematic 