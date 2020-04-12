module.exports = function({ node = false, esmodules = false } = {}) {
  return function(api) {
    api.cache.never()
    let cfg = ['@babel/preset-env', { targets: { node }, esmodules }]
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
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-object-rest-spread',
      ],
      ignore:
        process.env.NODE_ENV !== 'test'
          ? ['src/test.js', 'src/__fixtures__/**/*.js']
          : [],
    }
  }
}
