import React, { Component } from 'react'
import './landing.css'

export default class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className='landingMain' >
                <div className='landingLogo' >
                    <div className='landingUAF' >UAF</div>
                    <div className='landingBar' >|</div>
                    <div className='landingFullUAF' >Universal Air Forum</div>
                </div>
                <div className='landingQuotes' >
                    <div className='landingQuoteLine lq1' >"By failing to prepare, </div>
                    <div className='landingQuoteLine lq2' >you are preparing to fail."</div>
                    <div className='landingQuoteLine lqAuth' > -Benjamin Franklin</div>
                </div>
                    <a className='loginBtnPosition' href={process.env.REACT_APP_LOGIN}><button className='loginButton' >Login</button></a>
            </div>
        )
    }
}