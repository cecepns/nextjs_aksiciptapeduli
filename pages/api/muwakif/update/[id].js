import db from '../../../../libs/db'

export default async function handler(req, res) {
    if (req.method !== 'PUT') 
        return res.status(405).json({message: 'method not PUT'});
    
    const id = req.query.id
    const {jumlahdonasi, idmuwakif} = req.body

    db.transaction(async function (trx) {

        await db('campaign')
            .where({id})
            .increment('terkumpul', jumlahdonasi)
            .then(trx.commit)
            .catch(trx.rollback);

        await db('muwakif')
            .where('id', idmuwakif)
            .update('status', 'success')
            .then(trx.commit)
            .catch(trx.rollback);

    })
        .then(function (inserts) {
            res.status(200);
            res.json({type: 'success', message: 'berhasil di acc'})
        })
        .catch(function (error) {
            res.status(200);
            res.json({type: 'error', message: error})
        });;

}
