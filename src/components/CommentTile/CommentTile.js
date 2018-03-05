import React, { Component } from 'react'
import './commentTile.css'

export default class CommentTile extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const comment = this.props.comment
        // console.log( 'comment Tile hit' )
        return (
            <div key={comment.comment_id} className='commentDisplay'>
                <div className='commentUserInfo' >
                    <div className='commentUserImg'><img src={comment.user_img} alt="" /></div>
                    <div className='commentUserName'>{comment.user_name}</div>
                </div>
                <div className='commentInfo' >
                    <div className='commentTitle'>{comment.com_title}</div>
                    <div className='commentBody'>{comment.com_body}</div>
                </div>
            </div>
        )
    }
}