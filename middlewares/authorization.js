import jwt from 'jsonwebtoken'

export default function Authorization(req, res) {

    return new Promise((resolve, reject) => {
        const {authorization} = req.headers;

        if (!authorization) 
            return res.status(401).json({type:'error', message: 'Unauthorize'})

        const authSplit = authorization.split(' ');
        const [authType,
            authToken] = [authSplit[0], authSplit[1]]

        if (authType !== 'Bearer') 
            return res.status(401).json({type:'error', message: 'Unauthorize'})

        return jwt.verify(authToken, 'cecepganteng', function name(err, decoded) {
            if (err) 
                return res.status(401).json({
                    type: 'error',
                    message: err.message
                })

            return resolve(decoded)
        })

    })

}