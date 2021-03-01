import db from '../../../libs/db';
import bcrypt from 'bcryptjs';

async function Register(req, res) {
    if (req.method !== "POST") 
        return res.status(405).json({type: 'error', message: 'method not post'});
    
    const {email, password} = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const cekUser = await db('users')
        .where({email})
        .select();

    if (cekUser.length > 0) {
        return res
            .status(405)
            .json({message: 'User has already registered', type: 'error'})
    }

    const register = await db('users').insert({email, password: passwordHash});

    res.status(200);
    res.json({message: 'User registered successfully', type: 'success'})
}

export default Register