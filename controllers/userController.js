const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const registerUser = asyncHandler(async(req, res) => {
    
    
    try {
        const {username, email, password,date_of_birth} = req.body 
        
        if (!username || !email || !password || !date_of_birth)  {
            
            res.status(400)
            throw new Error('Please Enter all fields')
        }
        const userExists = await User.findOne({email})
        if (userExists) {
            
            res.status(400)
            throw new Error('User already exists')
 
        }
        if (!(password.length >= 8)) {
            
            res.status(400)
            throw new Error('Password must be at least 8 charactor')

        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            username,
            email,
            date_of_birth,
            password : hashedPassword
        })

        if (user) {
            res.status(201).json({
                _id: user.id,
                username: user.name,
                email: user.email,
                date_of_birth: user.date_of_birth,
                password: user.password,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
 
        
    } catch (error) {
        res.status(400).json({message: error.message})

        
    }


}) 

const loginUser =asyncHandler(async(req, res) => {
    try {
        const { email, password, username } = req.body
        if((!email && !username)|| !password){
            res.status(401)
            throw new Error("Please Enter A required field")
        }
        const user = await User.findOne({ email }) || await User.findOne({username});
        

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid credentials')
        }
        
        
     } catch (error) {
           res.status(400).json({message : error.message})
     }
 
 
 })
 const updatePassword = async (req, res) => {
    try {
      const {password} = req.body
      if(!password){
        res.status(401)
        throw new Error("Please Enter Password")
      }
      const user = await User.findById(req.user.id)
      if (!user) {
        res.status(401)
        throw new Error('User not found')
      }
  
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)    
  
      const updateBook = await User.findByIdAndUpdate(
        req.params.id,
        hashedPassword,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json(updateBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };



const generateToken = (id) => {
    
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        
        expiresIn: '3d',

    })
}

 
module.exports = {
    
    registerUser,
    loginUser,
    updatePassword

}