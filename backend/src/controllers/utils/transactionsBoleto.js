const pagarme = require('pagarme');

const utils = require('./utils');

/*
    billing => dados de cobrança
    shipping => dados de envio
*/

const transactionsBoleto = {
    async paymentBoleto(amount, customer, shipping, items, date_for_expirations) {
        const today = Date();
        const time = new Date(today);
        const newDate = new Date();
        newDate.setDate(time.getDate() + date_for_expirations);
        const boleto_expiration_date = `
        ${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}
        `;
        
        const response = await pagarme.client
        .connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client => client.transactions.create({
          amount: utils.priceFormated(amount),
          payment_method: 'boleto',
          boleto_expiration_date,
          //postback_url: 'http://requestb.in/pkt7pgpk',
          capture: true,
          customer,
          shipping,
          items: utils.formatedItems(items),
        }))
        .then(transaction => transaction )
        .catch(e => e.response)

        return response;
    },
}

module.exports = transactionsBoleto;