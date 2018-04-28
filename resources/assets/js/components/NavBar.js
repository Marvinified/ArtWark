import React, { Component } from 'react';
import {SearchBar} from '../components';
import {Link} from 'react-router-dom';

const NavBar =({cart={count:0,catalog:{}}, onSearch, onCancelSearch, search, onGetCart})=>{
        const getCart = ()=>{
            onGetCart(cart.catalog)
        }
        return(
            <nav>
                <div className="mobile-nav">
                    <div className="menu"><img src="../images/menu.png" alt=""/></div>
                    <ul>
                        <Link to="/"><li>All</li></Link>
                        <Link to="/penciled"><li>Penciled Designs</li></Link>
                        <Link to="/painting"><li>Paintings</li></Link>
                        <Link to="/abstract"><li>Abstract Design</li></Link>
                        <Link to="/computer"><li>Computer Art</li></Link>
                    </ul>
                </div>
                <div> 
                    <Link to="/">
                        <img className="brand" src="../images/logo.png" alt="Logo"/>
                    </Link>  
                </div>
                <ul>
                    <li><Link to="/">All</Link></li>
                    <li><Link to="/penciled">Penciled Designs</Link></li>
                    <li><Link to="/painting">Paintings</Link></li>
                    <li><Link to="/abstract">Abstract Design</Link></li>
                    <li><Link to="/computer">Computer Art</Link></li>
                </ul>
                <span>
                    <SearchBar onSubmit={onSearch} onCancel={onCancelSearch} search={search}/>
                    <div className="cart-count">
                        <Link to="/cart" onClick={getCart}>
                            <img src="../images/cart.png" alt="" />
                            <span>{cart.count}</span>
                        </Link>   
                    </div>
                </span>
                

            </nav>              
        )
}

export default NavBar;
//  NavBar