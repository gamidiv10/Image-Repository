const express = require('express');

const { getImages, addImage } = require('../controllers/images');
const router = express.Router();

router
    .route('/')
    .get(getImages)
    .post(addImage);

module.exports = router;
