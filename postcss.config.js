const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssDiscardEmpty = require('postcss-discard-empty');
const postcssClean = require('postcss-clean');

module.exports = {
  plugins: [
    precss({}),
    autoprefixer({}),
    postcssDiscardEmpty({}),
    postcssClean({}),
  ],
};
