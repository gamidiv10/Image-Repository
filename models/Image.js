const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageId:{
        type: Number,
        required: true,
        unique: true
    },
    fileName:{
        type: String,
        required: true,
    },
    filePath:{
        type: String,
        required: true,
    },
    file:{
        type: Buffer,
        required: true
    }
})

module.exports = mongoose.model('Image', ImageSchema);