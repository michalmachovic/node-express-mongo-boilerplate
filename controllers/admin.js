const bcrypt = require('bcryptjs');
const User = require('../models/user');
const News = require('../models/news');

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
}

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('admin/login', {
        pageTitle: 'login',
        errorMessage: message
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email or password.');
                return res.redirect('/admin/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/admin/news');
                        })            
                    }
                    req.flash('error', 'Invalid email or password.');
                    res.redirect('/admin/login');
                })
                .catch(err => {
                    res.redirect('/admin/login');
                })
    })
    .catch(err => console.log(err));
}

exports.getNews = (req, res, next) => {
    News.find()
    .then(result => {
        res.render('admin/news', {
            pageTitle: 'news',
            news: result
        });    
    })
    .catch(err => {
        console.log(err);
    })
}


exports.getAddNews = (req, res, next) => {
    res.render('admin/add-news', {
        pageTitle: 'add news'
    });
}

exports.postAddNews = (req, res, next) => {
    const title = req.body.title;
    const body = req.body.body;

    const news = new News(
        {
            title: title,
            body: body
        }
    );
    news.save();
    res.redirect('news');
}
