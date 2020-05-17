const Image = require('../models/image');
const fs = require('fs');
const formidable = require('formidable');
const User = require('../models/user');

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
            success: false,
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
            console.log("files", files["file[1]"].name);
            var j = 1;
            console.log("files", files[`file[${j}]`].name);
            // console.log("fields", fields);
            var imgList = []
            for(var i = 0; i<Number(fields.count); i++)
            {
                console.log("Names", files[`file[${i}]`])
                var fileName = files[`file[${i}]`].name;
                var filePath = files[`file[${i}]`].path;
                
                fs.readFile(files[`file[${i}]`].path, async function read(err, data) {
                try{
                    var obj = {
                        "imageId": Math.random() * 100000000,
                        "fileName": fileName,
                        "filePath": filePath,
                        "file": data
                    }
                const image = await Image.create(obj);
                imgList.push(image);
            }
            catch (error)
            {
                console.log(error.message);
            }
            });
            }
            return res.status(201).json({
                sucess: true,
                data: imgList
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

// @desc Delete images
// @route DELETE /images/:id
// @access Public
exports.deleteImage = async (req, res, next) => {
    try {
        const image = await Image.findById(req.params.imageId);
        if(!image)
        {
            return res.status(404).json({
                success: false,
                error: 'No Image Found'
            })
        }
        await image.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
        
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            error: 'Server Error'
        });
    }
}