const Image = require('../models/image');

// @desc Get all images
// @route GET /images
// @access Public
exports.getImages = async (req, res, next) => {
    try {
        const images = await Image.find();

        return res.status(200).json({
            success: true,
            count: images.length,
            data: images
        });
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            error: `Server Error ${error}`
        });
    }
}

// @desc Add a image
// @route POST /images
// @access Public
exports.addImage = async (req, res, next) => {
    try {
        const { text } = req.body;
        const image = await Image.create(req.body);
        return res.status(201).json({
            sucess: true,
            data: image
        });
        
    } catch (error) {
        if(error.name === 'ValidationError'){
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                sucess: false,
                error: messages
            });
        }
        else{
            return res.status(500).json({
                sucess: false,
                error: 'Server Error'
            });
        }
    }
 
} 

