const utils = {
    formatedItems(items) {
        const newItens = items.map( item => {
          const i = {
            id: item.id.toString(),
            title: item.title,
            unit_price: parseInt(Math.ceil(item.unit_price * 100)),
            quantity: item.quantity,
            tangible: item.tangible
          }
          return i
        })
        return newItens;
    },

    priceFormated(amount) {
        return parseInt(Math.ceil(amount * 100))
    },
}

module.exports = utils;