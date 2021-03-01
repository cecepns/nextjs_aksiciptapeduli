import db from '../../../libs/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function Login(req, res) {
    if (req.method !== "POST") 
        return res.status(405).json({message: "method not post"})

    const {email, password} = req.body

    const checkUser = await db('users')
        .where({email})
        .first();

    if (!checkUser) 
        return res.status(401).json({type: "error", message: "email is not registered"})

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) 
        return res.status(401).json({type: "error", message: "Incorrect password"})

    const token = jwt.sign({
        id: checkUser.id,
        email: checkUser.email
    }, 'cecepganteng', {expiresIn: '1h'})

    res
        .status(200)
        .json({type: 'success', message: 'Login Successfully', token})
}

export default Login