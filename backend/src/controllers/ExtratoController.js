const pagarme = require('pagarme')

const extratoView = require('../views/extrato_view');

module.exports = {
    async index(req, res) {
        const response = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client => client.balance.primary())
        .then(balance => balance)
        .catch(e => e.response)

        return res.status(200).json(extratoView.render(response));
    },
}