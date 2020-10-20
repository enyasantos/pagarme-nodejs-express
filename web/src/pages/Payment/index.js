import React, { useState, useEffect } from 'react';
import api from '../../service/api';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useHistory } from 'react-router-dom';

import { About, Form, CrediCard } from './styles';

export default function Payment(props) {

    const history = useHistory();

    /*
        4111111111111111
        abc
        1225
        123
    */

    const [ items, setItems ] = useState([]);

    const [ customer, setCustomer ] = useState({});
    const [ billing, setBilling ] = useState({});

    const [ paymentMethod, setPaymentMethod ] = useState('');
    const [ amount, setAmount ] = useState(0);
    const [ cvc, setCvc ] = useState('');
    const [ expiry, setExpiry ] = useState('');
    const [ focus, setFocus ] = useState('');
    const [ name, setName ] = useState('');
    const [ number, setNumber ] = useState('');

    function handlePayment(e) {
        e.preventDefault();
        const data = {
            amount,
            payment_method: paymentMethod,
            card_number: number,
            card_holder_name: name,
            card_expiration_date: expiry,
            card_cvv: cvc,
            customer,
            billing,
            items
        }
        api.post('/credit-card', data)
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
        const billing = {
            name: "Trinity Moss",
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
        setBilling(billing);
    }

    useEffect(() => {
        const { product, totalValue } = props.location.state;
        setAmount(totalValue);
        setPaymentMethod('credit_card');
        const items = [ 
            {
                id: product.id,
                title: product.name,
                unit_price: product.price,
                quantity: 1,
                tangible: true
            }
        ];
        setItems(items);
        loadingDataUser();
    }, [])
    
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
                    onChange={e => setNumber(e.target.value)} 
                    onFocus={ e => setFocus(e.target.name)}  
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Nome (Igual no cartão)"
                    onChange={e => setName(e.target.value)}   
                    onFocus={ e => setFocus(e.target.name)} 
                    required
                />
                <input
                    type="tel"
                    name="expiry"
                    placeholder="Data de validade"
                    onChange={e => setExpiry(e.target.value)} 
                    onFocus={ e => setFocus(e.target.name)}   
                    required
                />
                <input
                    type="tel"
                    name="cvc"
                    placeholder="CVV"
                    onChange={e => setCvc(e.target.value)} 
                    onFocus={ e => setFocus(e.target.name)} 
                    required  
                />
                <button type="submit" onClick={e => handlePayment(e)}>{`Pagar (R$ ${amount})`}</button>
            </Form>
        </CrediCard>
       </>
    );
}


// export default class Payment extends React.Component {
//   state = {
//     cvc: '',
//     expiry: '',
//     focus: '',
//     name: '',
//     number: '',
//   };

//   handleInputFocus = (e) => {
//     this.setState({ focus: e.target.name });
//   }
  
//   handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     this.setState({ [name]: value });
//     console.log(this.state.name);
//   }

  
  
//   render() {
//     return (
//       <div id="PaymentForm">
//         <Cards
//           cvc={this.state.cvc}
//           expiry={this.state.expiry}
//           focused={this.state.focus}
//           name={this.state.name}
//           number={this.state.number}
//         />
//         <form>
//         	<input
//                 type="tel"
//                 name="number"
//                 placeholder="Card Number"
//                 onChange={this.handleInputChange}
//                 onFocus={this.handleInputFocus}
//             />
//             <input
//                 type="text"
//                 name="name"
//                 placeholder="Nome (Igual no cartão)"
//                 onChange={this.handleInputChange}
//                 onFocus={this.handleInputFocus}  
//             />
//             <input
//                 type="tel"
//                 name="expiry"
//                 placeholder="Nome (Igual no cartão)"
//                 onChange={this.handleInputChange}
//                 onFocus={this.handleInputFocus}   
//             />
//             <input
//                 type="tel"
//                 name="cvc"
//                 placeholder="CVV"
//                 onChange={this.handleInputChange}
//                 onFocus={this.handleInputFocus}  
//             />
//         </form>
//       </div>
//     );
//   }
// }