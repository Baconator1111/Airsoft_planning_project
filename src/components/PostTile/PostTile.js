import React, { Component } from 'react'
import { socketConnect } from 'socket.io-react'
import axios from 'axios'
import './postTile.css'

import ExpandableBox from '../../components/ExpandableBox/ExpandableBox'
import CommentTile from '../../components/CommentTile/CommentTile'
import EditPost from '../EditPost/EditPost'


class PostTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numCom: null,
            comments: [],
            com_title: '',
            com_body: '',
            edit: false,
            userId: null
        }
        this.handleClickEditClose = this.handleClickEditClose.bind(this)
    }

    componentDidMount() {
        axios.get("/api/userinfo")
            .then(user => {
                let userInfo
                userInfo = user.data
                this.setState({ userId: user.data.user_id })
            })

        const { socket } = this.props
        const post_id_com = this.props.post.post_id
        socket.on(`send comments ${post_id_com}`, data => {
            // console.log(data)
            let numCom = data.length
            this.setState({ comments: data, numCom: numCom })
        })
        socket.emit('get comments', { post_id_com })
    }

    handleClickDelete(post) {
        const { socket } = this.props
        axios.put('/api/posts/delete', post)
            .then(() => socket.emit('post', { user_id: this.state.userId }))
    }

    handleClickFilter(post) {
        const { socket } = this.props
        axios.post('/api/posts/filter', post)
            .then(() => socket.emit('post', { user_id: this.state.userId }))
    }

    handleClickSave(post) {
        axios.post('/api/posts/save', post)
    }

    handleComTitle(input) {
        this.setState({ com_title: input })
    }

    handleComBody(input) {
        this.setState({ com_body: input })
    }

    handleSubmitComment() {
        const { socket } = this.props
        let body = {
            post_id_com: this.props.post.post_id,
            com_title: this.state.com_title,
            com_body: this.state.com_body
        }
        axios.post('/api/comments', body)
            .then(resp => {
                const post_id_com = this.props.post.post_id
                socket.emit('get comments', { post_id_com })
            })
    }

    handleClickEdit() {
        this.setState({ edit: true })
    }

    handleClickEditClose() {
        this.setState({ edit: false })
    }

    render() {
        // console.log(this.state.comments)
        const comments = (
            <div className='creatCommentExpBox' >
                {this.state.comments.map((comment) => {
                    return (
                        <div key={comment.com_id} className='commentTile'>
                            <CommentTile comment={comment} />
                        </div>
                    )

                })}
                <input className='inputCommentTitle' type="text" placeholder='Comment Title Here' onChange={e => this.handleComTitle(e.target.value)} />
                <input className='inputCommentBody' type="text" placeholder='Comment Body Here' onChange={e => this.handleComBody(e.target.value)} />
                <button onClick={() => this.handleSubmitComment()} >Submit</button>
            </div>)
        const post = this.props.post
        if (!this.state.edit) {
            return (
                <div key={post.post_id} className='postDisplay'>
                    <div className='postUserImg'><img src={post.user_img} alt="" /></div>
                    <div className='postBtn' >
                        <button className='post_filter' onClick={() => this.handleClickFilter(post)}>Remove From View</button>
                        <button className='post_save' onClick={() => this.handleClickSave(post)}>Save Post</button>
                        {this.state.userId === post.user_id_posts ? <button className='post_edit_form' onClick={() => this.handleClickEdit()} >Edit</button> : null}
                        {this.state.userId === post.user_id_posts ? <button className='post_save' onClick={() => this.handleClickDelete(post)}>Delete Post</button> : null}
                    </div>
                    <div className='postUserName'>{post.user_name}</div>
                    <div className='postTitle'>{post.post_title}</div>
                    {post.post_img ? <div className='postImg'><img src={post.post_img} alt="" /></div> : null}
                    <div className='postBody'>{post.post_body}</div>
                    <ExpandableBox boxTitle= {`${this.state.numCom}  Replies`} >{comments}</ExpandableBox>
                </div>
            )
        } else {
            return (
                <div>
                    <EditPost handleClickEditClose={this.handleClickEditClose} >{post}</EditPost>
                </div>
            )
        }


    }
}

export default socketConnect(PostTile)