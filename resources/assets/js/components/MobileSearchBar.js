import React, {Component} from 'react';
import {SearchBar} from '../components'

const MobileSearchBar = ({onSubmit, onCancelSearch, search})=>{
    return(
        <div className="mobile">
            <SearchBar onSubmit={onSubmit} onCancel={onCancelSearch} search={search}/>
        </div>
    )
}

export default MobileSearchBar