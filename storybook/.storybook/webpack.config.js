module.exports = (_baseConfig, _env, config) => {
  config.resolve.extensions = ['.ts', '.tsx', '.js']
  config.module.rules.push({
    test: /\.tsx?$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', {flow: false, typescript: true}]],
    },
  })

  return config
}
