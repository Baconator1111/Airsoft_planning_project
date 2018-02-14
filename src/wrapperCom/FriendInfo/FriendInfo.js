import React, { Component } from 'react'

import NavBar from '../../components/NavBar/NavBar'


export default class FriendInfo extends Component {
    constructor( props ) {
        super( props )
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <NavBar page='yours friends name here'/>
                <h1>Friend Info component</h1>
            </div>
        )
    }
}