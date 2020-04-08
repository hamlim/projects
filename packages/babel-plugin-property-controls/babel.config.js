module.exports = function(api) {
  api.cache.never()
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: true } }],
      '@babel/preset-react',
    ],
    ignore:
      process.env.NODE_ENV !== 'test'
        ? ['src/test.js', 'src/__fixtures__/**/*.js']
        : [],
  }
}
