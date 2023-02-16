require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const { connect } = require("http2");
const PORT = process.env.PORT || 3500;

//connect DB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/api/sessions', require('./routes/auth'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use('/users', verifyJWT,  require('./routes/api/users'));

app.all( '*', (req, res, next) => {
    const error = new Error('Requested resources were not found.');
    error.statusCode = 404;
    next(error);
})

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const { message, data } = error;
    console.log('error handler - message: ', message);
    console.log('error handler - data: ', data);
    res.status(statusCode).json({ message: message, data: data })
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});