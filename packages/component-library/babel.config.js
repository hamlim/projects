module.exports = function(api) {
  api.cache.using(() => process.env.NODE_ENV)
  let cfg = '@babel/preset-env'
  if (process.env.NODE_ENV === 'test') {
    cfg = [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ]
  }
  return {
    presets: [cfg, '@babel/preset-react'],
  }
}
