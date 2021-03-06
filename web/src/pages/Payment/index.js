import React, { useState, useEffect } from 'react';
import { useHistory,useLocation } from 'react-router-dom';
import api from '../../service/api';
import Cards from 'react-credit-cards';
import {useCart} from '../../context/cart';
import 'react-credit-cards/es/styles-compiled.css';

import { Form, CrediCard } from './styles';

export default function Payment(props) {

    /*
        4111111111111111
        abc
        1225
        123
    */

    const history = useHistory();
    const location = useLocation();

    const { cart, totalValue, freteValue } = useCart();

    const [ customer, setCustomer ] = useState({});
    const [ billing, setBilling ] = useState({});
    const [ shipping, setShipping ] = useState({});

    const [ paymentMethod, setPaymentMethod ] = useState('');
    const [ amount, setAmount ] = useState(0);
    const [ focus, setFocus ] = useState('');
    const [ cvc, setCvc ] = useState(123);
    const [ expiry, setExpiry ] = useState(1225);
    const [ name, setName ] = useState('abc');
    const [ number, setNumber ] = useState(4111111111111111);

    function handlePayment(e) {
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
            amount,
            payment_method: paymentMethod,
            card_number: number,
            card_holder_name: name,
            card_expiration_date: expiry,
            card_cvv: cvc,
            customer,
            billing,
            shipping,
            items
        }
        console.log(data)
        api.post('/credit-card', data)
        .then(response => console.log(response.data))
        .catch(err => console.log(err.response.data.error, err.response.data.message))
    }

    function loadingDataUser() {
        const customer = location.state.customer;
        const shipping = location.state.shipping;
        const billing = location.state.billing;
        setCustomer(customer);
        setShipping(shipping);
        setBilling(billing);
    }

    useEffect(() => {
        loadingDataUser();
    }, [])

    useEffect(() => {
        const amount = parseFloat(totalValue) + parseFloat(freteValue);
        setAmount(amount);
        setPaymentMethod('credit_card');
    }, [totalValue, freteValue])
    
    return (
       <>
        <CrediCard id="PaymentForm">
            <Cards
                cvc={cvc}
                expiry={expiry}
                focused={focus}
                name={name}
                number={number}
            />
            <Form>
                <input
                    type="tel"
                    name="number"
                    placeholder="Número do cartão"
                    value={number}
                    onChange={e => setNumber(e.target.value)} 
                    onFocus={ e => setFocus(e.target.name)} 
                    maxLength="16" 
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Nome (Igual no cartão)"
                    value={name}
                    onChange={e => setName(e.target.value)}   
                    onFocus={ e => setFocus(e.target.name)} 
                    required
                />
                <input
                    type="tel"
                    name="expiry"
                    placeholder="Data de validade"
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)} 
                    onFocus={ e => setFocus(e.target.name)} 
                    maxLength="4"  
                    required
                />
                <input
                    type="tel"
                    name="cvc"
                    placeholder="CVV"
                    value={cvc}
                    onChange={e => setCvc(e.target.value)} 
                    onFocus={ e => setFocus(e.target.name)} 
                    maxLength="3"
                    required  
                />
                <button type="submit" onClick={e => handlePayment(e)}>{`Pagar (R$ ${amount})`}</button>
                <button type="submit" onClick={e => history.goBack()}>Voltar</button>
            </Form>
        </CrediCard>
       </>
    );
}