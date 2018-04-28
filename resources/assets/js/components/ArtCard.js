import React, {Component} from "react";

const ArtCard = ({item, onAddToCart, onBuy})=>{
    const addToCart = (e)=>{
        e.preventDefault();
        onAddToCart(item.id);
    }

    const buy = (e)=>{
        e.preventDefault();
        onBuy(item.id);
    }

    return(
        <span className="art-card">
            <img src={"../items/"+item.id+".png"} alt="Ops! we gat an Issue"/>
            <div className="title">
                <h3>{item.name}</h3>
            </div>
            <div className="mask">
                <div className="flex-column inherit-dim">
                    <h3>
                        {item.name} 
                    </h3>  
                          
                    <p>{item.description}</p>
                    <p>${item.price}</p>
                    <div className="actions">
                        <button onClick={addToCart}>Add to Cart</button>
                        {/* <button onClick={buy}>Buy Now</button> */}
                    </div>
                </div>
            </div>
        </span>
    )
}

export default ArtCard;