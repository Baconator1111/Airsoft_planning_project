import React, { Component } from 'react'
import { socketConnect } from 'socket.io-react'
import axios from 'axios'
import sha1 from 'sha1'
import superagent from 'superagent'
import Dropzone from 'react-dropzone'
import './homefeed.css'

import NavBar from '../../components/NavBar/NavBar'
import ExpandableBox from '../../components/ExpandableBox/ExpandableBox'
import PostTile from '../../components/PostTile/PostTile'
import DonateBtn from '../../components/DonateBtn/DonateBtn'

require('dotenv').config()


class HomeFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPosts: [],
            post_title: '',
            post_body: '',
            images: '',
            userId: null,
            close: false
        }
    }

    componentDidMount() {
        axios.get("/api/userinfo")
            .then(user => {
                let userInfo
                userInfo = user.data
                console.log(userInfo)
                this.setState({ userId: user.data.user_id })
                console.log(this.state.userId)
                socket.emit('post', { user_id: this.state.userId })
            })


        // axios.get('/api/posts')
        //     .then( ({data}) => this.setState({ currentPosts: data }))

        const { socket } = this.props
        socket.on('get posts', data => {
            this.setState({ currentPosts: data })
            console.log( this.state.currentPosts )
        })
    }

    handleChange(input, prop) {
        this.setState({
            [prop]: input
        })
    }

    handleSubmitPost() {
        if (this.state.post_body && this.state.post_title) {
            let body = {
                post_id_com: this.props.post_id,
                post_title: this.state.post_title,
                post_body: this.state.post_body,
                post_img: this.state.images
            }
            axios.post('/api/posts', body)
                .then(() => {
                    this.props.socket.emit('post', { user_id: this.state.userId })
                    this.setState({ close: true })
                })
        }
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
            'signature': signature,

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
            this.setState({ images: res.body.secure_url })

        });

        let formData = new FormData();
        formData.append("api_key", '163862536217352');
        formData.append("file", image);
        formData.append("timestamp", timeStamp);
        formData.append("upload_preset", uploadPreset);


        axios.post(url, formData)
            .then(({ data }) => console.log('Upload Complete: ' + data))

    }

    render() {
        // console.log( this.state.currentPosts )
        const post = <div className='creatPostExpBox' >
            <input onChange={e => this.handleChange(e.target.value, 'post_title')} className='inputPostTitle' type="text" placeholder='Post Title Here' />
            <Dropzone onDrop={this.uploadFile.bind(this)} />
            <input onChange={e => this.handleChange(e.target.value, 'post_body')} className='inputPostBody' type="text" placeholder='Post Body Here' />
            <button onClick={() => this.handleSubmitPost()} >Submit</button>
        </div>
        if (this.state.currentPosts[0]) {
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
                    <DonateBtn />
                </div>
            )
        } else {
            return (
                <div>
                    <NavBar page='General Feed' />
                    <ExpandableBox close={ this.state.close } boxTitle='CreatePost'>{post}</ExpandableBox>
                    <h1>No new posts</h1>
                    <DonateBtn />
                </div>
            )
        }
    }
}

export default socketConnect(HomeFeed)