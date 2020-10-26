import React from 'react';
import { Link } from 'react-router-dom';

import {useCart} from '../../context/cart';

import { Wrapper, CartTable, EmptyCart, Button, Buttons } from './styles';

export default function Cart( ) {

    const { cart, remove, totalValue, freteValue } = useCart();

    return (
       <>
            <Wrapper>
                <h2>Carrinho</h2>
                {cart.length
                ?
                    <CartTable>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Preço</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <td colSpan="2">Subtotal</td>
                                <td>R$ {totalValue}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Frete</td>
                                <td>R$ {parseFloat(freteValue).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Total</td>
                                <td>R$ {parseFloat(totalValue) + parseFloat(freteValue)}</td>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                            cart.map((item, index) => (
                                <tr key={index}>
                                    <td className="product">
                                        <img src={item.image} alt={item.name}/>
                                        <div>
                                            <p>{item.name}</p>
                                            <button onClick={e => remove(index)}>Remover</button>
                                        </div>
                                    </td>
                                    <td>R$ {item.price}</td>
                                    <td>R$ {item.price}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </CartTable>
                :
                    <EmptyCart>
                        <h4>Seu Carrinho</h4>
                        <p>Seu carrinho está vazio no momento. :(</p> 
                        <Link to="/">Voltar à loja</Link>
                    </EmptyCart>
                }
                {cart.length &&
                    <Buttons>
                        <Button className="to-home">
                            <Link to="/">Voltar à loja</Link>
                        </Button>
                        <Button className="buy">
                            <Link to="/buy">Finalizar compra</Link>
                        </Button>
                    </Buttons>
                }
            </Wrapper>
       </>
    );
}