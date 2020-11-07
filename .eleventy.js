// module.exports = {
//     dir: {
//       input: "pages",
//       output: "docs"
//     }
//   };

//   module.exports = function(eleventyConfig) {
//     eleventyConfig.addPassthroughCopy('css')
//     return {
//       passthroughFileCopy: true
//     }
//   }

  module.exports = function(eleventyConfig) {
    return {
      templateFormats: [
        "md",
        "jpg",
        "mp4",
        "ico",
        "css" // css is not yet a recognized template extension in Eleventy
      ],
      dir: {
        input: "pages",
        output: "docs"
      }
    };
  };