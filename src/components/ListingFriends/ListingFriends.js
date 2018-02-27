import React, { Component } from 'react'
import { socketConnect } from 'socket.io-react'
import axios from 'axios'


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
            .then(user => {
                let userInfo
                userInfo = user.data
                this.setState({ userId: user.data.user_id })
                socket.emit('get friends', { user_id: this.state.userId })
            })

        socket.on('current friends', data => {
            this.setState({ currentFriends: data })
            console.log(this.state.currentFriends)
        })
    }

    handleDeleteFriendship(fnd_user_id) {
        console.log( fnd_user_id )
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
            <div>
                {this.state.currentFriends[0] ? this.state.currentFriends.map(friend => {
                    return (
                        <div>
                            <img src={friend.user_img} alt="" />
                            <div>{friend.first_name}</div>
                            <div>{friend.last_name}</div>
                            <button onClick={() => this.handleDeleteFriendship(friend.user_id)} className='deleteFriendBtn' >Unfriend</button>
                        </div>
                    )
                }) : 'Search for your friends on the left'}
            </div>
        )
    }
}

export default socketConnect(ListingFriends)