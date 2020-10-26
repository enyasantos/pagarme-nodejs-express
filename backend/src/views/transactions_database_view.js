function  dateFormatted(value) {
    const data = new Date(value)
    const date_formatted = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`;
    return date_formatted
}

module.exports = {
    render(transactions) {     
            const transactionsView = transactions.map(transaction => {
                return { 
                    tid: transaction.transaction,
                    status: transaction.status,
                    value: (transaction.value / 100).toFixed(2),
                    paid_value: (transaction.paid_value/ 100).toFixed(2),
                    payment_method: transaction.payment_method,
                    uid: transaction.user,
                    items: transaction.products.map(product => {
                        return { 
                            id: product.id, 
                            title: product.title 
                        }
                    }),
                    create_at: dateFormatted(transaction.created_at),
                    update_at: dateFormatted(transaction.updated_at),
                }
            })
        return transactionsView
    }   
};