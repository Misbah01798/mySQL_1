const express = require('express')
const cors = require('cors');


const app = express()
// app.use('/api', router); // API routes
app.use(express.static('public')); // Static file serving

app.use(cors());
const db = require('./models')
app.use(express.json());

//router
const postRouter = require('./routes/Posts')
const userRouter  = require("./routes/User");
const productRouter  = require("./routes/Products");
const cartRouter = require('./routes/Carts');
const orderRequestRouter = require('./routes/OrderRequest');
const invoiceRouter = require('./routes/Invoice');
const newsRouter = require('./routes/News');
const customerRouter = require('./routes/Customers');
const orderRoutes = require('./routes/Orders');

app.use("/posts", postRouter);

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use('/carts', cartRouter);
app.use('/orderRequest', orderRequestRouter);
app.use('/invoice', invoiceRouter);
app.use('/news', newsRouter);
app.use('/customers', customerRouter);
app.use('/orders', orderRoutes);

db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
    console.log('Server is running port 3001')
});

});
