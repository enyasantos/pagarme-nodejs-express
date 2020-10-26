const pagarme = require('pagarme');
const qs = require('qs');
const transactionsCard = require('./utils/transactionsCard');
const transactionsBoleto = require('./utils/transactionsBoleto');

const transactionBoletoView = require('../views/transaction_boleto_view');
const transactionCreditView = require('../views/transaction_credit_view');

const transactionsView = require('../views/transactions_view');

const transactionsDatabaseView = require('../views/transactions_database_view');

const Transactions = require('../database/models/TransactionSchema');

module.exports = {

    async index(req, res) {
        try {
            const params = {"count": 100}
            const response = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
            .then(client => client.transactions.all(params))
            .then(transactions => transactions)
            .catch(e => e.response);
            return res.status(200).json(transactionsView.render(response));
        } catch(err) {
            return res.status(500).json({ message: 'Erro buscar dados no sistema.'});
        }
    },

    async indexDB(req, res) {
        try {
            const transations = await Transactions.find()
            .sort({created_at: -1});
            return res.status(200).json(transactionsDatabaseView.render(transations));
        }catch{
            return res.status(500).json({ message: 'Erro ao carregar dados do sistema.'})
        }
    },

    async show(req, res) {
        const { id } = req.params;
  
        const response = await pagarme.client
            .connect({ api_key: process.env.API_KEY_PAGARME })
            .then(client => client.transactions.capture({ id: id}))
            .catch(err => err.response);

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
            const productsInfo = response.items.map(item => {
                return {
                    id: item.id, 
                    title: item.title
                }
            });

            await Transactions.create({
                user: response.customer.external_id,
                transaction: response.id,
                payment_method: response.payment_method,
                value: response.amount,
                paid_value: response.paid_amount,
                status: response.status,
                products: productsInfo,
            });

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
            const productsInfo = response.items.map(item => {
                return {
                    id: item.id, 
                    title: item.title
                }
            });

            await Transactions.create({
                user: response.customer.external_id,
                transaction: response.id,
                payment_method: response.payment_method,
                value: response.amount,
                paid_value: response.paid_amount,
                status: response.status,
                products: productsInfo,
            });

            return res.status(201).json(transactionBoletoView.render(response));
        }catch{
            return res.status(500).json({ message: 'Erro ao salvar dados do pagamento no sistema.'})
        }
    },

    async payingBoleto(req, res) {
        try {
            const { transaction_id } = req.params;
            const response = await transactionsBoleto.payingBoleto(transaction_id);
            return res.status(200).json(response);
        } catch {
            return res.status(500).json({ message: 'Erro'});
        }
    },

    async paymentInstallments(req, res) {
        try {
            const {
                amount,
                free_installments,
                max_installments,
                interest_rate,
            } = req.body;

            const response = await transactionsCard.paymentInstallments(amount, free_installments, max_installments,interest_rate);

            return res.status(200).json(response);
            
        } catch {
            return res.status(500).json({ message: 'Erro'});
        }
    },

    async allTransactionsEvents(req, res) {
        try {
            const { transaction_id } = req.params;
            const response = await transactionsCard.allTransactionsEvents(transaction_id);
            return res.status(200).json(response);
        } catch {
            return res.status(500).json({ message: 'Erro'});
        }
    },

    async estornoCredit(req, res) {
        try {
            const { transaction_id } = req.params;
            const response = await transactionsCard.estorno(transaction_id);
            return res.status(200).json(response);
        } catch {
            return res.status(500).json({ message: 'Erro'});
        }
    },

    async estornoBoleto(req, res) {
        try {
            const { transaction_id } = req.params;
            const { bank_account } = req.body;
            const response = await transactionsBoleto.estorno(transaction_id, bank_account);
            return res.status(response.status).json(response);
        } catch {
            return res.status(500).json({ message: 'Erro'});
        }
    },

    async estornos(req, res) {
        const response = await pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME })
        .then(client => client.transactions.refunds())
        .catch(error => error)
        console.log(response)
        return res.status(200).json(response);
    },

    /* Postback */
    async validatePostback (req, res, next) {
        const apiKey = process.env.API_KEY_PAGARME ;
        const verifyBody = qs.stringify(req.body);
        const signature = req.headers['x-hub-signature'].replace('sha1=', '');
      
        if (!pagarme
          .postback
          .verifySignature(apiKey, verifyBody, signature)
        ) {
          return res.status(400).json({error: 'Invalid Postback'})
        }
      
        return res.status(200).json({message: 'postback válido'})
    },

    async postbackList(req, res) {
        const { transaction_id } = req.params;
        const response = pagarme.client.connect({ api_key: process.env.API_KEY_PAGARME  })
        .then(client => client.postbacks.find({ transactionId: transaction_id }))
        return res.status(200).json(response)
    }
}