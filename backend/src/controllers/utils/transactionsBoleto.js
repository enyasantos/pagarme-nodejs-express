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
            capture: true,
            amount: utils.priceFormated(amount),
            payment_method: 'boleto',
            boleto_expiration_date,
            postback_url: process.env.POSTBACK_URL,
            //postback_url: 'https://3d43dd53bb268f29218ca7477dcbdb24.m.pipedream.net',
            customer,
            shipping,
            items: utils.formatedItems(items),
        }))
        .then(transaction => transaction )
        .catch(e => e.response)

        return response;
    },

    /* Usado apenas em ambiente de teste para simular o pagamento de um boleto*/
    async payingBoleto(transaction_id) {
        const response = pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client => {
            client.transactions.find({ id: transaction_id })
            .then(transaction => {
                client.transactions.update({
                id: transaction.id,
                status: 'paid',
                })
            })
        })
        .catch(e => e.response)

        return response
    },

    async estorno(transaction_id, bank_account) {
        const response = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client => client.transactions.refund({
            id: transaction_id,
            bank_account
        }))
        .catch(e => e.response)
        return response
    }
}

module.exports = transactionsBoleto;