import React, { useState, useEffect } from 'react';
import api from '../../service/api';

import { Wrapper, Header, Cards, Orders } from './styles';

export default function Admin() {

    const [balance, setBalance] = useState({});
    const [transactions, setTransactions] = useState([]);

    function loadTransactions() {
        api.get('/transactions-db')
        .then(response => setTransactions([...response.data]))
        .catch(err => console.log('error'))
    }

    function setColorStatus(status) {
        if(status === 'paid')
            return 'mediumseagreen'
        else if(status === 'waiting_payment')
            return 'darkorange'
        else if(status === 'refused' || status === 'refunded')
            return 'crimson'
        else
            return '#2c292d';
    }

    useEffect(() => {
        api.get('/extrato')
        .then(response => setBalance(response.data))
        .catch(err => console.log('error'))
        loadTransactions()
    }, [])

    return (
       <Wrapper>
           <Header>
                <h2>Dashboard Payments</h2>
           </Header>
           <Cards>
               <div className="card">
                   <h3>Saldo atual</h3>
                    {balance.available
                    ?<p>R$ {balance.available.toFixed(2)}</p>
                    :<span>Não há saldo atual.</span>
                    }
               </div>
               <div className="card">
                    <h3>A receber</h3>
                    {balance.waiting_funds
                    ?<p>R$ {balance.waiting_funds.toFixed(2)}</p>
                    :<span>Não há valor para receber.</span>
                    }
               </div>
               <div className="card">
                   <h3>Total já recebido</h3>
                   {balance.transferred
                    ? <p>R$ {balance.transferred.toFixed(2)}</p>
                    : <span>Não há valor rebebido.</span>
                   }                  
               </div>
           </Cards>
           <Orders>
               <table>
                   <thead>
                       <tr>
                        <th>Transação</th>
                        <th>Método de pagamento</th>
                        <th>Usuário</th>
                        <th>Valor</th>
                        <th>Produto(s)</th>
                        <th>Status</th>
                        <th>Criação</th>
                        <th>Atualização</th>
                       </tr>
                   </thead>
                   <tbody>
                       {transactions.map(t => (
                           <tr key={t._id}>
                                <td>{t.transaction}</td>
                                <td>{t.payment_method}</td>
                                <td>{t.user}</td>
                                <td>R$ {t.value}</td>
                                <td>{t.products.map((item, index) =>{
                                    if(index !== (t.products.length - 1))
                                        return `${item.title}, `
                                    return `${item.title}`

                                })}</td>
                                <td style={{ color: setColorStatus(t.status)}}>
                                    {t.status}
                                </td>
                                <td>{t.created_at}</td>
                                <td>{t.updated_at}</td>
                            </tr>
                       ))}
                   </tbody>
               </table>
           </Orders>
       </Wrapper>
    );
}