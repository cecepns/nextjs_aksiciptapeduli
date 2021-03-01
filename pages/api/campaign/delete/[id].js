import db from '../../../../libs/db'
import Authorization from '../../../../middlewares/authorization'
const fs = require('fs')

export default async function handler(req, res) {
    if (req.method !== 'DELETE') 
        return res.status(405).json({message: 'method not delete'});

    const auth = await Authorization(req,res)
    
    const image = req.query.id;

    const data = await db('campaign')
        .where({image})
        .del()

    const path = 'public/img/campaign/' + image

    fs.unlink(path, (err) => {
        if (err) {
            return res.json({type: 'error', message: err})
        }

    })

    res.status(200);
    res.json({type: 'success', message: 'campaign deleted successfully'})

}
