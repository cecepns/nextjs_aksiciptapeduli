import db from '../../../libs/db'
import multer from "multer";

export const config = {
    api: {
        bodyParser: false
    }
};

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/media");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + "_" + file.originalname);
    }
});

let upload = multer({storage: storage});

async function handler(req, res) {
    if (req.method !== 'POST') 
        return res.status(405).json({message: 'method not post'});
    
    upload.single("image")(req, {}, err => {
        console.log(req)
        // if (!req.file) 
        //     return res
        //         .status(405)
        //         .json({
        //             type: 'error',
        //             message: 'error ' + err
        //         })
        

        // const image = req.file.filename
        // const {title, content} = req.body
        // db('posts')
        //     .insert({image, title, content})
        //     .then(e => console.log('post done'));

        res.status(200);
        res.json({
            message: 'post create successfully',
            image : req.file.filename
        });
    });

 
}

export default handler