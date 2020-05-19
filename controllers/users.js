const User = require('../models/user');


// @desc Add a User
// @route POST /register
// @access Public
exports.registerUser = async (req, res, next) => {
    try {
        console.log("request", req.body);
        const user = await User.create(req.body);
        return res.status(201).json({
            success: true,
            data: user
        });
        
}

  catch (error) {
        if(error.name === 'ValidationError'){
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
            console.log(messages);
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
