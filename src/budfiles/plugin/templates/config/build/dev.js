const devServer = ({config}) => ({
  devServer: {
    headers: {
			'Access-Control-Allow-Origin': '*',
			...config.headers,
		},
		disableHostCheck: true,
		host: 'localhost',
		hot: true,
		watchOptions: {
			aggregateTimeout: 300,
		},
		stats: {
			all: false,
			assets: true,
			colors: true,
			errors: true,
			performance: true,
			timings: true,
			warnings: true,
		},
		port: config.port,
  },
})

module.exports = devServer
