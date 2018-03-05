import React, { Component } from 'react'

import NavBar from '../../components/NavBar/NavBar'
import ConfirmingFriends from '../../components/ConfirmingFriends/ConfirmingFriends'
import ListingFriends from '../../components/ListingFriends/ListingFriends'
import SearchFriends from '../../components/SearchFriends/SearchFriends'

import './friends.css'

export default class Friends extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className='friendsMain' >
                <NavBar page='Your Friends' />
                <div className='friendsCont' >
                    <div className='friendsLeft' ><SearchFriends /></div>
                    <div className='friendsMid' ><ListingFriends /></div>
                    <div className='friendsRight' ><ConfirmingFriends /></div>
                </div>
            </div>
        )
    }
}