import db from '../../../../libs/db'
import Authorization from '../../../../middlewares/authorization'
const fs = require('fs')

export default async function handler(req, res) {
    if (req.method !== 'DELETE') 
        return res.status(405).json({message: 'method not delete'});
    
    const auth = await Authorization(req, res)

    const id = req.query.id;

    const data = await db('artikel')
        .where({id})
        .first()

    // console.log(data.image)

    const path = 'public/img/artikel/' + data.image

    fs.unlink(path, (err) => {
        if (err) {
            return res.json({type: 'error', message: err})
        }

    })

    db.transaction(trx => {
        db('artikel')
            .transacting(trx)
            .where({id})
            .del()
            .then(trx.commit)
            .catch(trx.rollback);

    })
    .then(callback => {
        res.status(200);
        res.json({type: 'success', message: 'artikel deleted successfully'})
    })
    .catch(error => {
        res.status(405);
        res.json({type: 'error', message: error.sqlMessage})
    });

}
