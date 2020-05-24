const path = require('path');
const express = require('express');
const router = express.Router();

const webController = require('../controllers/web');

router.get('/', webController.getIndex);
router.get('/contact', webController.getContact);

module.exports = router;