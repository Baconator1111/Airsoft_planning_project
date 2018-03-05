import React, { Component } from 'react'
import axios from 'axios'

import NavBar from '../../components/NavBar/NavBar'
import PostTile from '../../components/PostTile/PostTile'

import './savedPosts.css'

export default class SavedPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            savedPosts: []
        }
    }

    componentDidMount() {
        axios.get('/api/posts/save')
            .then(({ data }) => this.setState({ savedPosts: data }))
    }

    render() {
        if (this.state.savedPosts[0]) {
            return (
                <div className='savedPostsMain' >
                    <NavBar page='Saved Posts' />
                    <div className='tiles'>
                        {this.state.savedPosts.map((post) => {
                            return (
                                <div key={post.sv_id} className='postTile'>
                                    <PostTile post={post} />
                                </div>
                            )

                        })}
                    </div>
                    <div></div>
                </div>
            )
        } else {
            return (
                <div className='savedPostsNone' >
                    <NavBar page='Saved Posts' />
                    <h1> You have no Saved Posts </h1>
                </div>
            )
        }
    }
}