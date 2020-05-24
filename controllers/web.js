const User = require('../models/user');

exports.getIndex = (req, res, next) => {
    res.render('index', {
        pageTitle: 'index'
    });
}

exports.getContact = (req, res, next) => {
    User.find()
        .then(user => {
            console.log(user);
        });

    res.render('contact', {
        pageTitle: 'Contact'
    });
}
