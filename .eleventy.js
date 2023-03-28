
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget('./pages');
    eleventyConfig.setServerOptions({
        https: {
            key: './localhost.key',
            cert: './localhost.cert',
        },
    });


    let options = {
        html: true,
        breaks: true,
        linkify: true
    };



    const markdownLib = markdownIt(options)
        .use(markdownItAttrs)
        .disable("code");

    eleventyConfig.setLibrary("md", markdownLib);

    eleventyConfig.setTemplateFormats([
        "css",
        "pdf",
        'mp4',
        "js",
        "jpg",
        "jpeg",
        "png",
        "html",
        "ico",
        "md"
    ]);

    return {
        dir: {
            input: 'pages',
            output: 'docs',
        },
    };
};
