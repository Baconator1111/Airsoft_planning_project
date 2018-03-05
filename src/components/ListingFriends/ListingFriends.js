import React, { Component } from 'react'
import { socketConnect } from 'socket.io-react'
import axios from 'axios'

import './listingFriends.css'


class ListingFriends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentFriends: [],
            userId: null
        }
    }

    componentDidMount() {
        const { socket } = this.props
        axios.get("/api/userinfo")
            .then(({ data }) => {
                this.setState({ userId: data.user_id })
                socket.emit('get friends', { user_id: this.state.userId })
            })

        socket.on('current friends', data => {
            this.setState({ currentFriends: data })
            // console.log(this.state.currentFriends)
        })
    }

    handleDeleteFriendship(fnd_user_id) {
        // console.log( fnd_user_id )
        const { socket } = this.props
        const body = {
            fnd_user_id: fnd_user_id
        }
        axios.put('/api/friend/delete', body)
            .then(() => {
                socket.emit('get friends', { user_id: this.state.userId })
            })
    }

    render() {
        return (
            <div className='listingMain' >
                <div className='listingTitle' >Current Friends</div>
                {this.state.currentFriends[0] ? this.state.currentFriends.map(friend => {
                    return (
                        <div key={friend.user_id} className='friend' >
                            <div className='friendImg' ><img src={friend.user_img} alt="" /></div>
                            <div className='friendName' >
                                <div className='friendFirstName' >{friend.first_name}</div>
                                <div className='friendLastName' >{friend.last_name}</div>
                            </div>
                            <div className='unfriendPosition' ><button onClick={() => this.handleDeleteFriendship(friend.user_id)} className='unfriendBtn' >Unfriend</button></div>
                        </div>
                    )
                }) : 'Search for your friends on the left'}
            </div>
        )
    }
}

export default socketConnect(ListingFriends)