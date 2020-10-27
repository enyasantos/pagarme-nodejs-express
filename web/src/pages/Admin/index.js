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
        else if(status === 'processing')
            return '#0c6476'
        else
            return '#2c292d';
    }

    function handleDraft(e) {
        e.preventDefault();
        const today = Date();
        const data = {
            amount: balance.available,
            recipient_id: "re_ckg0c4mu107pi0g9tbvmijryl",
            metadata: {
                created_at: today
            }
        }

        api.post('/transferencias', data)
        .then(response => console.log(response.data))
        .catch(err => alert(err.response.data.message.errors[0].message))
    }

    function handleAnticipations(e) {
        e.preventDefault();
        api.get('antecipacoes-limite', 
        {params: {
            recipientId: "re_ckg0c4mu107pi0g9tbvmijryl",
            timeframe: "start"
        }})
        .then(response => {
            const { maximum, minimum } = response.data;
            if(maximum.amount === 0 && minimum.amount === 0)
                alert('Não há saldo disponivel para antecipar.');
            else {
                const data = {
                    recipientId: "re_ckg0c4mu107pi0g9tbvmijryl",
                    timeframe: 'start', // start, end
                    requested_amount: maximum.amount,
                }
                api.post('/antecipacoes', data)
                .then(response => console.log(response.data))
                .catch(err => alert(err.response.data.message.errors[0].message))
            }
        })
        .catch(err => alert(err.response.data.message.errors[0].message))
    }

    useEffect(() => {
        api.get('/extrato')
        .then(response => setBalance(response.data))
        .catch(err => console.log('error'))
        loadTransactions()
    }, [handleDraft])

    return (
       <Wrapper>
           <Header>
                <h2>Dashboard Payments</h2>
           </Header>
           <Cards>
               <div className="card">
                   <h3>Saldo atual</h3>
                    {balance.available
                    ?
                    <>
                        <p>R$ {balance.available.toFixed(2)}</p>
                        <button onClick={e => handleDraft(e)}>Sacar</button>
                    </>
                    :<span>Não há saldo atual.</span>
                    }
               </div>
               <div className="card">
                    <h3>A receber</h3>
                    {balance.waiting_funds
                    ?
                    <>
                        <p>R$ {balance.waiting_funds.toFixed(2)}</p>
                        <button onClick={e =>  handleAnticipations(e)}>Antecipar</button>
                    </>
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
                       {transactions.map((t, index )=> (
                           <tr key={index}>
                                <td>{t.tid}</td>
                                <td>{t.payment_method}</td>
                                <td>{t.uid}</td>
                                <td>R$ {t.value}</td>
                                <td>{t.items.map((item, index) =>{
                                    if(index !== (t.items.length - 1))
                                        return `${item.title}, `
                                    return `${item.title}`
                                })}</td>
                                <td style={{ color: setColorStatus(t.status)}}>
                                    {t.status}
                                </td>
                                <td>{t.create_at}</td>
                                <td>{t.update_at}</td>
                            </tr>
                       ))}
                   </tbody>
               </table>
           </Orders>
       </Wrapper>
    );
}