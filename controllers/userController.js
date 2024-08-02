const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/model');
const generateToken = ()=> {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'});
}
const registerUser = asyncHandler(async(req,res)=> {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(300);
    }
    const userExists = await User.findOne({email});
    if(userExist) {
        res.status(400);
        throw new Error('User already exists');
    };
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.has(password,salt);
     
    // create User
    const user = await User.create({
        name,email,password:hashedPassword,
    })
    if(user) {
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})
