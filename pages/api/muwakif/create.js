import db from '../../../libs/db'

async function handler(req, res) {
    if (req.method !== 'POST') 
        return res.status(405).json({message: 'method not post'});
    
    const {
        idCampaign,
        slug,
        nama,
        email,
        nohp,
        jumlahdonasi,
        jenispembayaran,
        deskripsi
    } = req.body

    db.transaction(async function (trx) {

        await db('muwakif')
            .insert({
            idCampaign,
            slug,
            nama,
            email,
            nohp,
            jumlahdonasi,
            jenispembayaran,
            deskripsi,
            status: "pending"
        })
            .then(trx.commit)
            .catch(trx.rollback);

    })
        .then(function (inserts) {
            res.status(200);
            res.json({type: 'success', message: 'donasi berhasil dibuat'})
        })
        .catch(function (error) {
            res.status(200);
            res.json({type: 'error', message: error})
        });;
    

}

export default handler