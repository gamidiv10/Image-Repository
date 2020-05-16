const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const busboy = require('connect-busboy');
dotenv.config({path: './config/config.env'});
const connectDB = require('./config/db');
connectDB();
const images = require('./routes/images');

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}
app.use(busboy())
app.use('/images', images);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
