module.exports = [
	{
		mode: 'development',
		entry: './app.js',
		target: 'electron-main',
		output: {
			path: __dirname + '/dev',
			filename: 'app.js',
		}
	},
	{
		mode: 'production',
		entry: './app.js',
		target: 'electron-main',
		output: {
			path: __dirname + '/pre_build',
			filename: 'app.js'
		}
	}
];