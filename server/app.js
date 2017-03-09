import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Routes from './routes';

require('dotenv').config();

// Set up the express app
const app = express();

app.set('superSecret', process.env.SECRET);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
Routes(app);

export default app;
