const express = require('express');

const { getImages, addImage, deleteImage } = require('../controllers/images');
const router = express.Router();

router
    .route('/')
    .get(getImages)
    .post(addImage);

router
    .route('/:imageId')
    .post(deleteImage);

module.exports = router;
