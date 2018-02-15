import React, { Component } from 'react'
import axios from 'axios'

import ExpandableBox from '../../components/ExpandableBox/ExpandableBox'
import CommentTile from '../../components/CommentTile/CommentTile'


export default class PostTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            com_title: '',
            com_body: ''

        }
    }

    componentDidMount() {
        axios.get(`/api/comments/${this.props.post.post_id}`)
            .then( ({data}) => this.setState({ comments: data }) )
    }

    handleClickFilter(postId) {
        axios.post('/api/posts/filter', this.props.post)
    }

    handleClickSave(postId) {
        axios.post('/api/posts/save', this.props.post)
    }

    handleComTitle(input) {
        this.setState({ com_title: input })
    }

    handleComBody(input) {
        this.setState({ com_body: input })
    }

    handleSubmitComment() {
        let body = {
            post_id_com: this.props.post.post_id,
            com_title: this.state.com_title,
            com_body: this.state.com_body
        }
        axios.post('/api/comments', body)
    }

    render() {
        const comments = (
            <div className='creatCommentExpBox' >
                {this.state.comments.map((comment) => {
                    return (
                        <div key={comment.comment_id} className='commentTile'>
                            <CommentTile comment={comment} />
                        </div>
                    )

                })}
                <input className='inputCommentTitle' type="text" placeholder='Comment Title Here' onChange={ e => this.handleComTitle( e.target.value )} />
                <input className='inputCommentBody' type="text" placeholder='Comment Body Here' onChange={ e => this.handleComBody( e.target.value )} />
                <button onClick={ () => this.handleSubmitComment() } >Submit</button>
            </div> )
        const post = this.props.post
        return (
            <div key={post.post_id} className='postDisplay'>
                <div className='postUserImg'><img src={post.user_img} alt=""/></div>
                <button className='filter' onClick={() => this.handleClickFilter(post.post_id)}>Filter Out</button>
                <button className='save' onClick={() => this.handleClickSave(post.post_id)}>Save</button>
                <div className='postUserName'>{post.user_name}</div>
                <div className='postTitle'>{post.post_title}</div>
                <div className='postImg'><img src={post.post_img} alt=""/></div>
                <div className='postBody'>{post.post_body}</div>
                <ExpandableBox boxTitle='Comments'>{comments}</ExpandableBox>
            </div>
        )
    }
}  