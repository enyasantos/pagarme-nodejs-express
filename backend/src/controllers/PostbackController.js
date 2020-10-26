const pagarme = require('pagarme');
const qs = require('qs');

const TransactionSchema = require('../database/models/TransactionSchema');

module.exports = {

    //Sem validação 
    async postback(req, res) {
        try {
            const { body }= req;
    
            const {
                current_status,
                transaction: { 
                    id,
                    paid_amount
                },
            } = body;
    
            await TransactionSchema.findOneAndUpdate(
                {transaction: id  },
                {
                    paid_value: paid_amount,
                    status: current_status,
                },
                { useFindAndModify: false }
            )
    
            res.status(200).send('Thanks for letting me know! :)').end() ;
        } catch (err) {
            res.status(400).send(':(').end() ;
        }
    },

    //Com validação 
    async validatePostback(req, res, next) {
        const apiKey = process.env.API_KEY_PAGARME;
        const verifyBody = qs.stringify(req.body)
        const signature = req.headers['x-hub-signature'].replace('sha1=', '')

        if (!pagarme
            .postback
            .verifySignature(apiKey, verifyBody, signature)
        ) {
            return res.status(400).json({error: 'Invalid Postback'})
        }

        try {
            const { body }= req;
    
            const {
                current_status,
                transaction: { 
                    id,
                    paid_amount
                },
            } = body;
    
            await TransactionSchema.findOneAndUpdate(
                {transaction: id  },
                {
                    paid_value: paid_amount,
                    status: current_status,
                },
                { useFindAndModify: false }
            )
    
            res.status(200).send('Thanks for letting me know! :)').end() ;
        } catch (err) {
            res.status(400).send(':(').end() ;
        }  
    }

}