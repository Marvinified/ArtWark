import React, {Component} from 'react';

class Banner extends Component{
    constructor(props){
        super(props)
        const qoutes=[
            "Art refreshes the mind and the soul.",
            "Love Art, Live Art!",
            "A Good Art is Sophisticatedly Simple."
        ];
        
        this.state={
            qoutes:qoutes,
            qoute:qoutes[0],
            index:0
        }
        
        this.prev = this.prev.bind(this)
        this.next = this.next.bind(this)
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)

        this.qouteNode = React.createRef();
    }
    
    componentDidMount(){
        // setInterval(()=>{this.changeQoute("++")}, 4000)
        this.play()
    }
    
    changeQoute(flow){
            const qoutes = this.state.qoutes;
            const index = this.state.index;
            const len = qoutes.length

            switch (flow){
                case "++":
                    if(index == len-1){
                        this.setState({qoute:qoutes[0], index:0})
                    }else{
                        this.setState({qoute:qoutes[index+1], index:index+1})
                    }
                    this.qouteNode.current.className = ""
                    this.qouteNode.current.className = "next"
                break;
                case "--":
                    if(index == 0){
                        this.setState({qoute:qoutes[len-1], index:len-1}) 
                    }else{
                        this.setState({qoute:qoutes[index-1], index:index-1})
                    }
                    this.qouteNode.current.className = ""                    
                    this.qouteNode.current.className = "prev"
            }
    }
    
    pause(){
        clearInterval(this.timeout)
    }
    
    play(){
        this.timeout = setInterval(()=>{this.changeQoute("++")}, 4000);
        this.timeout
    }

    prev(){
        this.changeQoute("--")
    }

    next(){
        this.changeQoute("++")
    }
    
    render(){
        return(
            <div className="banner" onMouseOver={this.pause} onMouseOut={this.play}>
                <span onClick={this.prev} className="control left" >
                    {/* <img src="../images/left.png" alt=""/> */}
                </span>
                <span ref={this.qouteNode} className="next" >
                    "{this.state.qoute}"
                </span>
                <span onClick={this.next} className="control right">
                    {/* <img src="../images/right.png" alt=""/> */}
                </span>
            </div>
        )
    }
}

export default Banner;