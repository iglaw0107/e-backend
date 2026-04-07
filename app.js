const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const productRouter = require('./routes/product.routes')
const { globalLimiter } = require('./middleware/rateLimiter');
const { authLimiter } = require('./middleware/rateLimiter');
const helmet = require('helmet');

const cors = require('cors');

app.use(helmet());
app.use(globalLimiter);
app.use(cors())
app.use(express.json());
app.use('/auth', authLimiter ,authRoutes);
app.use('/p1', productRouter);

app.get('/', (req, res)=> {
    res.send('E-backend');
})

module.exports = app;



