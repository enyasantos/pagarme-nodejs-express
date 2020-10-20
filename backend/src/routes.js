const { Router } = require('express');

const TransactionController = require('./controllers/TransactionController');

const routes = Router();

routes.post('/credit-card', TransactionController.paymentCredit);
routes.post('/boleto');
routes.post('/postback');
routes.get('/');

module.exports = routes;