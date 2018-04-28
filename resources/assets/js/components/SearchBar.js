import React, {Component} from 'react';

const SearchBar =({onSubmit, onCancel, search}) => {
    //console.log(search)
    const input = React.createRef()
    const submit =(e)=>{
        e.preventDefault();
        const data = input.current.value;
        input.current.value =null;
        onSubmit(data)
    }
    const cancel =(e)=>{
        e.preventDefault();
        onCancel();
    }
    const CancelNode = ({search, onClick})=>{
        // console.log(":search:"+search)
        if(search.status)
            return(
                <button onClick={onClick}>
                        <img src="../images/close.png" alt=""/>
                </button>
            )
        return null;
    }
    
    return(
        <form onSubmit={submit}>
            <div className="search-bar">
                <input type="search" ref={input} placeholder="Search..."/>
                <button type="submit" >
                    <img src="../images/search.png" alt="Search"/>
                </button>
               <CancelNode search={search} onClick={cancel}/>
            </div>
        </form>
    )
}

export default SearchBar;