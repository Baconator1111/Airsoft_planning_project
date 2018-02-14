import React, { Component } from 'react'


export default class Landing extends Component {
    constructor( props ) {
        super( props )
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <h1>Landing component</h1>
                <a href={ process.env.REACT_APP_LOGIN }><button>Login</button></a>
                </div>
        )
    }
}