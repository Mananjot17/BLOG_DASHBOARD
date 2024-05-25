import User from '../models/User.model.js'
import bcryptjs from 'bcryptjs'
import errorHandler from '../utils/error.js';


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


export default signup;