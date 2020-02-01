module.exports = {
  plugins: {
    tailwindcss: {},
    ...(process.env.NODE_ENV === `production`
      ? {
          '@fullhuman/postcss-purgecss': {
            content: [`./components/**/*.tsx`, `./pages/**/*.tsx`],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          },
          autoprefixer: {}
        }
      : {})
  }
};
