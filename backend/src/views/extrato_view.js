module.exports = {
    render(balance) {
        return {
            waiting_funds: (balance.waiting_funds.amount / 100),
            transferred: (balance.transferred.amount / 100),
            available: (balance.available.amount / 100),
        }
    }   
};