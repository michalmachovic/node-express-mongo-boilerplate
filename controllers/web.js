const User = require('../models/user');
const News = require('../models/news');

exports.getNews = (req, res, next) => {
    News.find()
    .then(result => {
        res.render('news', {
            pageTitle: 'news',
            news: result
        });    
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getContact = (req, res, next) => {
    res.render('contact', {
        pageTitle: 'Contact'
    });
}
