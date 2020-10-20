const pagarme = require('pagarme');

const utils = require('./utils/transactions');

module.exports = {
    async paymentCredit(req, res) {
        const {
            amount,
            card_number,
            card_holder_name,
            card_expiration_date,
            card_cvv,
            customer,
            billing,
            items
        } = req.body;

        const card = {
            card_number,
            card_holder_name,
            card_expiration_date,
            card_cvv,
        }

        const card_hash = await utils.generateCardHash(card);
        const amountFormated = utils.priceFormated(amount);
        const itemsFormated = utils.formatedItems(items);
    
        const response = await utils.paymentCard(card_hash, amountFormated , customer, billing, itemsFormated);
    
        if(response.errors){
        return res.status(500).send({
            error: response.errors[0].message,
            message: 'Erro ao tentar realizar o pagamento.'
        });
        }
        
        return res.status(201).json({ ok: response.status});
        
    },

    async paymentBoleto(req, res) {
        
    }
}