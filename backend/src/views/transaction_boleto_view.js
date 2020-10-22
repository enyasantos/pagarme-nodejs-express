module.exports = {
    render(transaction) {
        return {
            status: transaction.status,
            boleto_url: transaction.boleto_url,
            boleto_expiration_date: transaction.boleto_expiration_date,
        }
    }   
};