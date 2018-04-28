import React, {Component} from "react";
import ReactDOM from "react-dom";
import {ArtWark} from './components';
import {BrowserRouter} from "react-router-dom";

class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <BrowserRouter>
                <ArtWark/>
            </BrowserRouter>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('root'));