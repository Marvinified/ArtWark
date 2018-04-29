import React,  { Component } from "react";

const Tr = ({row, onUpdateQuantity, onRemove})=>{
    const remove = (e)=>{
        onRemove(row.id, row.quantity)   
    }

    const change = (e)=>{
        const quantity = e.target.value?(e.target.value>0?parseInt(e.target.value):1):null;
        onUpdateQuantity(row.id, quantity, row.quantity)

    }
    return(
        <tr>
            {/* <td id="id">{row.id}</td> */}
            <td id="info">
                <h3>{row.name}</h3>
                <div >{  row.description}</div>
                <div><a href="#" onClick={remove} >remove</a> </div>
            </td>
            <td id="quantity">
                <input type="number" value={row.quantity} onChange={change}/>
            </td>
            <td>
                ${row.total}                
            </td>
            
        </tr>
    )
}

const CartTable = ({data, onUpdateItemQuantity, onRemoveItem})=>{

    return (
        <table>
            <thead>
                <tr>
                    {/* <th id="id">ID</th> */}
                    <th id="info">Item</th>
                    <th id="quantity">Quantity</th>
                    <th>Amount</th>
                    {/* <th>Price</th>
                    <th>Action</th> */}
                </tr>    
            </thead>
            <tbody>
                { 
                    data.map(row=><  Tr key={`key${row.id}`} row={row} onUpdateQuantity={onUpdateItemQuantity} onRemove={onRemoveItem} />)
                }
            </tbody>
        </table>
    )
}
export default CartTable;