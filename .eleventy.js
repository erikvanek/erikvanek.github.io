// module.exports = function (eleventyConfig) {
//     eleventyConfig.addWatchTarget('./pages');
//     eleventyConfig.browserSyncConfig = {
//         https: true,
//     };
//     const markdownIt = require('markdown-it');
//     const markdownItAttrs = require('markdown-it-attrs');
//     let options = {
//         html: true,
//         breaks: true,
//         linkify: true,
//     };
//     let markdownLib = markdownIt(options).use(markdownItAttrs);
//     eleventyConfig.setLibrary('md', markdownLib);
//     // const pluginPWA = require('eleventy-plugin-pwa');
//     // eleventyConfig.addPlugin(pluginPWA);
//     return {
//         templateFormats: [
//             'md',
//             'jpg',
//             'jpeg',
//             'js',
//             'png',
//             'mp4',
//             'pdf',
//             'ico',
//             'json',
//             'html',
//             'css', // css is not yet a recognized template extension in Eleventy
//         ],
//         dir: {
//             input: 'pages',
//             output: 'docs',
//         },
//     };
// };

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
