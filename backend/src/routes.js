const { Router } = require('express');

const TransactionController = require('./controllers/TransactionController');
const PostbackController = require('./controllers/PostbackController');
const ExtratoController = require('./controllers/ExtratoController');
const BankController = require('./controllers/BankController');
const BankTransferController = require('./controllers/BankTransferController');
const ReceiverController = require('./controllers/ReceiverController');
const AnticipationsController = require('./controllers/AnticipationsController');

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

routes.get('/contas-bancarias', BankController.index);
routes.post('/contas-bancarias', BankController.create);

routes.get('/transferencias', BankTransferController.index);
routes.post('/transferencias', BankTransferController.create);

routes.get('/recebedores', ReceiverController.index);
routes.post('/recebedores', ReceiverController.create);

routes.get('/antecipacoes',AnticipationsController.index);
routes.post('/antecipacoes', AnticipationsController.create);
routes.get('/antecipacoes-limite',AnticipationsController.limit);
routes.post('/antecipacao-confirmar',AnticipationsController.confirm);

module.exports = routes;