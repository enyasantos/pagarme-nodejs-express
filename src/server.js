const express = require('express');
const app = express();
const cors = require('cors');
const pagarme = require('pagarme');
require('dotenv/config');

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    const response = await pagarme.client
      .connect({ api_key: process.env.API_KEY_PAGARME })
      .then(client => {
        return client.transactions.all();
      })
      .then(transactions => {
        return transactions;
      })
      .catch(e => console.error(e.response));
  
    const itens = [];

    response.map(data => {
            const { object, status, amount, paid_amount, id, payment_method, customer } = data;
            itens.push({ object, status, amount, paid_amount, id, payment_method, customer });
    });

    res.json(itens);
});

app.post('/pagar', async (req, res) => {
    const response = await pagarme.client
    .connect({ api_key: process.env.API_KEY_PAGARME })
    .then(client => {
        return client.transactions.create({
            amount: 5000, //1000 = R$ 10,00
            payment_method: 'credit_card',
            card_number: '4111111111111111',
            card_holder_name: 'abc',
            card_expiration_date: '1225',
            card_cvv: '123',
            customer: {
                external_id: "#3311",
                name: "Morpheus Fishburne",
                type: "individual",
                country: "br",
                email: "mopheus@nabucodonozor.com",
                documents: [
                  {
                    type: "cpf",
                    number: "30621143049"
                  }
                ],
                phone_numbers: ["+5511999998888", "+5511888889999"],
                birthday: "1965-01-01"
            },
            billing: {
                name: "Trinity Moss",
                address: {
                    country: "br",
                    state: "sp",
                    city: "Cotia",
                    neighborhood: "Rio Cotia",
                    street: "Rua Matrix",
                    street_number: "9999",
                    zipcode: "06714360"
                }
            },
            items: [
                {
                  id: "r123",
                  title: "Red pill",
                  unit_price: 10000,
                  quantity: 1,
                  tangible: true
                },
                {
                  id: "b123",
                  title: "Blue pill",
                  unit_price: 10000,
                  quantity: 1,
                  tangible: true
                }
            ]
        })
    })
    .then(transaction => {
        return transaction;
    })
    .catch(e => console.error(e.response))

    return res.status(201).json(response);
});

app.listen(process.env.PORT, () => console.log(`Server is running in port ${process.env.PORT}`));