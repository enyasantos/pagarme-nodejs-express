import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Switch from "react-switch";
import { Wrapper, Form, Label, Input, SwitchReact, Buttons } from './styles';

export default function Info( ) {

    const history = useHistory();

    const [ switchState, setSwitchState ] = useState(false);
    const [ shipping, setShipping ] = useState({
        name: "Neo Reeves",
        fee: 500,
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
    });

    const [ billing, setBilling ] = useState({
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
    })

    function handleChangeSwitch(e) {
        setSwitchState(!switchState)
        if(!switchState === true) {
            const newShipping = shipping;
            delete newShipping.delivery_date;
            delete newShipping.fee;
            delete newShipping.expedited
            console.log(newShipping)
            setBilling(newShipping)
        } else {
            setBilling({
                name: "",
                address: {
                    country: "",
                    state: "",
                    city: "",
                    neighborhood: "",
                    street: "",
                    street_number: "",
                    zipcode: ""
                }
            })
        }
    }

    return (
       <>
            <Wrapper>
                <Form>
                    <p>Dados de envio</p>
                    <Label htmlFor="shipping-name">Nome</Label>
                    <Input type="text" id="shipping-name" onChange={e => setShipping({ name: e.target.value})} value={shipping.name}/>
                    <div className="form-group">
                        <div className="group-1">
                            <Label htmlFor="shipping-country">País</Label>
                            <Input type="text" id="shipping-country" onChange={e => setShipping({ address: { country: e.target.value }})} value={shipping.address.country}/>
                        </div>
                        <div className="group-2">
                            <Label htmlFor="shipping-state">Estado</Label>
                            <Input type="text" id="shipping-state" onChange={e => setShipping({ address: { state: e.target.value }})} value={shipping.address.state}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="group-1">
                            <Label htmlFor="shipping-city">Cidade</Label>
                            <Input type="text" id="shipping-city" onChange={e => setShipping({ address: { city: e.target.value }})} value={shipping.address.city}/>
                        </div>
                        <div className="group-1">
                            <Label htmlFor="shipping-street">Rua</Label>
                            <Input type="text" id="shipping-street" onChange={e => setShipping({ address: { street: e.target.value }})} value={shipping.address.street}/>
                        </div>
                        <div className="group-2">
                            <Label htmlFor="shipping-street_number">Número</Label>
                            <Input type="text" id="shipping-street_number" onChange={e => setShipping({ address: { street_number: e.target.value }})} value={shipping.address.street_number}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="group-1">
                            <Label htmlFor="shipping-zipcode">CEP</Label>
                            <Input type="text" id="zipcode" onChange={e => setShipping({ address: { zipcode: e.target.value }})} value={shipping.address.zipcode}/>
                        </div>
                        <div className="group-2">
                            <Label htmlFor="shipping-delivery_date">Data de entrega</Label>
                            <Input type="date" id="delivery_date" onChange={e => setShipping({ address: { delivery_date: e.target.value }})} value={shipping.address.delivery_date}/>
                        </div>
                    </div>
                </Form>

                <SwitchReact>
                    <span>Os dados de envio são os mesmos da cobrança</span>
                    <Switch 
                        onColor="#81E47E"
                        onHandleColor="#59B656"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="react-switch"
                        id="material-switch"
                        onChange={e => handleChangeSwitch()} 
                        checked={switchState} 
                    />
                </SwitchReact>

                <Form>
                    <p>Dados de cobrança</p>
                    <Label htmlFor="billing-name">Nome</Label>
                    <Input type="text" id="billing-name" onChange={e => setBilling({ name: e.target.value})} value={billing.name}/>
                    <div className="form-group">
                        <div className="group-1">
                            <Label htmlFor="billing-country">País</Label>
                            <Input type="text" id="billing-country" onChange={e => setBilling({ address: { country: e.target.value }})} value={billing.address.country}/>
                        </div>
                        <div className="group-2">
                            <Label htmlFor="billing-state">Estado</Label>
                            <Input type="text" id="billing-state" onChange={e => setBilling({ address: { state: e.target.value }})} value={billing.address.state}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="group-1">
                            <Label htmlFor="billing-city">Cidade</Label>
                            <Input type="text" id="billing-city" onChange={e => setBilling({ address: { city: e.target.value }})} value={billing.address.city}/>
                        </div>
                        <div className="group-2">
                            <Label htmlFor="billing-street">Rua</Label>
                            <Input type="text" id="billing-street" onChange={e => setBilling({ address: { street: e.target.value }})} value={billing.address.street}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="group-1">
                            <Label htmlFor="billing-street_number">Número</Label>
                            <Input type="text" id="billing-street_number" onChange={e => setBilling({ address: { street_number: e.target.value }})} value={billing.address.street_number}/>
                        </div>
                        <div className="group-2">
                            <Label htmlFor="billing-zipcode">CEP</Label>
                            <Input type="text" id="billing-zipcode" onChange={e => setBilling({ address: { zipcode: e.target.value }})} value={billing.address.zipcode}/>
                        </div>
                    </div>
                </Form>

                <Buttons>
                    <button className="go-back" onClick={history.goBack}>Voltar</button>
                    <button className="continue" onClick={e => {
                        history.push({
                            pathname: '/buy',
                            state: { shipping, billing }
                        })
                    }}>Continuar</button>
                </Buttons>
            </Wrapper>
       </>
    );
}