const configDir = './config/';
const merge = require('webpack-merge');
const fileExists = require('file-exists');

module.exports = function Exporter(environment) {
  const env = environment || process.env.NODE_ENV || 'LOCAL';
  const baseConfig = require(`${configDir}webpack.BASE.config.js`);
  const envConfig = fileExists(`${configDir}webpack.${env}.config.js`) ? require(`${configDir}webpack.${env}.config.js`) : require(`${configDir}webpack.LOCAL.config.js`);

  return merge(
    baseConfig,
    envConfig,
  );
};
