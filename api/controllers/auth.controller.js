import User from '../models/User.model.js'
import bcryptjs from 'bcryptjs'
import errorHandler from '../utils/error.js';
import jwt from "jsonwebtoken"


const signup = async (req, res, next)=>{

    const {username, email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return next(errorHandler(400, 'All field are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newuser = new User ({
        username,  
        email,
        password: hashedPassword,
    });


    try {
        await newuser.save();
        res.json({message: "signup sucessfill"})
    } catch (error) {
        next(error)
    }


}



const signin = async (req, res, next) =>{
    
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        return next(errorHandler(400, "All fields are required"))
    }

    try {
        const user = await User.findOne({email})
        if(!user){
            return next(errorHandler(404, "Invalid email or password"))
        }

        const isCorrectPass = bcryptjs.compareSync(password, user.password);
        if(!isCorrectPass){
            return next(errorHandler(404, "Invalid email or password"))
        }

        const token = jwt.sign(
            {id: user._id}, process.env.JWT_SECRET, 
        )

        //removing password info 
        const {password: pass, ...rest} = user._doc

        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest);

    } catch (error) {
        next(error);
    }
}

export {signup, signin};

