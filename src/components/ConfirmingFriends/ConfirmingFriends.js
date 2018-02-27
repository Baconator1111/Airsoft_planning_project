import React, { Component } from 'react'
import { socketConnect } from 'socket.io-react'
import axios from 'axios'


class ConfirmingFriends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: null,
            pendingFriends: []
        }
    }

    componentDidMount() {
        const { socket } = this.props
        axios.get("/api/userinfo")
            .then(user => {
                let userInfo
                userInfo = user.data
                this.setState({ userId: user.data.user_id })
                socket.emit('get requests', { user_id: this.state.userId })
            })

        socket.on('friend requests', data => {
            this.setState({ pendingFriends: data })
            console.log(this.state.pendingFriends)
        })
    }

    acceptFriendRequest(fnd_id) {
        axios.put( '/api/confirmfriend', fnd_id )
            .then( () => {
                socket.emit('get requests', { user_id: this.state.userId })
            } )
    }

    render() {
        return (
            <div>
                <div>Friend Requests</div>
                {this.state.results[0] ? this.state.results.map(friendRequest => {
                    return (
                        <div>
                            <img src={friendRequest.user_img} alt="" />
                            <div>{friendRequest.first_name}</div>
                            <div>{friendRequest.last_name}</div>
                            <button onClick={() => this.acceptFriendRequest(friendRequest.fnd_id)} className='confirmFriendBtn' >Confirm</button>
                        </div>
                    )
                }) : null}
            </div>
        )
    }
}

export default socketConnect(ConfirmingFriends)