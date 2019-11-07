const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
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
 mode: 'development',
};
