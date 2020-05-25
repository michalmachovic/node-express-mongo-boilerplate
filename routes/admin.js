const path = require('path');
const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

const adminController = require('../controllers/admin');

router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);

module.exports = router;