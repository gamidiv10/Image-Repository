const Image = require("../models/image");
const fs = require("fs");
const formidable = require("formidable");

// @desc Get all images
// @route GET /images
// @access Public
exports.getImages = async (req, res, next) => {
  try {
    const images = await Image.find();
    return res.status(200).json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Server Error ${error}`,
    });
  }
};

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
      if (err) {
        console.log("error:", err.message);
        res.json("error");
      }
      var promises = [];
      var objList = [];
      for (var i = 0; i < Number(fields.count); i++) {
        var fileName = files[`file[${i}]`].name;
        var filePath = files[`file[${i}]`].path;

        promises.push(readFile(files[`file[${i}]`].path));

        objList.push({
          imageId: Math.random() * 100000000,
          fileName: fileName,
          filePath: filePath,
        });
      }

      Promise.all(promises).then((promises) => {
        promises.forEach((data, index) => {
          objList[index]["file"] = data;
        });
        var imgList = [];
        Image.insertMany(objList, (err, docs) => {
          if (err) {
            console.log(err.message);
          }
          imgList = docs;
          console.log("imglist 1", imgList)
          return res.status(201).json({
            sucess: true,
            data: docs,
            });
        })

      });
    });
  } catch (error) {
    console.log("error:", error.message);

    return res.status(500).json({
      sucess: false,
      error: "Server Error",
    });
  }
};

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function read(err, data) {
      if (err) {
        reject(err.message);
      } else {
        resolve(data);
      }
    });
  });
}

// @desc Delete images
// @route DELETE /images/:id
// @access Public
exports.deleteImage = async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.imageId);
    if (!image) {
      return res.status(404).json({
        success: false,
        error: "No Image Found",
      });
    }
    await image.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      error: "Server Error",
    });
  }
};
