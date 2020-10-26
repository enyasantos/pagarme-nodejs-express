import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ImCart } from 'react-icons/im';
import { Wrapper , Header, Cards, Card } from './styles';

import Prod01 from '../../assets/products/p1.jpg';
import Prod02 from '../../assets/products/p2.jpg'
import Prod03 from '../../assets/products/p3.jpg'
import Prod04 from '../../assets/products/p4.jpg'
import Prod05 from '../../assets/products/p5.jpg'
import Prod06 from '../../assets/products/p6.jpg'

import {useCart} from '../../context/cart';

export default function Home() {

    const { add, cart } = useCart();

    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        const arrayP = [
            {
                id: 1,
                name: 'Skecthbook Modelo 01',
                description: `Esse sketchbook consitem em um o caderno de desenho com 90 
                            folhas de gramatura 110g, tamanho de 17 x 12 cm.`,
                price: 59.99,
                image: Prod01
            },
            {
                id: 2,
                name: 'Skecthbook Modelo 02',
                description: `Esse sketchbook consitem em um o caderno de desenho com 90 
                            folhas de gramatura 110g, tamanho de 17 x 12 cm.`,
                price: 49.99,
                image: Prod02
            },
            {
                id: 3,
                name: 'Skecthbook Modelo 03',
                description: `Esse sketchbook consitem em um o caderno de desenho com 90 
                            folhas de gramatura 110g, tamanho de 17 x 12 cm.`,
                price: 69.99,
                image: Prod03
            },
            {
                id: 4,
                name: 'Skecthbook Modelo 04',
                description: `Esse sketchbook consitem em um o caderno de desenho com 180 
                            folhas de gramatura 110g, tamanho de 17 x 12 cm.`,
                price: 109.99,
                image: Prod04
            },
            {
                id: 5,
                name: 'Skecthbook Modelo 05',
                description: `Esse sketchbook consitem em um o caderno de desenho com 100 
                            folhas de gramatura 110g, tamanho de 17 x 12 cm.`,
                price: 99.99,
                image: Prod05
            },
            {
                id: 6,
                name: 'Skecthbook Modelo 06',
                description: `Esse sketchbook consitem em um o caderno de desenho com 50 
                            folhas de gramatura 110g, tamanho de 17 x 12 cm.`,
                price: 39.99,
                image: Prod06
            },
        ];
        setProducts(arrayP);
    }, [])

    return (
       <>
       <Wrapper>
           <Header>
               <p href="/">Produtos</p>
               <Link to="/cart" className="cart">
                    <ImCart size={20} color="#393554"/>
                    <div><p>{cart.length}</p></div>
                </Link>
           </Header>
            
            <Cards>
                {products.map( product => (
                    <Card key={product.id}>
                        <img src={product.image} alt={product.name}/>
                        <p>{product.name}</p>
                        <p className="price">R$ {product.price}</p>
                        <button 
                                type="submit"
                                // onClick={ e => handleBuy(e, product)}
                                onClick={ e => add(product)}
                        >
                            Adicinar ao carrinho
                        </button>
                    </Card>
                ))}
            </Cards>
        </Wrapper>
       </>
    );
}