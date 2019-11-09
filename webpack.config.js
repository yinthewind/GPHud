const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const extensionConfig = {
 entry: './src/main.js',
 output: {
 	filename: 'inject.js',
	path: path.resolve(__dirname, 'dist'),
 },
 plugins: [
 	new CopyPlugin([
		{ from: 'chrome_extension' }
	]),
 ],
 module: {
	rules: [
		{
			test: /.(js|jsx)$/,
			loader: 'babel-loader'
		}
	]
},
resolve: {
	extensions:['*','.js','.jsx']
},
 watch: true,
 mode: 'development',
};

const overlayConfig = {
	entry: './src/overlay.js',
	output: {
		filename: 'overlay.bundle.js',
		path:path.resolve(__dirname,'./dist')
	},
	 module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				loader: 'babel-loader'
			}
		]
	},
	resolve: {
		extensions:['*','.js','.jsx']
	},
	 watch: true,
	 mode: 'development',
};

module.exports = [ extensionConfig, overlayConfig];
