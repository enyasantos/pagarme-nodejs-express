const express = require('express');
const app = express();
const cors = require('cors');
const qs = require('qs');
const pagarme = require('pagarme');
const connection = require('./database/connection');
require('dotenv/config');
const routes = require('./routes');

app.use(express.json());
app.use(cors());
app.use(routes);


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

app.get("/transactionOne/:id", async (req, res) => {
  
  const { id } = req.params;
  
  const response = await pagarme.client
    .connect({ api_key: process.env.API_KEY_PAGARME })
    .then(client => client.transactions.capture({ id: id}))
    .catch(e => console.error(e.response));

  res.status(200).json(response);
});

//https://github.com/pagarme/pagarme-js/issues/170
app.get('/postback', (req, res, next) => {
  const apiKey = `${process.env.API_KEY_PAGARME}`
  const verifyBody = qs.stringify(req.body)
  const signature = req.headers['x-hub-signature'].replace('sha1=', '')

  if (!pagarme
    .postback
    .verifySignature(apiKey, verifyBody, signature)
  ) {
    return res.json({error: 'Invalid Postback'})
  }

  return res.json({message: 'postback válido'})
})

app.post('/payment', async (req, res) => {
  const {
    amount,
    payment_method,
    card_number,
    card_holder_name,
    card_expiration_date,
    card_cvv,
    customer,
    billing,
    items
  } = req.body;

  const priceFormated = (amount) => {
    return parseInt(Math.ceil(amount * 100))
  }

  const formatedItems = (items) => {
    const newItens = items.map( item => {
      const i = {
        id: item.id.toString(),
        title: item.title,
        unit_price: priceFormated(item.unit_price),
        quantity: item.quantity,
        tangible: item.tangible
      }
      return i
    })
    return newItens;
  }

  const response = await pagarme.client
  .connect({ api_key: process.env.API_KEY_PAGARME })
  .then(client => {
      return client.transactions.create({
        amount: priceFormated(amount),
        payment_method,
        card_number,
        card_holder_name,
        card_expiration_date,
        card_cvv,
        //postback_url: '',
        customer,
        billing,
        items: formatedItems(items)
      })
  })
  .then(transaction => transaction )
  .catch(e => e.response)

  if(response.errors){
    return res.status(500).send({
      error: response.errors[0].message,
      message: 'Erro ao tentar realizar o pagamento.'
    });
  } 

  try {
    const user_id = response.customer.id;
    const transaction_id = response.id;
    const amount = response.amount;
    const payment_method = response.payment_method;
    const status = response.status;
    const items = response.items;

    await connection('transactions').insert({
      user_id,
      transaction_id,
      amount,
      payment_method,
      status,
      items,
    });

    return res.status(201).json({ ok: response.status});
    
  } catch {
    return res.status(500).send({
      message: 'Erro ao salvar no banco de dados.'
    });
  }

});

app.post('/validation', async (req, res) => {
  const {
    card_number,
    card_holder_name,
    card_expiration_date,
    card_cvv,
  } = req.body;

  const card = {
    card_number,
    card_holder_name,
    card_expiration_date,
    card_cvv,
  }

  var cardValidations = await pagarme.validate({card: card})
         
  console.log(cardValidations)

  if(!cardValidations.card.card_number)
    return res.status(400).send('Oops, número de cartão incorreto')

  return res.status(200).send()
})

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

app.get('/database', async (req, res) => {
  try {
    const transactions = await connection('transactions').select('*');
    
    return res.status(200).json(transactions);
  } catch {
    return res.status(500).send({
      message: 'Erro ao consultar banco de dados.'
    });
  }
});

app.listen(process.env.PORT, () => console.log(`Server is running in port ${process.env.PORT}`));