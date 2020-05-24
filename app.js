const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var ejs = require('ejs');

//set template engine to EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

//db connection, use authentication, csrf protection
const mongoose = require('mongoose');
const User = require('./models/user');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = 'mongodb+srv://macho:7EfwuOmBNUmbjG2T@cluster0-gconm.mongodb.net/test?w=majority';
const csrf = require('csurf');

//add this to make public folder available to serve static files, like css
app.use(express.static(path.join(__dirname, 'public')));

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf();

app.use(
    session({
        secret: 'my secret', 
        resave: false, 
        saveUninitialized: false,
        store: store 
    })
);

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});


app.use(csrfProtection);
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});



const webRoutes = require('./routes/web');
app.use(webRoutes);

mongoose
    .connect(
        MONGODB_URI
    )
    .then(
        result => {
            User.findOne().then(user => {
                if (!user) {
                    const user = new User({
                        name: "Michal",
                        email: "michal.machovic@gmail.com",
                        cart: {
                            items: []
                        }
                    });
                    user.save();
                }
            });
            app.listen(3000);
        }
    )
    .catch(
        error => {
            console.log(error);
        }
    )
