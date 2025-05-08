# Web 25
Finally I want to have a website structure that allows me to work with it efficiently and maintain it long-term without the need to re-engineer it every year or so.

## Tools used
- LLM-assisted code generator (mostly Claude for now)
- `eleventy.js` for now, but might switch to something else if it seems more efficient

## Structure
For now, everything is sandboxed in `web-25` folder until ready to switch to a new version.

### Sections
My website consists of several sections that serve different purposes and are constructed differently
#### Landing page
This is purely custom single site that is the entry point to my site.
#### Profile
A self-contained HTML + CSS (or alternative) describing who I am and what I do
#### Components
Components like footer, navigation or call-to-action.
#### Case studies
Each case study is a self-contained HTML + CSS (or alternative) that is fine-tuned for a specific use-case. It should build on top of existing visual hierarchy, but also should be able to position specifically based on needs.
#### Presentations / workshops
A set of presentations and guiding workshop slideware that I've gathered throughout years. Some of them are one-offs, some of them are in groups. Currently reusing some layouts between them, in future I'd like to have more reuse to make it simpler to create presentations in new contexts.
#### PlAIground
Playing around with some tools. Not sharing context between them, usually just a quick prototype of some sort.
#### Sandbox
Here are self-contained sandboxed projects that do not share anything in common. Usually just dropped files that serve one purpose with no need for further development.
#### Blog
A set of semi-regular blog articles. It should be markdown only and should have shared CSS among them with some standard layout options and feats like code block, aligning images etc. Nothing fancy.
#### Notes
Contents of my second brain. For now each note is just a simple markdown file with a default template that I can link to if needed. In future I'd like to build an interactive visualisation similar to Obsidian that showcases my second brain knowledge and allows me to travel through it.