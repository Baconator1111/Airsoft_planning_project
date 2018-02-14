import React, { Component } from 'react'

import NavBar from '../../components/NavBar/NavBar'

export default class Friends extends Component {
    constructor( props ) {
        super( props )
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <NavBar page='Your Friends'/>
                <h1>Friends component</h1>
            </div>
        )
    }
}