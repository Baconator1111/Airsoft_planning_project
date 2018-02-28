import React, { Component } from 'react'
import { socketConnect } from 'socket.io-react'
import axios from 'axios'
import sha1 from 'sha1'
import superagent from 'superagent'
import openSocket from 'socket.io-client';

class EditPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post_title: null,
            post_img: null,
            post_body: null
        }
    }

    componentWillMount() {
        const { post_title, post_img, post_body } = this.props.children
        this.setState({
            post_title,
            post_img,
            post_body
        })
    }

    handleInput(input, key) {
        this.setState({ [key]: input })
    }

    handleUpdate() {
        const { socket } = this.props

        let body = {
            post_id: this.props.children.post_id,
            post_title: this.state.post_title,
            post_img: this.state.post_img,
            post_body: this.state.post_body
        }
        axios.put('/api/posts', body)
            .then(() => {
                axios.get("/api/userinfo")
                    .then(user => {
                        let userInfo
                        userInfo = user.data
                        this.setState({ userId: user.data.user_id })
                        socket.emit('post', { user_id: this.state.userId })
                    })
                this.props.handleClickEditClose()
            })

    }

    uploadFile(files) {
        const image = files[0]

        const cloudName = 'dgoygxc2r'
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

        const timeStamp = Date.now() / 1000
        const uploadPreset = 'yhsufroq'

        const paramsStr = `timestamp=${timeStamp}&upload_preset=${uploadPreset}l7oomwFmuE9JiD_DjWbEEkYMJOA`
        const signature = sha1(paramsStr)

        const params = {
            'api_key': '163862536217352',
            'timestamp': timeStamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }

        let uploadRequest = superagent.post(url)
        uploadRequest.attach('file', image);

        Object.keys(params).forEach((key) => {
            uploadRequest.field(key, params[key]);
        });

        uploadRequest.end((err, res) => {
            if (err) {
                alert(err);
                return
            }

            console.log('UPLOAD COMLETE: ' + JSON.stringify(res.body));
            console.log(res.body.secure_url)
            this.setState({ post_img: res.body.secure_url })

        });
    }

    render() {
        return (
            <div>
                <img src={this.state.post_img} alt="" /><input onChange={e => this.uploadFile(e.target.files)} type="file" />
                <div >Post Title:  <input className='post_edit_input' onChange={(e) => this.handleInput(e.target.value, 'post_title')} value={this.state.post_title} /></div>
                <div >Post Body:  <textarea className='post_edit_input' onChange={(e) => this.handleInput(e.target.value, 'post_body')} value={this.state.post_body} /></div>
                <button onClick={() => this.handleUpdate()} >Save Changes</button>
                <button onClick={() => this.props.handleClickEditClose()} >Cancel</button>
            </div>
        )
    }

}

export default socketConnect(EditPost)