import db from '../../../../libs/db'
import Authorization from '../../../../middlewares/authorization'
// const fs = require('fs')

export default async function handler(req, res) {
    if (req.method !== 'PUT') 
        return res.status(405).json({type:'error', message: 'method not put'});

    const auth = await Authorization(req,res)
    
    const id = req.query.id;
    const {judul, deskripsi, target, daritanggal, sampaitanggal} = req.body

    const data = await db('campaign')
        .where({id})
        .update({
            judul,
            deskripsi,
            target,
            daritanggal,
            sampaitanggal
        })

    // console.log(sampaitanggal)


    res.status(200);
    res.json({type: 'success', message: 'campaign updated successfully'})

}
