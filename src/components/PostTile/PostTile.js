import React, { Component } from 'react'
import axios from 'axios'

import ExpandableBox from '../../components/ExpandableBox/ExpandableBox'


export default class PostTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        axios.get(`/api/comments/`)
    }

    handleClickFilter(postId){
        axios.
    }

    render() {
        const post = props.post
        return (
            <div key={post._id} className='prodInfo'>
                <div className='postUserImg'>{post.user_img}</div>
                <button className='filter' onClick={() => handleClickFilter(post.post_id)}>Add to Cart</button>
                <div className='postUserName'>{post.user_name}</div>
                <div className='postTitle'>{post.post_title}</div>
                <div className='postImg'>{post.post_img}</div>
                <div className='postBody'>{post.post_body}</div>
                <ExpandableBox boxTitle='Comments'>{comments}</ExpandableBox>
            </div>
        )
    }
}  