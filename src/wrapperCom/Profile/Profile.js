import React, { Component } from 'react'
import axios from 'axios'
import sha1 from 'sha1'
import superagent from 'superagent'
import openSocket from 'socket.io-client';
import './profile.css'
import NavBar from '../../components/NavBar/NavBar'

export default class UserInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userimg: '',
            firstName: '',
            lastName: '',
            displayName: '',
            rank: '',
            team: '',
            email: '',
            location: '',
            timestamp: 'None yet'
        }
    }

    componentDidMount() {

        axios.get("/api/userinfo")
            .then(user => {
                let userInfo = user.data
                let rank
                // console.log( userInfo )
                switch (userInfo.user_type) {
                    case 'reg':
                        rank = 'Soldier'
                        break
                    case 'teamL':
                        rank = 'Team Leader'
                        break
                    case 'squadL':
                        rank = 'Squad Leader'
                        break
                    case 'admin':
                        rank = 'Admin'
                        break
                }
                let displayName = `${userInfo.first_name?userInfo.first_name:'firstName'}.${userInfo.last_name?userInfo.last_name:'lastName'}`
                this.setState({
                    userimg: userInfo.user_img || "Enter Your Image Here",
                    firstName: userInfo.first_name || "Enter Your First Name Here",
                    lastName: userInfo.last_name || "Enter Your Last Name Here",
                    displayName: displayName || "Coming Soon",
                    rank: rank || "Soldier",
                    team: userInfo.user_team || "Go Join a Team",
                    email: userInfo.user_email || "Enter Your Email Here",
                    location: userInfo.user_location || "Enter Your Location Here"
                })
            })
    }

    handleChange(input, prop) {
        this.setState({
            [prop]: input
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
            'api_key': process.env.REACT_APP_CLOUDNARY_KEY,
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

            //   console.log('UPLOAD COMLETE: '+JSON.stringify(res.body));
            //   console.log( res.body.secure_url )
            this.setState({ userimg: res.body.secure_url })

        });
    }

    handleSaveChanges() {
        // console.log(this.state.userimg)
        let body = {
            user_img: this.state.userimg,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            user_location: this.state.location,
            user_email: this.state.email,
        }
        // console.log( body )
        axios.put('/api/user', body).catch(error => console.log(error))
    }

    handleCancel() {
        axios.get("/api/userinfo")
            .then(user => {
                let userInfo
                userInfo = user.data
                // console.log( userInfo )
                this.setState({
                    userimg: userInfo.user_img || "Enter Your Image Here",
                    firstName: userInfo.first_name || "Enter Your First Name Here",
                    lastName: userInfo.last_name || "Enter Your Last Name Here",
                    email: userInfo.user_email || "Enter Your Email Here",
                    location: userInfo.user_location || "Enter Your Location Here"
                })
            })
    }

    render() {
        return (
            <div className='profileMain'>
                <NavBar page='Profile' />
                <div className='profileInfo' >
                    <div className='profileLeft' >
                        <div className='profileTitle' >Profile</div>
                        <img className='profileImg' src={this.state.userimg} alt="" />
                        <label className='profileInputBtn' >
                            <input className='profileImgInput' onChange={e => this.uploadFile(e.target.files)} type="file" />
                            <div>Choose File</div>
                        </label>
                    </div>
                    <div className='profileMid' >
                        <div className='profileInfoDisplay' >First Name:  <input className='profile_input firstNameProfile' onChange={(e) => this.handleChange(e.target.value, 'firstName')} value={this.state.firstName} /></div>
                        <div className='profileInfoDisplay' >Last Name:  <input className='profile_input lastNameProfile' onChange={(e) => this.handleChange(e.target.value, 'lastName')} value={this.state.lastName} /></div>
                        <div className='profileInfoDisplay' >Display Name:   <input className='profile_input locationProfile' value={this.state.displayName} /></div>
                        <div className='profileInfoDisplay' >Rank: {this.state.rank} <input className='profile_input rankProfile' type="text" /> </div>
                        <div className='profileInfoDisplay' >Team:  {this.state.team} <input className='profile_input TeamProfile' type="text" /></div>
                        <div className='profileInfoDisplay' >Location:   <input className='profile_input locationProfile' onChange={(e) => this.handleChange(e.target.value, 'location')} value={this.state.location} /></div>
                        <div className='profileInfoDisplay' >Email:   <input className='profile_input emailProfile' onChange={(e) => this.handleChange(e.target.value, 'email')} value={this.state.email} /></div>
                        <div className='profileMidBtns' >
                            <button className='profileBtn profileCancel' onClick={() => this.handleCancel()}>Cancel</button>
                            <button className='profileBtn profileSave' onClick={() => this.handleSaveChanges()}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

