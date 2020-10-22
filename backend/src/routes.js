const { Router } = require('express');

const TransactionController = require('./controllers/TransactionController');

const routes = Router();

routes.get('/transactions', TransactionController.index);
routes.get('/transactions/:id' , TransactionController.show);
routes.post('/credit-card', TransactionController.paymentCredit);
routes.post('/boleto', TransactionController.paymentBoleto);
// routes.post('/postback');

module.exports = routes;