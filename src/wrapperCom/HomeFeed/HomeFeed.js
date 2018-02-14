import React, { Component } from 'react'

import NavBar from '../../components/NavBar/NavBar'

export default class HomeFeed extends Component {
    constructor( props ) {
        super( props )
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <NavBar page='General Feed' />
                <h1>HomeFeed component</h1>
            </div>
        )
    }
}