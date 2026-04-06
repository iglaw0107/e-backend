const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const productRouter = require('./routes/product.routes')
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/p1', productRouter);

app.get('/', (req, res)=> {
    res.send('E-backend');
})

module.exports = app;



