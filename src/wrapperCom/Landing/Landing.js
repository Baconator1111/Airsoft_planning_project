import React, { Component } from 'react'
import './landing.css'

export default class Landing extends Component {
    constructor( props ) {
        super( props )
        this.state = {

        }
    }

    render(){
        return (
            <div className='landingMain' >
                <div className='landingQuotes' >‘By failing to prepare, you are preparing to fail.’ -Benjamin Franklin</div>
                <a href={ process.env.REACT_APP_LOGIN }><button className='loginButton' >Login</button></a>
            </div>
        )
    }
}