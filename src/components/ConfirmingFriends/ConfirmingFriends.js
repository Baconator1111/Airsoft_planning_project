import React, { Component } from 'react'
import { socketConnect } from 'socket.io-react'
import axios from 'axios'

import './confirmingFriends.css'

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
            .then(({ data }) => {
                this.setState({ userId: data.user_id })
                socket.emit('get requests', { user_id: this.state.userId })
            })

        socket.on('friend requests', data => {
            this.setState({ pendingFriends: data })
            // console.log(this.state.pendingFriends, data)
        })
    }

    acceptFriendRequest(fnd_id, user_id) {
        const { socket } = this.props
        let body = {
            fnd_id,
            fnd_user_id: user_id
        }
        axios.put('/api/confirmfriend', body)
            .then(() => {
                socket.emit('get requests', { user_id: this.state.userId })
            })
    }

    render() {
        return (
            <div className='confirmingFriendsMain' >
                <div className='searchTitle' >Friend Requests</div>
                {this.state.pendingFriends[0] ? this.state.pendingFriends.map(friendRequest => {
                    return (
                        <div key={friendRequest.user_id} className='friendRequest' >
                            <div className='friendRequestImg' ><img src={friendRequest.user_img} alt="" /></div>
                            <div className='friendRequestName' >
                                <div className='friendRequestFirstName' >{friendRequest.first_name}</div>
                                <div className='friendRequestLastName' >{friendRequest.last_name}</div>
                            </div>
                            <div className='confirmFriendPosition' ><button onClick={() => this.acceptFriendRequest(friendRequest.fnd_id, friendRequest.user_id)} className='confrimFriendBtn' >Add</button></div>
                        </div>
                    )
                }) : 'Currently you have no pending Friend Requests'}
            </div>
        )
    }
}

export default socketConnect(ConfirmingFriends)

