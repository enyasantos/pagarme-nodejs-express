function  dateFormatted(value) {
    const data = new Date(value)
    const date_formatted = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`;
    return date_formatted
}

module.exports = {
    render(transactions) {     
            const transactionsView = transactions.map(transaction => {
                return { 
                    tid: transaction.id,
                    status: transaction.status,
                    value: (transaction.amount / 100),
                    paid_value: (transaction.paid_amount / 100),
                    payment_method: transaction.payment_method,
                    uid: transaction.customer.id,
                    items: transaction.items.map(item => {
                        return { 
                            id: item.id, 
                            title: item.title 
                        }
                    }),
                    create_at: dateFormatted(transaction.date_created),
                    update_at: dateFormatted(transaction.date_updated),
                }
            })
        return transactionsView
    }   
};