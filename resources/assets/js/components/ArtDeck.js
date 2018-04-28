import React, {Component} from "react";
import {ArtCard} from '../components'
import { Link } from "react-router-dom";

const ArtDeck = ({items, onAddItemToCart, onBuyItem, search, filter="all", onSetFilter, paginate, loadMore})=>{
    const onFilter = (e) => onSetFilter(e.target.value);
    
    const FilterNode =({search, filter})=>{
            if(search.status)
                return(
                    <div>
                        <div className="flex-box">
                            Search Results : {search.data} in &nbsp;<Link to={filter==='all'?'':filter}>{filter} </Link>
                        </div>
                        
                        <div className="flex-box filters">
                            <label>
                                <Link to="/">
                                    <input type="radio" name="category" value="all" checked={filter=="all"?true:false}/>
                                </Link>
                                All
                            </label>
                            <label>
                                <Link to="penciled">
                                    <input type="radio" name="category" value="penciled" checked={filter=="penciled"?true:false}/>
                                </Link>

                                Penciled
                            </label>
                            <label>
                                <Link to="abstract">
                                    <input type="radio" name="category" value="abstract" checked={filter=="abstract"?true:false}/>
                                </Link>
                                Abstract   
                            </label>
                            <label>
                                <Link to="computer">
                                    <input type="radio" name="category" value="computer"  checked={filter=="computer"?true:false}/>
                                </Link>
                                Computer
                            </label>
                            <label>
                                <Link to="painting">
                                    <input type="radio" name="category" value="painting"  checked={filter=="painting"?true:false}/>
                                </Link>
                                Painting
                            </label>
                            
                        </div>
                    </div>    
                )
            return null;

        }
    
    const LoadMoreButton = ({onLoadMore})=>{
        const button = React.createRef();
        
        const loadMore =  (e) => {
            console.log(button)
            button.current.innerText = 'Loading...';
            button.current.disabled = true;
            let promise = new Promise((resolve) =>{
                let response = onLoadMore(e)
                resolve(response)
            })
            promise.then(async (response)=>{
                console.log(await response) 
                button.current.innerText = 'Load More!';
                button.current.disabled = false;
            })
        }
        return(
            <button className="load"  onClick={loadMore} ref={button}>
                Load More!
            </button>
        )
    }

    return(
        <div className="flex-column">
            <FilterNode search={search} filter={filter} />            
            <div className="flex-box">
                {
                    items.map((item)=>
                        <ArtCard 
                        key={"key"+item.id} 
                        item={item} 
                        onAddToCart={onAddItemToCart} 
                        onBuy={onBuyItem} />
                    )
                }
            </div>
            {
                paginate.next < paginate.total && <LoadMoreButton onLoadMore={loadMore}/>
            }
        </div>
    )
}

export default ArtDeck;