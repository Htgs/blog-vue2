const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const configs = {
	// 入口
	// entry: {[entryChunkName: string]: string|Array<string>
	entry: {
		// 主应用引入
		app: './index.js',
		// 公共库引入
		vendors: ['bootstarp'],

		// 可以设置多页入口
		// pageone: './pageone.js',
		// pagetwo: './pagetwo.js',
	},
	// 输出
	output: {
		// 编译文件的文件名(filename)，首选推荐：// main.js || bundle.js || index.js
		// 如果你的配置创建了多个 "chunk"（例如使用多个入口起点或使用类似 CommonsChunkPlugin 的插件），你应该使用以下的替换方式来确保每个文件名都不重复。
		// [name] 被 chunk 的 name 替换。
		// [hash] 被 compilation 生命周期的 hash 替换。
		// [chunkhash] 被 chunk 的 hash 替换。
		filename: 'bundle.js', // [name].js
		// output.path 对应一个绝对路径，此路径是你希望一次性打包的目录。
		// 导出目录为绝对路径（必选项）。
		// [hash] 被 compilation 生命周期的 hash 替换。
		path: path.join(__dirname, '/dist'), // "/home/proj/cdn/assets/[hash]",
		// 非入口的 chunk(non-entry chunk) 的文件名，路径相对于 output.path 目录。
		chunkFilename: '/[id].[name].[chunkhash].[hash].js',
		publicPath: '/'  // "http://cdn.example.com/assets/[hash]/"
	},
	module: {
		rules: [
			// {test: /\.css$/, loader: 'css-loader'}
			// // 等同于
			// {test: /\.css$/, use: 'css-loader'}
			// // 等同于
			// {test: /\.css$/, use: {
			//   loader: 'css-loader',
			//   options: {}
			// }}
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(['css-loader', 'style-loader'])
			},
			{
				test: /\.js$/,
				
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/[name].css'),
	]
}

module.exports = configs
