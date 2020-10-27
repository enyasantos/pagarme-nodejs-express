import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../service/api';
import {useCart} from '../../context/cart';

import { Title, MethodPayment } from './styles';

export default function Buy(props) {

    const history = useHistory();

    const { cart, totalValue, freteValue } = useCart();

    const [ customer, setCustomer ] = useState({});
    const [ billing, setBilling ] = useState({});
    const [ shipping, setShipping ] = useState({});

    function handlePaymentBoleto(e) {
        e.preventDefault();
        const items = cart.map(p => {
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
            shipping,
            billing,
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
        
        const shipping = props.location.state.shipping;
        const billing = props.location.state.billing;
        setCustomer(customer);
        setShipping(shipping);
        setBilling(billing);
    }

    useEffect(() => {
        loadingDataUser();
    }, [])
    
    return (
       <>
        <Title>
            <p>Pagamento</p>
        </Title>
        <MethodPayment>
            <Link 
                to={{
                    pathname: '/payment',
                    state: {shipping, billing, customer}
                }}
            >
                Pagar com cartão de crédito R$ ({parseFloat(totalValue) + parseFloat(freteValue)})
            </Link>
            <button onClick={e => handlePaymentBoleto(e)}>Pagar com boleto bancario (R$ {parseFloat(totalValue) + parseFloat(freteValue)})</button>
            <button onClick={e => history.goBack()}>Voltar</button>
        </MethodPayment>
       </>
    );
}