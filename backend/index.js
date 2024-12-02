require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const AuthRoutes = require('./routes/AuthRoutes')
const MongoStore = require('connect-mongo');
const ProductRoutes = require('./routes/ProductRoutes');
const CartRoutes = require('./routes/CartRoutes');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: 'https://jeinfrontend.vercel.app',
    methods: ['POST','GET','PUT','DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    resave: false,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 1000 * 24 * 60 * 60
    }),
    cookie: {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24
    }
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.error('MongoDB connection error:', error));

app.use('/api/auth', AuthRoutes)
app.use('/api/product', ProductRoutes)
app.use('/api/cart', CartRoutes)

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(PORT, () => {
    console.log('Server is listening on PORT: ' + PORT);
});
