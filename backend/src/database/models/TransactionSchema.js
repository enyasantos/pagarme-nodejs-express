
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
    },
    transaction: {
        type: Number,
        required: true,
    },
    payment_method:{
        type: String,
        required: true,
    },
    value:{
        type: Number,
        required: true,
    },
    paid_value: {
        type: Number,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    products: {
        type: [Object],
        required: true,
    }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('transactions', TransactionSchema);