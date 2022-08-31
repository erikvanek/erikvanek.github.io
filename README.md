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