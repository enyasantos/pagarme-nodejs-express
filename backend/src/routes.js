const { Router } = require('express');
const pagarme = require('pagarme');
const TransactionController = require('./controllers/TransactionController');
const PostbackController = require('./controllers/PostbackController');
const ExtratoController = require('./controllers/ExtratoController');

const routes = Router();

routes.get('/transactions-db', TransactionController.indexDB);

routes.get('/transactions', TransactionController.index);
routes.get('/transactions/:id' , TransactionController.show);
routes.post('/credit-card', TransactionController.paymentCredit);
routes.post('/boleto', TransactionController.paymentBoleto);
routes.put('/pagar-boleto/:transaction_id', TransactionController.payingBoleto);
routes.get('/calcular-pagamentos-parcelados', TransactionController.paymentInstallments);
routes.get('/eventos-transacao/:transaction_id', TransactionController.allTransactionsEvents);
routes.get('/estornos', TransactionController.estornos);
routes.post('/estorno-credit/:transaction_id', TransactionController.estornoCredit);
routes.post('/estorno-boleto/:transaction_id', TransactionController.estornoBoleto);
routes.post('/postback', PostbackController.validatePostback);
routes.get('/extrato', ExtratoController.index);

module.exports = routes;