const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const errorMiddleware = require('./middlewares/error');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoutes');
const orderRoute = require('./routes/orderRoute');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Import routes
app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);

// Error middleware
app.use(errorMiddleware);

module.exports = app;