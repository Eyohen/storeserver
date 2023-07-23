const User = require('../models/user.js')
// const {hashPassword, comparePassword} = require('../helpers/auth.js')
// import { hashPassword, comparePassword } from '../helpers/auth.js';
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();


const register = async (req, res) => {

// add validation
// check if email is taken
// hash password

    try{
        // destructure name,email,password from req.body
        const {name, email, password} = req.body;
        // all fields require validation
        if(!name.trim()){
        return res.json({error: "Name is required"});
        }
        if(!email){
            return res.json({error:"Email is taken"});
        }
        if(!password || password.length < 6){
            return res.json({error: "Password must be atleast 6 characters long"});
        }
        // check if email is taken
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({error: "Email already taken"})
        }
        // hash password
        

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    reject(err);
                }
                resolve(hash);
        });
    });
});
};

const hashedPassword = await hashPassword(password);
      
        // register user
        const user = await new User({
            name,
            email,
            password:hashedPassword,
        }).save()
        // create signed jwt
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'} );
        // send response 
        res.status(200).json({
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
                address: user.address
            },
            token,
        });
    } catch (err){
        console.log(err);
    }
    console.log(req.body);
};


//login

const login = async (req, res) => {

   
    
        try{
            // destructure name,email,password from req.body
            const {email, password} = req.body;
            // all fields require validation
         
            if(!email){
                return res.json({error:"Email is taken"});
            }
            if(!password || password.length < 6){
                return res.json({error: "Password must be atleast 6 characters long"});
            }
            // check if email is taken 
            const user = await User.findOne({email});
            if(!user){
                return res.json({error: "User not found"})
            }
          
            
    // compare password
    const comparePassword = (password, hashed) => {
        return bcrypt.compare(password, hashed);
    }
    const match = await comparePassword(password, user.password)
    if(!match){
        return res.json({error:"Wrong Password"})
    }
           
         
            // create signed jwt
            const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d',} );
            // send response 
            res.status(200).json({
                user:{
                    name:user.name,
                    email:user.email,
                    role:user.role,
                    address: user.address
                },
                token,
            });
        } catch (err){
            console.log(err);
        }
        console.log(req.body);
    };

    const secret = (req,res) =>{
        res.json({currentUser: req.user});
    }
    
    

module.exports = {register, login, secret};