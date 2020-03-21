module.exports = function(api) {
  api.cache.never()
  let cfg = '@babel/preset-env'
  if (process.env.NODE_ENV === 'test') {
    cfg = [
      '@babel/preset-env',
      {
        targets: {
          node: 8,
        },
      },
    ]
  }
  return {
    presets: [cfg, '@babel/preset-react'],
    plugins: [
      '@babel/plugin-transform-runtime',
      'babel-plugin-styled-components',
    ],
    ignore: process.env.NODE_ENV !== 'test' ? ['src/__tests__/*'] : [],
  }
}
