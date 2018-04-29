import React, {Component} from "react";
import {NavBar, ArtDeck, SearchBar, MobileSearchBar, Banner, Cart, CartTable, Footer} from '../components';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import axios from 'axios';


class ArtWark extends Component{

    constructor(props){
        const cart = JSON.parse(sessionStorage.getItem('cart'));
        super(props);
        this.state = {
            cart:cart?cart:{
                count:0,
                items:[],
                catalog:[],
                amount:0
            },
            items:[],
            filter:"all",
            search:{
                status:false,
                data:""
            },
            paginate:{
                next:1,
                total:1
            },
            loading:{
                cart:false,
                deck:false
            },
            error:{
                cart:false,
                deck:false,
            }
            

        }
        
        this.search = this.search.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.cancelSearch = this.cancelSearch.bind(this);
        
        this.getCartItems = this.getCartItems.bind(this)
        this.addToCart = this.addToCart.bind(this);
        this.updateCartItemQuantity = this.updateCartItemQuantity.bind(this)
        this.removeCartItem =this.removeCartItem.bind(this)

        this.filterItems = this.filterItems.bind(this);
        this.setFilter = this.setFilter.bind(this);
        
        this.loadMore = this.loadMore.bind(this);
        
    }

    componentDidMount(){        
        this.requestItems();
    }

    async requestItems(page=1, old = false){
        let response = null;
        if(old)
            response = axios.get(`/api/product?page=${page}`).then((response)=>{
                const items = response.data.data;            
                const totalPages = response.data.last_page;
                const state = Object.assign({}, ...this.state, {
                    items:[...this.state.items,...items],
                    paginate:{
                        next:page+1,
                        total:totalPages
                    }
                })
                this.setState(state);
            });
        else
            response = axios.get(`/api/product?page=${page}`).then((response)=>{
                const items = response.data.data;            
                const totalPages = response.data.last_page;
                const state = Object.assign({}, ...this.state, {
                    items:[...items],
                    paginate:{
                        next:page+1,
                        total:totalPages
                    }
                })
                this.setState(state);
            });
        return await response;
    }

    async loadMore(){
        let response = null;
        if(this.state.search.status)
            response = this.search(this.state.search.data, this.state.paginate.next, true)
        else
            response = this.requestItems(this.state.paginate.next, true);

        // console.log(`response${response}`)
        return await response;
        
    }

    // Search Methods
    setSearch(status, data){
        this.setState({search:{
            status, 
            data
        }})
    }

    async search(search, page = 1, old = false ){ 
        let response = null;
            if(this.state.search.status && old){
                response = axios.get(`/api/product/search/${search}?page=${page}`).then((response)=>{
                    const items = response.data.data;            
                    const totalPages = response.data.last_page;
                    const state = Object.assign({}, ...this.state, {
                        items:[...this.state.items, ...items],
                        paginate:{
                            next: page+1,
                            total:totalPages
                        }
                    })
                    this.setState(state);
                    this.setSearch(true, search);
            });
            }else{
                response = axios.get(`/api/product/search/${search}?page=${page}`).then((response)=>{
                    const items = response.data.data;            
                    const totalPages = response.data.last_page;
                    const state = Object.assign({}, ...this.state, {
                        items:[...items],
                        paginate:{
                            next: page+1,
                            total:totalPages
                        }
                    })
                    this.setState(state);
                });
                this.setSearch(true, search);
            }
            //console.log(response)
            return await response;
    }
    
    cancelSearch(){
        this.setSearch(false, "");
        this.requestItems()
        
    }

    //Cart Methods
    addToCart(data){
        this.quantity = 1;
        this.exist = false;
        let state =null;

        this.state.cart.catalog.map((item)=>{
            if(item.id == data){
                this.exist = true;
                this.quantity = ++item.quantity;
            }
        })
        
        if(!this.exist){
            state = Object.assign({}, ...this.state,{
                cart:{  
                    ...this.state.cart,                    
                    count: ++this.state.cart.count,
                    catalog:[
                        ...this.state.cart.catalog,
                        {
                            id:data,
                            quantity: 1
                        }   
                    ]
                }  
            })
        }
        else{
            state = Object.assign({}, ...this.state, {
                cart:{  
                    ...this.state.cart,
                    count: this.state.cart.count+1,                  
                    catalog:
                        this.state.cart.catalog.map(item=>{
                            if(item.id == data){
                                return {id:data, quantity: this.quantity}
                            }
                            return item
                        })
                        
                }  
            })
        }
        this.setState(state)
                
    }
    
    async getCartItems(catalog){
        let old = false;
        let response = null;
        let amount = 0;
        catalog.length && this.setState({loading:{ cart: true }})
        catalog.map(item=>{
            const id = item.id;
            const quantity = item.quantity;
            
            if(old){
                 response = axios.get(`api/product/${id}`).then(response=>{
                    const total = response.data.price*quantity
                    amount = amount + parseInt(total)
                    const state = Object.assign({}, this.state,{
                        cart:{
                            ...this.state.cart,
                            items:[...this.state.cart.items, {...response.data, quantity, total }],
                            amount:amount
                        },
                        loading:{
                            cart:false
                        },
                        error:{
                            cart: false
                        }
                    })
                    this.setState(state)
                }).catch(error=>{
                    console.log(error.message);
                    this.setState({error:{
                        cart: error.message
                    }})
                })
            }else{
                response = axios.get(`api/product/${id}`).then(response=>{
                    const total = response.data.price*quantity 
                    amount = amount + parseInt(total)                                       
                    const state = Object.assign({}, this.state,{
                        cart:{
                            ...this.state.cart,
                            items:[{...response.data, quantity, total}],
                            amount:amount
                            
                        },
                        loading:{
                            cart:false
                        },
                        error:{
                            cart: false
                        }
                    })
                    this.setState(state)
                }).catch(error=>{
                    console.log(error.message);                    
                    this.setState({error:{
                        cart: error.message
                    }})
                })
                old = true;
            }
            
        })
        return await response;
    }

    updateCartItemQuantity(id, value, oldValue){
        const count = this.state.cart.count-oldValue+value
        let amount = 0;
        
        this.state.cart.items.map(item=>{
            if(item.id==id){
                amount = amount + (item.price*value)
                return;
            }
            amount = amount + (item.total)
            return;
        })

        const state = Object.assign({}, this.state, {
            cart:{
                ...this.state.cart,
                count:count,
                catalog:this.state.cart.catalog.map(item=>{
                        if(item.id==id){
                            item.quantity=value;
                            item.total = item.quantity*item.price;
                        }
                        return item;
                    }),
                items: this.state.cart.items.map(item=>{
                        if(item.id==id){
                            item.quantity=value;
                            item.total = item.quantity*item.price;
                        }
                        return item;
                    }),
                amount: amount
            }

        })

        this.setState(state)
        

    }

    removeCartItem(id, quantity){
        const items = []
        const catalog = []
        const count = this.state.cart.count-quantity

        this.state.cart.items.map(item=>{
            if(item.id!=id){
                items.push(item);
            }
        })
        this.state.cart.catalog.map(item=>{
            if(item.id!=id){
                catalog.push(item);
            }
        })

        const state = Object.assign({}, this.state, {
            cart:{
                count:count,
                catalog:catalog,
                items: items
            }

        })

        this.setState(state)
        
    }

    //FIlter Method
    filterItems(items=[], filter="", data=""){
        const filteredItems = items.filter(item=>item.category==filter||filter=="all");
        return filteredItems;
          
    }

    setFilter(filter){
        this.setState({filter});
    }

    render(){
        sessionStorage.setItem('cart', JSON.stringify(this.state.cart));
        return(
            <div>

                <NavBar 
                    cart={{count:this.state.cart.count, catalog:this.state.cart.catalog}} 
                    onSearch={this.search}
                    onCancelSearch={this.cancelSearch}
                    search={this.state.search}
                    onGetCart={this.getCartItems}
                />
                
                <Banner />

                <MobileSearchBar 
                    onSubmit={this.search} 
                    onCancelSearch={this.cancelSearch} 
                    search={this.state.search}
                />

                <Switch>
                    <Route exact path="/" render={()=>
                        <ArtDeck 
                        items={this.filterItems(this.state.items, this.state.filter, this.state.search)} 
                        onAddItemToCart={this.addToCart} 
                        onBuyItem={(item)=>alert(item +"bought")}
                        search={this.state.search}
                        filter={this.state.filter}
                        onSetFilter={this.setFilter}
                        paginate={{next:this.state.paginate.next, total:this.state.paginate.total}}
                        loadMore ={this.loadMore}
                        />                
                    }/>

                    <Route path="/:filter(penciled|abstract|computer|painting)" render={(path)=>{
                        const filter = path.match.params.filter;
                        return(
                            <ArtDeck 
                            items={this.filterItems(this.state.items, filter, this.state.search)} 
                            onAddItemToCart={this.addToCart} 
                            onBuyItem={(item)=>alert(item +"bought")}
                            search={this.state.search}
                            filter={filter}
                            onSetFilter={this.setFilter}
                            paginate={{next:this.state.paginate.next, total:this.state.paginate.total}}
                            loadMore ={this.loadMore}
                            />                
                        )
                        }
                    }/>
                    
                    <Route path="/cart" render={()=>
                            <Cart 
                            data={{items:this.state.cart.items, total:this.state.cart.amount}} 
                            onUpdateItemQuantity={this.updateCartItemQuantity} 
                            onRemoveItem={this.removeCartItem} 
                            loading={this.state.loading.cart}
                            error={this.state.error.cart}
                            />
                        
                    }
                    />
                    
                </Switch>
                <Footer />
            </div>
        )
    }

}

export default ArtWark