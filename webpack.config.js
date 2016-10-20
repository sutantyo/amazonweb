module.exports = {
	entry: "./server/jsx/entry.jsx",
	output: {
		path: "./public/js",
		filename: "bundle.js"	
	},
	module: {
		loaders: [
			{ test: /\.js[x]?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: { presets: ['react','es2015'] }
			}
		]
	}
}
