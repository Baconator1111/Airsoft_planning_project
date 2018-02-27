import React, { Component } from 'react'

import NavBar from '../../components/NavBar/NavBar'
import ConfirmingFriends from '../../components/ConfirmingFriends/ConfirmingFriends'
import ListingFriends from '../../components/ListingFriends/ListingFriends'
import SearchFriends from '../../components/SearchFriends/SearchFriends'

export default class Friends extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <NavBar page='Your Friends' />
                <h1>Friends component</h1>
                <div className='friends_components_wrapper' >
                    <SearchFriends />
                    <ListingFriends />
                    <ConfirmingFriends />
                </div>
            </div>
        )
    }
}