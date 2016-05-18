var webpack = require('webpack')
var path = require('path')

var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'

module.exports = {
	devtool: '#source-map',
	resolve: {
    extensions: ['', '.js', '.jsx']
  },
	context: path.join(__dirname, '..'), // absolute path!
	entry: {
		index: ['./client/index.js', hotMiddlewareScript],
	},
	output: {
		path: path.join(__dirname, '..', 'public', 'js'), // absolute path!
		filename: '[name].js',
		publicPath: '/js/'
	},
	module: {
		loaders: [{ 
	  	test: /\.(css|styl)$/, 
	  	loader: 'style-loader!css-loader!stylus-loader' 
	  }, {
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			__LOG__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
	]
}