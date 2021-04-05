import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        //Check if exists
        const existingUser = await User.findOne({ email });
        //Does not exist
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist"});
        //Check password validity
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" });
        //Valid user and password. Prepare token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: '1h'})
        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const signUp = async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;

    try {
         //Check if exists
         const existingUser = await User.findOne({ email });
         //There's already a user with that credentials
         if(existingUser) return res.status(404).json({ message: "User already exists"});
         //Check password validity
         if(password !== confirmPassword)  return res.status(404).json({ message: "Passwords don't match "})
         //Can create user
         //First we hash the password
         const hashedPassword = await bcrypt.hash(password, 12);
         //Create user
         const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});
         const token = jwt.sign({ email: result.email, id:result._id}, 'test secret', { expiresIn: '1h'});
         res.status(200).json({ result, token })
    } catch (error) {
        console.log(`error`, error)
        res.status(500).json({ message: 'Something went wrong' })
    }
    
}
