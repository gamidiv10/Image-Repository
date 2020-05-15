const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageId:{
        type: Number,
        required: true
    }
    // Image:{
    //     type:Image
    // }
})

module.exports = mongoose.model('Image', ImageSchema);