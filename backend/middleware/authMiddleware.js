const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];

        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log(decoded);
                const user = await User.findById(decoded.id).select('-password'); // Avoid sending the password field

                if (!user) {
                    res.status(401);
                    throw new Error('User not found');
                }

                req.user = user;
                next();
            }
        } catch (error) {
            console.error('Error in authMiddleware:', error.message);
            res.status(401);
            throw new Error('Not Authorized, token failed or has expired');
        }
    } else {
        res.status(401);
        throw new Error('Not Authorized, no token');
    }
});

//isAdmin

const isAdmin = asyncHandler(async(req,res,next)=>{
    // console.log(req.user)
    const {email} = req.user;
    const adminUser = await User.findOne({email})
    if(adminUser.role!=="admin"){
        throw new Error('You Are not Admin Get Lost !')
    }else{
        next();
    }
})

module.exports = {authMiddleware,isAdmin}