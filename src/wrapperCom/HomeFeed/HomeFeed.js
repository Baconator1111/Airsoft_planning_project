import React, { Component } from 'react'

import NavBar from '../../components/NavBar/NavBar'
import ExpandableBox from '../../components/ExpandableBox/ExpandableBox'

export default class HomeFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPosts: []
        }
    }

    componentDidMount() {
        axios.get('/api/posts')
            .then(posts => this.setState({ currentPosts: posts }))
    }

    render() {
        return (
            <div>
                <NavBar page='General Feed' />
                <div className='tiles'>
                    {this.state.currentPosts.map((post) => {
                        return (
                            <div key={post.post_id} className='postTile'>
                                <ProductTile post={post} />
                            </div>
                        )

                    })}
                </div>
            </div>
        )
    }
}