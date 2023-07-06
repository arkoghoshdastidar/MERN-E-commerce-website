const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const app = express();
const errorMiddleware = require('./middlewares/error');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoutes');
const orderRoute = require('./routes/orderRoute');
const paymentRoute = require('./routes/paymentRoute');
const cors = require('cors');

const corsOptions = {
    origin: true,
    credentials: true
};

dotenv.config({ path: 'backend/config/config.env' });

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Import routes
app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', paymentRoute);

// Error middleware
app.use(errorMiddleware);

module.exports = app;