var webpack = require('webpack')
var path = require('path')

module.exports = {
	devtool: '#source-map',
	resolve: {
    extensions: ['', '.js', '.jsx']
  },
	context: path.join(__dirname, '..'), // absolute path!
	entry: {
		index: './client/index.js',
	},
	output: {
		path: path.join(__dirname, '..', 'public', 'js'), // absolute path!
		filename: '[name].js',
		publicPath: '/js/'
	},
	module: {
		loaders: [{ 
	  	test: /\.(css|styl)$/, 
	  	loader: 'style-loader!css-loader!stylus-loader', 
	  }, {
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			__LOG__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	]
}