const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget('./pages');

    // Remove statusMessage from server options to fix HTTP/2 warning
    eleventyConfig.setServerOptions({
        https: {
            key: './localhost.key',
            cert: './localhost.cert',
        },
        showAllHosts: true
    });

    // Add string split filter
    eleventyConfig.addNunjucksFilter("split", function (str, separator) {
        return str.split(separator);
    });

    // Add filter to check if note is top-level
    eleventyConfig.addNunjucksFilter("isTopLevelNote", function (path) {
        const remainingPath = path.replace('/notes/', '');
        return !remainingPath.includes('/');
    });

    // Add filter to format directory name
    eleventyConfig.addNunjucksFilter("formatDirName", function (dirName) {
        if (!dirName) return '';
        return dirName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    });

    // Create a collection of all notes for wiki-link resolution
    eleventyConfig.addCollection("allNotes", function (collection) {
        return collection.getFilteredByGlob("pages/notes/**/*.md");
    });

    // Helper function to convert heading text to valid ID
    function slugify(text) {
        return text
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }

    // Helper function to check if a string is an image path
    function isImagePath(path) {
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
        return imageExtensions.some(ext => path.toLowerCase().endsWith(ext));
    }

    // Add Nunjucks filter for wiki-links with section and image support
    eleventyConfig.addNunjucksFilter("wikilinks", function (content, allNotes) {
        if (!content) return '';

        // Handle image references with ![[]]
        content = content.replace(/!\[\[(.*?)\]\]/g, function (match, imagePath) {
            if (isImagePath(imagePath)) {
                const imageUrl = `/notes/${imagePath}`;
                return `<img src="${imageUrl}" alt="${imagePath}" loading="lazy">`;
            }
            return match;
        });

        // Handle regular wiki-links [[]]
        return content.replace(/\[\[(.*?)\]\]/g, function (match, link) {
            let [pageWithSection, linkTitle] = link.split('|');
            let [pageName, section] = pageWithSection.split('#');

            const targetNote = allNotes.find(note => {
                const noteName = note.fileSlug;
                return noteName.toLowerCase() === pageName.toLowerCase();
            });

            if (targetNote) {
                let url = targetNote.url;
                if (section) {
                    const sectionId = slugify(section);
                    url += `#${sectionId}`;
                }
                const displayTitle = linkTitle || section || pageName;
                return `<a href="${url}">${displayTitle}</a>`;
            } else {
                const displayTitle = linkTitle || section || pageName;
                return `<a href="#" class="pending-link">${displayTitle}</a>`;
            }
        });
    });

    // Add transform to add IDs to headings
    eleventyConfig.addTransform("addHeadingIds", function (content, outputPath) {
        if (outputPath && outputPath.endsWith(".html")) {
            const headingRegex = /<h([1-6])>(.*?)<\/h\1>/g;
            return content.replace(headingRegex, function (match, level, text) {
                const id = slugify(text);
                return `<h${level} id="${id}">${text}</h${level}>`;
            });
        }
        return content;
    });

    // not sure if needed
    // Copy image files
    eleventyConfig.addPassthroughCopy({
        "pages/assets/images": "assets/images"
    });

    let options = {
        html: true,
        breaks: true,
        linkify: true,
    };

    const markdownLib = markdownIt(options)
        .use(markdownItAttrs)
        .disable('code');

    eleventyConfig.setLibrary('md', markdownLib);

    eleventyConfig.addPlugin(pluginWebc);

    // Add specific configuration for notes
    eleventyConfig.addCollection("notes", function (collection) {
        return collection.getFilteredByGlob("pages/notes/**/*.md").map(item => {
            item.data.layout = "note.njk";
            return item;
        });
    });

    eleventyConfig.setTemplateFormats([
        'css',
        'pdf',
        'mp4',
        'mov',
        'gif',
        'js',
        'jpg',
        'jpeg',
        'png',
        'svg',
        'html',
        'ico',
        'md',
        'njk',
        'xml',
        'webp',
        'txt',
        'avif'
    ]);

    return {
        dir: {
            input: 'pages',
            output: 'docs',
        },
    };
};