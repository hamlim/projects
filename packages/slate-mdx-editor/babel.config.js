module.exports = function(api) {
  api.cache.never()
  return {
    presets: [
      ['@babel/preset-env', { useBuiltIns: true }],
      '@babel/preset-react',
      [
        '@babel/plugin-transform-runtime',
        {
          regenerator: true,
        },
      ],
    ],
  }
}
