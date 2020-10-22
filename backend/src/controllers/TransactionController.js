const pagarme = require('pagarme');

const transactionsCard = require('./utils/transactionsCard');
const transactionsBoleto = require('./utils/transactionsBoleto');

const transactionBoletoView = require('../views/transaction_boleto_view');
const transactionCreditView = require('../views/transaction_credit_view');

const Transactions = require('../database/models/TransactionSchema');

module.exports = {

    async index(req, res) {
        try {
            const transactions = await Transactions.find();
            return res.status(200).json(transactions);
        } catch(err) {
            return res.status(500).json({ message: 'Erro buscar dados no sistema.'});
        }
    },

    async show(req, res) {
        const { id } = req.params;
  
        const response = await pagarme.client
            .connect({ api_key: process.env.API_KEY_PAGARME })
            .then(client => client.transactions.capture({ id: id}))
            .catch(err => err);

        if(response.errors){
            return res.status(response.status).send({
                error: response.errors[0].message,
                message: 'Erro ao tentar realizar encontrar transação.'
            });
        }

        return res.status(200).json(response);
    },

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

        const card_hash = await transactionsCard.generateCardHash(card);
    
        const response = await transactionsCard.paymentCard(card_hash, amount , customer, billing, items);
    
        if(response.errors){
            return res.status(response.status).send({
                error: response.errors[0].message,
                message: 'Erro ao tentar realizar o pagamento com cartão de crédito.'
            });
        }
        
        try {
            const itemsId = response.items.map(item => {
                return item.id
            });

            await Transactions.create({
                user_id: response.customer.external_id,
                transaction_id: response.id,
                amount: response.amount,
                payment_method: response.payment_method,
                status: response.status,
                items: itemsId,
            })
            return res.status(201).json(transactionCreditView.render(response));
        }catch{
            return res.status(500).json({ message: 'Erro ao salvar dados do pagamento no sistema.'})
        }
    },

    async paymentBoleto(req, res) {
        const {
            amount,
            items,
            customer,
            shipping,
        } = req.body;

        const date_for_expirations = 3;

        const response = await transactionsBoleto.paymentBoleto(amount, customer, shipping, items, date_for_expirations);

        if(response.errors){
            return res.status(response.status).send({
                errors: response.errors[0].message,
                message: 'Erro ao tentar realizar o pagamento com boleto.'
            });
        }

        try {

            const itemsId = response.items.map(item => {
                return item.id
            });

            await Transactions.create({
                user_id: response.customer.external_id,
                transaction_id: response.id,
                amount: response.amount,
                payment_method: response.payment_method,
                status: response.status,
                items: itemsId,
            });
            
            return res.status(201).json(transactionBoletoView.render(response));
        }catch (err){
            return res.status(500).json({ message: err})
        }
    }
}