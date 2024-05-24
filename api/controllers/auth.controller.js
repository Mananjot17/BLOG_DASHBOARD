import User from '../models/User.model.js'
import bcryptjs from 'bcryptjs'

const signup = async (req, res)=>{

    const {username, email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return res.status(400).json({message: 'All fiels ars required'});
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
        res.status(500).json({message:error.message})
    }


}


export default signup;