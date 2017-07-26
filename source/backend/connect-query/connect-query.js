const qs = require('qs');
const url = require('url');

module.exports = function () {
  return function (req, res, next) {
    const parsedUrl = url.parse(req.url);
    req.query = qs.parse(parsedUrl.query);
    next();
  };
};
