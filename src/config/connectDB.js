'use-strict'
import logger from './winston';
require('dotenv').config()

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT,
	logging: (message) => {logger.app.info(message)},
	dialectOptions: process.env.DB_SSL === 'true' ? {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	} : {},
	pool: {
		max: 5,
		min: 0,
		acquire: 60000,
		idle: 10000
	},
	retry: {
		max: 3,
		timeout: 60000
	}
});

let connectDB = async () => {
	try {
		logger.app.info(`Attempting to connect to database at ${process.env.DB_HOST}:${process.env.DB_PORT} with SSL=${process.env.DB_SSL}`);
		await sequelize.authenticate();
		logger.app.info('Connection has been established successfully.');
	} catch (error) {
		logger.app.error('Unable to connect to the database:', error);
		logger.app.error(`Connection details: Host=${process.env.DB_HOST}, Port=${process.env.DB_PORT}, Database=${process.env.DB_DATABASE}, SSL=${process.env.DB_SSL}`);
		// Retry connection after 5 seconds in production
		if (process.env.NODE_ENV === 'production') {
			logger.app.info('Retrying connection in 5 seconds...');
			setTimeout(connectDB, 5000);
		}
	}
};
export default connectDB;