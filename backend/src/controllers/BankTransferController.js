const pagarme = require('pagarme');

module.exports = {
    async create(req, res) {
        const {
            amount,
            recipient_id,
            metadata
        } = req.body;

        const response = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client => client.transfers.create({
            amount,
            recipientId: recipient_id,
            metadata,
          }))
          .then(transfer => transfer)
          .catch(e => e.response)

        if(response.errors) {
            return res.status(response.status).json({ message: response });
        }

        return res.status(200).json(response);
    },

    async index(req, res) {
        const response = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client => client.transfers.all())
        .then(transfers => transfers)
        .catch(e => e.response)

        if(response.errors) {
            return res.status(400).json({ message: response.errors.message});
        }

        return res.status(200).json(response);
    },
}