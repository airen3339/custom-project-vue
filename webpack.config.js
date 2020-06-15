const path = require('path') // 系统路径模块
const htmlWebpackPlugin = require('html-webpack-plugin') // 引入模板渲染插件
const VueLoaderPlugin = require('vue-loader/lib/plugin') // 将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin") // 清除输出文件夹

module.exports = {
  entry: path.join(__dirname, './src/main.js'), // 项目总入口 js 文件
  // 输出文件
  output: {
    path: path.join(__dirname, 'dist'), // 所有的文件都输出到 dist 目录下
    filename: 'bundle-[hash].js' // 输出文件的名称加上 hash 值
  },
  module: {
    rules: [{
        // 使用 vue-loader 解析 .vue 文件
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        // 要加上 style-loader 才能正确解析 .vue 文件里的 <style> 标签内容
        use: ['style-loader', {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // 处理顺序是从 sass-loader 到 style-loader
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            // 当文件大小小于 limit byte 时会把图片转换为 base64 编码的 dataurl，否则返回普通的图片
            limit: 5120000, // 500k 以下转为 base64
            name: 'dist/assest/images/[name]-[hash:5].[ext]' // 图片文件名称加上内容哈希
          }
        }]
      },
      {
        // 转译 es6 代码为 es5 代码
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, // 不处理这两个文件夹里的内容
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'] // 自动解析文件后缀
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html', // 生成的文件名称
      template: 'index.html', // 指定用 index.html 做模版
      inject: 'body' // 指定插入的 <script> 标签在 body 底部
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin()
  ]
}