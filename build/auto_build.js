var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
const config = require('./config.json')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.config.js')
var inquirer = require('inquirer');

var spinner = ora('building ' +
  ' production' + '...')

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
      API: JSON.stringify(config["sit"])
    }
  })
)
start();

function start() {
  spinner.start()
  shell.rm('-rf', './dist')
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    console.log(chalk.cyan('  Build complete.\n'))
  })
}