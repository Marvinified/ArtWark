import React, {Component} from 'react';
import {CartTable} from '../components';


const Cart =({data, onUpdateItemQuantity, onRemoveItem, loading, error}) => {
    return(
        <div className="cart">
            <div className="panel">
                <div className="panel-head">
                    Cart:
                </div>
                <div className="panel-body">
                {
                    (!error)?
                        ((!loading)?
                            <CartTable data={data.items} onUpdateItemQuantity={onUpdateItemQuantity} onRemoveItem={onRemoveItem}/>:
                            <h3>Loading...</h3>):
                            <h3>Oops! {error} Occured</h3>
                }
                </div>
                {
                    (!loading && !error) &&
                    <div className="panel-footer">
                        <span>Total:&nbsp;${data.total}</span>
                        <span><button className="pay">Pay</button></span>
                    </div>
                }
            </div>
        </div>
    )   
}   

export default Cart;