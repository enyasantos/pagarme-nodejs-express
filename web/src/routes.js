import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Buy from './pages/Buy';
import Payment from './pages/Payment';

export default function() {
    return (
       <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/buy" component={Buy}/>
            <Route path="/payment" component={Payment}/>
        </Switch>
       </BrowserRouter> 
    );
}