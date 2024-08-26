const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const db = require('./models');

// Initialize Express
const app = express();

// Middleware Setup
app.use(cookieSession({
    name: "session",
    keys: ["mis"],
    maxAge: 48 * 60 * 60 * 1000 // 48 hours
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}));

app.use(express.static('public')); // Static file serving
app.use(express.json());

// Router Imports
const postRouter = require('./routes/Posts');
const userRouter = require("./routes/User");
const productRouter = require("./routes/Products");
const cartRouter = require('./routes/Carts');
const orderRequestRouter = require('./routes/OrderRequest');
const invoiceRouter = require('./routes/Invoice');
const newsRouter = require('./routes/News');
const customerRouter = require('./routes/Customers');
const orderRoutes = require('./routes/Orders');

// Route Setup
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use('/carts', cartRouter);
app.use('/orderRequest', orderRequestRouter);
app.use('/invoice', invoiceRouter);
app.use('/news', newsRouter);
app.use('/customers', customerRouter);
app.use('/orders', orderRoutes);

// Sync Database and Start Server
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
});
