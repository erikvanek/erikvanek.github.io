module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./pages')
  return {
    templateFormats: [
      "md",
      "jpg",
      "mp4",
      "pdf",
      "ico",
      "html",
      "css", // css is not yet a recognized template extension in Eleventy
    ],
    dir: {
      input: "pages",
      output: "docs",
    },
  };
};
