const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  module.exports = {
    host: 'https://api.meco.dev',
    port: 8080,
    version: 'v1',
    maxKeys: 10
  };
} else {
  module.exports = {
    host: 'http://localhost',
    port: 8080,
    version: 'v1',
    maxKeys: 10
  };
}
