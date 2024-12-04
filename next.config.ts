const { Config } = require('next-recompose-plugins');

module.exports = new Config((phase, args) => {
  return {
    reactStrictMode: true,
    experimental: {},
  };
}).build();
