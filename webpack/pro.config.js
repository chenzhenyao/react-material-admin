var webpack = require('webpack')
var path = require('path')

module.exports = {
	devtool: '#source-map',
	context: path.join(__dirname, '..'), // absolute path!
	resolve: {
    modulesDirectories: ['client', 'node_modules'],
    extensions: ['', '.js', '.jsx']
  },
	entry: {
		index: './client/index.js',
		vendor: [
			'fastclick',
			'immutable',
			'nprogress',
			'react',
			'react-custom-scrollbars',
			'react-dom',
			'react-redux',
			'react-router',
			'react-router-redux',
			'react-tap-event-plugin',
			'redux',
			'redux-form',
			'redux-immutablejs',
			'redux-thunk',
			'simplestorage.js',
			'superagent',
			'validator'
		]
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
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	]
}