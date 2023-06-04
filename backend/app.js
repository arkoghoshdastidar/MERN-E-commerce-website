const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const errorMiddleware = require('./middlewares/error');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoutes');

app.use(express.json());
app.use(cookieParser());

// Import routes
app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);

// Error middleware
app.use(errorMiddleware);

module.exports = app;