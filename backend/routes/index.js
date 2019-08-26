const express = require('express');
const router = express.Router();
// const feedbacks = require('./feedbacks');
const users = require('./user');
const restaurants = require('./restaurant');

// router.use('/feedbacks', feedbacks);
router.use('/users', users);
router.use('/restaurants', restaurants);

module.exports = router;
