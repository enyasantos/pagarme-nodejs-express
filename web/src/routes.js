import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Buy from './pages/Buy';
import Payment from './pages/Payment';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import CartProvider from './context/cart';

export default function() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/buy" component={Buy}/>
                    <Route path="/payment" component={Payment}/>
                    <Route path="/cart" component={Cart} />
                    <Route path="/admin" component={Admin}/>
                </Switch>
            </BrowserRouter> 
       </CartProvider>
    );
}