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
			test: /.js$/,
			loader: 'babel-loader'
		}
	]
},
 watch: true,
 mode: 'development',
};

module.exports = [ extensionConfig];
