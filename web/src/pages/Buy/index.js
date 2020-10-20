import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Title, Product } from './styles';

export default function Buy( props ) {

    const history = useHistory();

    const [ product, setProduct ] = useState([]);
    const [ totalValue, setTotalValue ] = useState(0);

    function handlePayment(e, product) {
        e.preventDefault();
        history.push({
            pathname: '/payment',
            state: { product, totalValue }
        })
    }

    useEffect(() => {
        const { product } = props.location.state;
        setProduct(product);
        const value = (product.price + 5)
        setTotalValue(value.toFixed(2))
    }, [])
    
    return (
       <>
           <Title>
               <p>Comprar {product.name}</p>
           </Title>
           <Product>
                    <h3>{product.name}</h3>
                    <img src={product.image} alt={product.name}/>
                    <p>{product.description}</p>
                    <p>Valor do produto: <strong>{product.price}</strong></p>
                    <p>Valor do frete: <strong>5.00</strong></p>
                    <p>Valor total: <strong>{totalValue}</strong></p> 
                    <button onClick={e => handlePayment(e, product)}>Finalizar compra</button>
           </Product>
       </>
    );
}