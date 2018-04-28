import React, {Component} from 'react';
import {CartTable} from '../components';


const Cart =({data, total, onUpdateItemQuantity, onRemoveItem}) => {
    return(
        <div className="cart">
            <div className="panel">
                <div className="panel-head">
                    Cart:
                </div>
                <div className="panel-body">
                    <CartTable data={data} onUpdateItemQuantity={onUpdateItemQuantity} onRemoveItem={onRemoveItem}/>
                </div>
                <div className="panel-footer">
                    <span>Total:&nbsp;${total}</span>
                    <span><button className="pay">Pay</button></span>
                </div>
            </div>
        </div>
    )   
}   

export default Cart;