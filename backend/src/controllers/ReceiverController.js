const pagarme = require('pagarme');

module.exports = {
    async create(req, res) {
        const {
            bank_account_id,
        } = req.body;

        const response = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client => client.recipients.create({
            bank_account_id,
            transfer_interval, //daily, weekly, monthly
            //transfer_day: 5,
            transfer_enabled: true,
            postback_url: process.env.POSTBACK_URL,
          }))
        .then(recipient => recipient)
        .catch(e => e.response)

        if(response.errors) {
            return res.status(400).json({ message: response.errors.message});
        }

        return res.status(200).json(response);
    },

    async index(req, res) {
        const params = { count: "100"}
        const response = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client => client.recipients.all(params))
        .then(recipients => recipients)
        .catch(e => e.response)

        if(response.errors) {
            return res.status(400).json({ message: response.errors.message});
        }

        return res.status(200).json(response);
    },
}