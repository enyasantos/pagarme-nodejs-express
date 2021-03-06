const express = require('express');
require('dotenv/config');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const bodyParser = require("body-parser");

mongoose.connect(process.env.URL_MONGO_ATLAS , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

//postback - https://github.com/pagarme/pagarme-js/issues/170

app.listen(process.env.PORT, () => console.log(`Server is running in port ${process.env.PORT}`));