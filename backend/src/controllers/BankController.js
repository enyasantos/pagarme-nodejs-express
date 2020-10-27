const pagarme = require('pagarme');

module.exports = {
    async create(req, res) {
        const {
            bank_code,
            agencia,
            agencia_dv,
            conta,
            conta_dv,
            type,
            legal_name,
            document_number,
        } = req.body;

        const response = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client => client.bankAccounts.create({
            bank_code,
            agencia,
            agencia_dv,
            conta,
            conta_dv,
            type, //conta_corrente, conta_poupanca, conta_corrente_conjunta, conta_poupanca_conjunta
            legal_name,
            document_number,
          }))
        .then(bankAccount => bankAccount)
        .catch(e => e.response)

        if(response.errors) {
            return res.status(400).json({ message: response.errors.message});
        }

        return res.status(200).json(response);
    },

    async index(req, res) {
        const response = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client => client.bankAccounts.all())
        .then(bankAccounts => bankAccounts)
        .catch(e => e.response)

        if(response.errors) {
            return res.status(400).json({ message: response.errors.message});
        }

        return res.status(200).json(response);
    },
}