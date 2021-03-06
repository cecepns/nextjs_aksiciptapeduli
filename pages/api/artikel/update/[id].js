import db from '../../../../libs/db'
import multer from "multer";
import Authorization from '../../../../middlewares/authorization'
const fs = require('fs')


export const config = {
    api: {
        bodyParser: false
    }
};

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/artikel");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + "_" + file.originalname);
    }
});

let upload = multer({storage: storage});

export default async function handler(req, res) {
    if (req.method !== 'PUT') 
        return res.status(405).json({message: 'method not post'});
    
    const auth = await Authorization(req, res);

    const id = req.query.id

// =======================UPDATE NOT WITH IMAGE==========================================

    upload.single("image")(req, {}, err => {

        if (!req.file) {
            const {judul, deskripsi} = req.body
            
          return db.transaction(function (trx) {
                db('artikel')
                    .transacting(trx)
                    .where({id})
                    .update({judul, deskripsi})
                    .then(trx.commit)
                    .catch(trx.rollback);
            
            })
                .then(function (inserts) {
                    res.status(200);
                    res.json({type: 'success', message: 'article update with not image'})
                })
                .catch(function (error) {
                    res.status(405);
                    res.json({type: 'error', message: error.sqlMessage})
                });;
            
        }
        

// =======================UPDATE TANPA WITH IMAGE==========================================
          
            const image = req.file.filename
    
            const {imageBefore, judul, deskripsi} = req.body
            
            const path = 'public/img/artikel/' + imageBefore
    
            fs.unlink(path, (err) => {
                if (err) {
                    return res.json({type: 'error', message: err})
                }
        
            })
    
            db.transaction(function (trx) {
                db('artikel')
                    .transacting(trx)
                    .where({id})
                    .update({image, judul, deskripsi})
                    .then(trx.commit)
                    .catch(trx.rollback);
    
            })
                .then(function (inserts) {
                    res.status(200);
                    res.json({type: 'success', message: 'article update successfully'})
                })
                .catch(function (error) {
                    res.status(405);
                    res.json({type: 'error', message: error.sqlMessage})
                });;
         

      

        
    });




}
