import db from '../../../libs/db'
// import authorization from '../../../middlewares/authorization'

export default async function handler(req,res) {
    if (req.method !== 'GET') 
    return res.status(405).json({message: 'method not get'});

    // const auth = await authorization(req,res)
    // console.log(req.query.per_page)

    const request = req.query
    const perPage = request.per_page || 6
    const page = request.page || 1
    if (page < 1) page = 1
    const offset = (page - 1) * perPage;

    const total = await db('artikel').count('id as total')
    const data = await db('artikel').offset(offset).limit(perPage).orderBy('id', 'desc');

    res.status(200);
    res.json({
        message : 'success',
        data ,
        total : total[0].total
    })


}
