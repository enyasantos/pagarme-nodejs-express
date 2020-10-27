const pagarme = require('pagarme');

module.exports = {
    async create(req, res) {

        const today = Date();
        const payment_date = new Date(today)

        const {
            recipientId,
            timeframe, // start, end
            requested_amount,
        } = req.body;

        const response = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client =>  client.bulkAnticipations.create({
            recipientId,
            payment_date,
            timeframe,
            requested_amount,
        }))
        .then(bulkAnticipation => bulkAnticipation)
        .catch(e => e.response)

        if(response.errors) {
            return res.status(response.status).json({ message: response });
        }

        return res.status(200).json(response);
    },

    async index(req, res) {
        const params = { "count": 100}

        const {
            recipientId
        } = req.body;

        const response = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client =>  client.bulkAnticipations.find({
            recipientId,
            params
        }))
        .catch(e => e.response)

        if(response.errors) {
            return res.status(400).json({ message: response });
        }

        return res.status(200).json(response);
    },

    async limit(req, res) {

        const today = Date();
        const payment_date = new Date(today).getTime()

        // const {
        //     recipientId,
        //     timeframe,
        // } = req.body;

        const {
            recipientId,
            timeframe,
        } = req.query;

        const response = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client =>  client.bulkAnticipations.limits({
            recipientId,
            payment_date,
            timeframe,
          } ))
        .catch(e => e.response)

        if(response.errors) {
            return res.status(400).json({ message: response });
        }

        return res.status(200).json(response);
    },

    async confirm(req, res) {

        const {
            recipientId,
            id,
        } = req.body;


        const response = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client =>  client.bulkAnticipations.confirm({
            recipientId,
            id, //ID da antecipação desejada
        }))
        .catch(e => e.response)

        if(response.errors) {
            return res.status(400).json({ message: response });
        }

        return res.status(200).json(response);
    }
}