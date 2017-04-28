var webpackConfig = require('./webpack.config.develop');
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
	config.set({
		browsers: ['Chrome'],
		files: [
			'test.bundle.js'
		],
		frameworks: ['jasmine'],
		plugins: [
			'karma-chrome-launcher',
			'karma-jasmine',
			'karma-sourcemap-loader',
			'karma-webpack'
		],
		preprocessors: {
			'test.bundle.js': ['webpack', 'sourcemap']
		},
		reporters: ['dots'],
		singleRun: true,
		webpack: webpackConfig,
		webpackMiddleware: {
			noInfo: true
		}
	});
};
