const pagarme = require('pagarme');

/*
    billing => dados de cobrança
    shipping => dados de envio
*/

const transactions = {
    async paymentCard(card_hash, amount, customer, billing, items) {
        const response = await pagarme.client
        .connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client => {
            return client.transactions.create({
            amount,
            payment_method: 'credit_card',
            card_hash,
            //postback_url: '',
            customer,
            billing,
            items,
            })
        })
        .then(transaction => transaction )
        .catch(e => e.response)

        return response;
    },

    async cardValidation(card) {
        const cardValidations = await pagarme.validate({card: card})

        if(!cardValidations.card.card_number || 
            !cardValidations.card.card_cvv ||
            !cardValidations.card.card_expiration_date ||
            !cardValidations.card.card_holder_name)
            return res.status(400).json({ message: 'Dados do cartão inválidos.'})

        return res.status(200).json({ message: 'ok'})
    },

    async generateCardHash(cardInformations) {
        const card_hash = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client => {
            return client.security.encrypt({
            card_number: cardInformations.card_number,
            card_holder_name: cardInformations.card_holder_name,
            card_expiration_date: cardInformations.card_expiration_date,
            card_cvv: cardInformations.card_cvv,
            });
        })
        .then(card_hash => card_hash)
        return card_hash 
    },

    formatedItems(items) {
        const newItens = items.map( item => {
          const i = {
            id: item.id.toString(),
            title: item.title,
            unit_price: parseInt(Math.ceil(item.unit_price * 100)),
            quantity: item.quantity,
            tangible: item.tangible
          }
          return i
        })
        return newItens;
    },

    priceFormated(amount) {
        return parseInt(Math.ceil(amount * 100))
    },
}

module.exports = transactions;