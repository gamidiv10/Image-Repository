const Image = require('../models/image');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

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
        var form = await formidable.IncomingForm();
        form.keepExtensions = true;
        form.maxFieldsSize = 10 * 1024 * 1024;
        form.multiples = true;
        form.parse(req, (err, fields, files) => {
            if(err){
                console.log("error:", err.message);
                res.json("error");
            }
        var file = files.file;
        var filePath = file.path;
        var fileName = file.name;
        fs.readFile(filePath, function read(err, data) {
           const image = Image.create({
                "imageId": Math.random() * 100000,
                "fileName": fileName,
                "filePath": filePath,
                "file": data
            });
            return res.status(201).json({
                sucess: true,
                data: image
            });
    
        });
    });
        
}

  catch (error) {
        if(error.name === 'ValidationError'){
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                sucess: false,
                error: messages
            });
        }
        else{
            console.log("error:", error.message);

            return res.status(500).json({
                sucess: false,
                error: 'Server Error'
            });
        }
    }
 
} 

