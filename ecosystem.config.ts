const config = {
	apps: [
		{
			name: "elite-hiring-task",
			script: "./dist/server.js",
			watch: true,
			env: {
				NODE_ENV: "development",
				PORT: 3000,
			},
			env_production: {
				NODE_ENV: "production",
				PORT: 80,
			},
		},
	],
};

export default config;
