import db from '../../../libs/db'
import snap from '../../../libs/snap'
// import authorization from '../../../middlewares/authorization'

export default async function handler(req, res) {
    if (req.method !== 'GET') 
        return res.status(405).json({message: 'method not get'});
    
    let parameter = {
        "transaction_details": {
            "order_id": "YOUR-ORDERID-1234569",
            "gross_amount": 20000
        },
        "credit_card": {
            "secure": true
        },
        "customer_details": {
            "first_name": "cecep",
            "last_name": "nandang",
            "email": "cecepns29@gmail.com",
            "phone": "08111222333"
        }
    };

    snap
        .createTransaction(parameter)
        .then((transaction) => {
            // transaction token
            let transactionToken = transaction.token;
            console.log('transactionToken:', transactionToken);
            console.log('url:', transaction);

            res.status(200);
            res.json({
                type: 'success', 
                message: 'anda akan di alihkan ke halaman pembayaran', 
                url:transaction.redirect_url})
        })

}
