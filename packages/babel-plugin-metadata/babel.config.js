module.exports = function(api) {
  api.cache.never()
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: true } }],
      '@babel/preset-react',
    ],
  }
}
