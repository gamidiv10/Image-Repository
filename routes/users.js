const express = require('express');

const { registerUser, getUser } = require('../controllers/users');

const router = express.Router();

router
    .route('/register')
    .post(registerUser);

router
    .route('/:userId')
    .get(getUser)

module.exports = router;
