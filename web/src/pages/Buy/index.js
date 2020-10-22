import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../service/api';

import { Title, Product } from './styles';

export default function Buy( props ) {

    const history = useHistory();

    const [ product, setProduct ] = useState([]);
    const [ totalValue, setTotalValue ] = useState(0);

    const [ customer, setCustomer ] = useState({});
    const [ shipping, setShipping ] = useState({});

    function handlePaymentCard(e) {
        e.preventDefault();
        history.push({
            pathname: '/payment',
            state: { product, totalValue }
        })
    }

    function handlePaymentBoleto(e) {
        e.preventDefault();
        const items = product.map(p => {
            return (
                {
                    id: p.id,
                    title: p.name,
                    unit_price: p.price,
                    quantity: 1,
                    tangible: true
                }
            )
        })
        const data = {
            amount: totalValue,
            items,
            customer,
            shipping
        }
        console.log(data);
        api.post('/boleto', data)
        .then(response => console.log(response.data))
        .catch(err => console.log(err.response.data.error, err.response.data.message))
    }

    function loadingDataUser() {
        const customer =  {
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
        };
        
        const shipping = {
            name: "Neo Reeves",
            fee: 1000,
            delivery_date: "2000-12-21",
            expedited: true,
            address: {
                country: "br",
                state: "sp",
                city: "Cotia",
                neighborhood: "Rio Cotia",
                street: "Rua Matrix",
                street_number: "9999",
                zipcode: "06714360"
            }
        };
        setCustomer(customer);
        setShipping(shipping);
    }

    useEffect(() => {
        const { product } = props.location.state;
        setProduct([product]);
        const value = (product.price + 5)
        setTotalValue(value.toFixed(2));
        loadingDataUser();
    }, [props.location.state])
    
    return (
       <>
            {product.map(p => (
                <div key={p.id}>
                    <Title>
                        <p>Comprar {p.name}</p>
                    </Title>
                    <Product>
                        <h3>{p.name}</h3>
                        <img src={p.image} alt={p.name}/>
                        <p>{p.description}</p>
                        <p>Valor do produto: <strong>{p.price}</strong></p>
                        <p>Valor do frete: <strong>5.00</strong></p>
                        <p>Valor total: <strong>{totalValue}</strong></p> 
                        <button onClick={e => handlePaymentCard(e)}>Pagar com cartão de crédito</button>
                        <button onClick={e => handlePaymentBoleto(e)}>Pagar com boleto bancario</button>
                    </Product>
                </div>
            ))}
       </>
    );
}