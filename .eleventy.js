module.exports = function (eleventyConfig) {
  return {
    templateFormats: [
      "md",
      "jpg",
      "mp4",
      "pdf",
      "ico",
      "css", // css is not yet a recognized template extension in Eleventy
    ],
    dir: {
      input: "pages",
      output: "docs",
    },
  };
};
