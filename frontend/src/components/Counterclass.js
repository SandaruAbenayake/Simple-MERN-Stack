import React from "react";

class CounterClass extends React.Component{
    constructor() {
        super();
        this.state={
            number : 120
        }
    }

    render(){
        return (
            <div>
               <h1>Counter= {this.state.number}</h1>
            </div>
        )
    }
}

export default CounterClass;