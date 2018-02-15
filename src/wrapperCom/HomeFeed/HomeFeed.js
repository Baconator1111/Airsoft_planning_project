import React, { Component } from 'react'
import axios from 'axios'

import NavBar from '../../components/NavBar/NavBar'
import ExpandableBox from '../../components/ExpandableBox/ExpandableBox'
import PostTile from '../../components/PostTile/PostTile'

export default class HomeFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPosts: [],
            post_title: '',
            post_body: ''
        }
    }

    componentDidMount() {
        axios.get('/api/posts')
            .then( ({data}) => this.setState({ currentPosts: data }))
    }

    handleChange( input, prop ) {
        this.setState({
            [ prop ]: input
        })
    }

    handleSubmitPost() {
        if(this.state.post_body && this.state.post_title) {
            let body = {
                post_id_com: this.props.post_id,
                post_title: this.state.post_title,
                post_body: this.state.post_body
            }
            axios.post('/api/posts', body)
        }
    }

    render() {
        const post = <div className='creatPostExpBox' >
                         <input onChange={ e => this.handleChange( e.target.value, 'post_title' )} className='inputPostTitle' type="text" placeholder='Post Title Here'/>
                         <input onChange={e => console.log( e.target.files )} type="file"/>
                         <input onChange={ e => this.handleChange( e.target.value, 'post_body' )} className='inputPostBody' type="text" placeholder='Post Body Here'/>
                         <button onClick={ ()=> this.handleSubmitPost() } >Submit</button>
                    </div>
        if( this.state.currentPosts[0] ){
        return (
            <div>
                <NavBar page='General Feed' />
                <ExpandableBox boxTitle='CreatePost'>{post}</ExpandableBox>
                <div className='tiles'>
                    {this.state.currentPosts.map((post) => {
                        return (
                            <div key={post.post_id} className='postTile'>
                                <PostTile post={post} />
                            </div>
                        )

                    })}
                </div>
            </div>
        ) } else {
            return (
                <div>
                    <NavBar page='General Feed' />
                    <ExpandableBox boxTitle='CreatePost'>{post}</ExpandableBox>
                    <h1>No new posts</h1>
                </div>
            )
        }
    }
}