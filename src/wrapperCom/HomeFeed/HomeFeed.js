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
import EventsListing from '../../components/EventsListing/EventsListing'



class HomeFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPosts: [],
            post_title: '',
            post_body: '',
            image: '',
            userId: null,
            close: false
        }
    }

    componentDidMount() {
        axios.get("/api/userinfo")
            .then(user => {
                let userInfo
                userInfo = user.data
                this.setState({ userId: user.data.user_id })
                socket.emit('post', { user_id: this.state.userId })
            })


        // axios.get('/api/posts')
        //     .then( ({data}) => this.setState({ currentPosts: data }))

        const { socket } = this.props
        socket.on('get posts', data => {
            this.setState({ currentPosts: data })
        })
    }

    componentWillReceiveProps() {
        const { socket } = this.props
        socket.on('get posts', data => {
            this.setState({ currentPosts: data })
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
                post_img: this.state.image
            }
            axios.post('/api/posts', body)
                .then(() => {
                    this.props.socket.emit('post', { user_id: this.state.userId })
                })
            this.setState({ close: true })
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
            'api_key': process.env.REACT_APP_CLOUDNARY_KEY,
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

            // console.log('UPLOAD COMLETE: ' + JSON.stringify(res.body));
            // console.log(res.body.secure_url)
            this.setState({ image: res.body.secure_url })

        });

        let formData = new FormData();
        formData.append("api_key", process.env.REACT_APP_CLOUDNARY_KEY);
        formData.append("file", image);
        formData.append("timestamp", timeStamp);
        formData.append("upload_preset", uploadPreset);


        axios.post(url, formData)
        // .then(({ data }) => console.log('Upload Complete: ' + data))

    }

    render() {
        // console.log( this.state.currentPosts )
        const post = <div className='createPostExpBox' >
            <div>Post Title: <input onChange={e => this.handleChange(e.target.value, 'post_title')} className='inputPostTitle' type="text" placeholder='Post Title Here' /></div>
            <img className='inputImg' src={this.state.image} alt="" /><input onChange={e => this.uploadFile(e.target.files)} type="file" />
            <div className='inputPostBodyCont' >Post Body: <textarea onChange={e => this.handleChange(e.target.value, 'post_body')} className='inputPostBody' type="text" placeholder='Post Body Here' /></div>
            <button className='createPostSubmit' onClick={() => this.handleSubmitPost()} >Submit</button>
        </div>
        if (this.state.currentPosts[0]) {
            return (
                <div className='homeFeed' >
                    <NavBar page='General Feed' />
                    <div className='homeFeedMain' >
                        <div className='homeFeedBody' >
                            <div className='homeFeedEvents' ><EventsListing /></div>
                            <div className='homeFeedPosts' >
                                <div className='createPost' ><ExpandableBox style='createPostBtn' close={this.state.close} boxTitle='CreatePost'>{post}</ExpandableBox></div>
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
                        </div>
                        <DonateBtn />
                    </div>
                </div>

            )
        } else {
            return (
                <div className='homeFeedNone' >
                    <NavBar page='General Feed' />
                    <div className='homeFeedMain' >
                        <div className='homeFeedBody' >
                            <div className='homeFeedEvents' ><EventsListing /></div>
                            <div className='homeFeedPosts' >
                                <div className='createPost' ><ExpandableBox style='createPostBtn' close={this.state.close} boxTitle='CreatePost'>{post}</ExpandableBox></div>
                                <h1>No new posts</h1>
                            </div>
                        </div>
                        <DonateBtn />
                    </div>
                </div>
            )
        }
    }
}

export default socketConnect(HomeFeed)