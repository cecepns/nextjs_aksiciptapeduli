import db from '../../../../libs/db'
// import authorization from '../../../middlewares/authorization'

export default async function handler(req,res) {
    if (req.method !== 'GET') 
    return res.status(405).json({message: 'method not get'});

    // const auth = await authorization(req,res)
    const slug = req.query.id

    const data = await db('artikel')
            .where({slug});

    res.status(200);
    res.json({
        message : 'success',
        data 
    })


}
