const express = require('express');
const app = express();
const tarifSaisonnierRouter = require('./api/routes/tarifSaisonnier');
const produitServiceRouter = require('./api/routes/produitService');
const produitAssocieRouter = require('./api/routes/produitAssocie');
const usersRouter = require('./api/routes/users');
const translationRouter = require('./api/routes/translation');
const menuRouter = require('./api/routes/menu');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();


mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(console.log("Connected to MongoDB"))
    .catch(error => console.log(error));

mongoose.Promise = global.Promise;

app.use(morgan('dev'));

app.use(express.json());

app.use(cors());
// Routers
app.use('/produitAssocies',produitAssocieRouter);
app.use('/produitServices',produitServiceRouter);
app.use('/tarifSaisonniers',tarifSaisonnierRouter);
app.use('/menu',menuRouter);
app.use('/translation',translationRouter);
app.use('/users',usersRouter);

app.use('/public/images',express.static('./public/images'));
app.use('/public/images/productServices/Pd',express.static('./public/images/productServices/Pd'));
// Error handling
app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status=404;
    next(error);
});

app.use((error, req, res, next)=>{
    const errorStatus = error.status||500;
    res.status(errorStatus);
    res.json({
        error:{
            message: error.message,
            status: errorStatus
        }
    });
});

module.exports = app;

