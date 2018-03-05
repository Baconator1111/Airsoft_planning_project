import React, { Component } from 'react'
import { socketConnect } from 'socket.io-react'
import axios from 'axios'

import './searchFriends.css'

class SearchFriends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            results: []
        }
    }

    handleSearch(input) {
        let names = input.split(' ')
        let body = {}
        this.setState({ first_name: names[0], last_name: names[1] }, () => {
            body.first_name = this.state.first_name
            body.last_name = this.state.last_name
            axios.put('/api/newfriends', body)
                .then(({ data }) => {
                    // console.log( data )
                    this.setState({ results: data })
                })
        })
    }

    handleNewFriendship(fnd_user_id) {
        // console.log( fnd_user_id )
        const { socket } = this.props
        const { first_name, last_name } = this.state
        let body = {
            first_name,
            last_name
        }
        axios.put('/api/addfriend', { fnd_user_id }).then(() => {
            socket.emit('get requests', { user_id: null })
            axios.put('/api/newfriends', body)
                .then(({ data }) => {
                    this.setState({ results: data })
                })
        }
        )
    }

    render() {
        return (
            <div className='searchFriendsMain' >
                <div className='searchTitle' >Search For New Friends</div>
                <div className='searchFriendsInput' ><input onChange={e => this.handleSearch(e.target.value)} type="text" /></div>
                {this.state.results[0] ? this.state.results.map(newFriend => {
                    return (
                        <div key={newFriend.user_id} className='newFriend' >
                            <div className='newFriendImg' ><img src={newFriend.user_img} alt="" /></div>
                            <div className='newFriendName' >
                                <div className='newFriendFirstName' >{newFriend.first_name}</div>
                                <div className='newFriendLastName' >{newFriend.last_name}</div>
                            </div>
                            <div className='addFriendPosition' ><button onClick={() => this.handleNewFriendship(newFriend.user_id)} className='addFriendBtn' >Add</button></div>
                        </div>
                    )
                }) : 'Search by First then Last name'}
            </div>
        )
    }
}

export default socketConnect(SearchFriends)