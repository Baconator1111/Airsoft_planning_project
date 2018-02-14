import React, { Component } from 'react'

import NavBar from '../../components/NavBar/NavBar'

export default class SavedPosts extends Component {
    constructor( props ) {
        super( props )
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <NavBar page='Saved Posts'/>
                <h1>Saved Posts component</h1>
            </div>
        )
    }
}