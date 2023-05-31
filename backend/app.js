const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const productRoute = require('./routes/productRoute');

app.use(express.json());

// Import routes
app.use('/api/v1', productRoute);

// Error middleware
app.use(errorMiddleware);

module.exports = app;