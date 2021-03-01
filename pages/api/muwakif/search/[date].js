import db from '../../../../libs/db'
// import authorization from '../../../middlewares/authorization'

export default async function handler(req, res) {
    if (req.method !== 'POST') 
        return res.status(405).json({message: 'method not get'});
    
    const from = req.query.date;
    const to = req.body.endDate;

    const data = await db('muwakif')
        .whereBetween('created_at', [from, to])
        .orderBy('id', 'desc');

    res.status(200);
    res.json({
        type: 'success',
        message: data.length + ' data ditemukan',
        data
    })

}
