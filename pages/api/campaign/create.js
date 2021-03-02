import db from '../../../libs/db'
import multer from "multer";
import Authorization from '../../../middlewares/authorization'

export const config = {
    api: {
        bodyParser: false
    }
};

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/campaign");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + "_" + file.originalname);
    }
});

let upload = multer({storage: storage});

async function handler(req, res) {
    if (req.method !== 'POST') 
        return res.status(405).json({message: 'method not post'});
    
    const auth = await Authorization(req, res);

    upload.single("image")(req, {}, err => {
        if (!req.file) 
            return res.status(405).json({
                type: 'error',
                message: '' + err
            })

        const image = req.file.filename
        const {
            judul,
            fundraiser,
            slug,
            deskripsi,
            target,
            terkumpul,
            daritanggal,
            sampaitanggal
        } = req.body

        db.transaction(async function (trx) {

            await db('campaign')
                .transacting(trx)
                .insert({
                    image,
                    judul,
                    fundraiser,
                    slug,
                    deskripsi,
                    target,
                    terkumpul,
                    daritanggal,
                    sampaitanggal
                })
                .then(trx.commit)
                .catch(trx.rollback);

        })
            .then(function (inserts) {
                res.status(200);
                res.json({type: 'success', message: 'campaign create successfully'})
            })
            .catch(function (error) {
                res.status(405);
                res.json({type: 'error', message: error.sqlMessage})
            });;

    });

}

export default handler