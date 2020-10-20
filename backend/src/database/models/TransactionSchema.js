
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true,
    },
    transaction_id: {
        type: String,
        required: true,
    },
    amount:{
        type: String,
        required: true,
    },
    payment_method:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    items: {
        type: [String],
        required: true,
    }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('transactions', TransactionSchema);