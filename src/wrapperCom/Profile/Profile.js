import React, { Component } from 'react'
import axios from 'axios'

import NavBar from '../../components/NavBar/NavBar'


export default class UserInfo extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            userimg: '',
            firstName: '',
            lastName: '',
            email: '',
            location: ''
        }
    }

    componentDidMount(){
        
        axios.get( "/api/userinfo" )
            .then( user =>{ 
                let userInfo
                userInfo = user.data 
                console.log( userInfo )
                this.setState({ 
                    userimg: userInfo.user_img || "Enter Your Image Here",
                    firstName: userInfo.first_name || "Enter Your First Name Here",
                    lastName: userInfo.last_name || "Enter Your Last Name Here",
                    email: userInfo.email || "Enter Your Email Here",
                    location: userInfo.location || "Enter Your Location Here"
                })
        })
    }

    render(){
        return (
            <div>
                <NavBar page= 'Profile' />
                <h1>Profile</h1>
                <img src={ this.state.userimg } alt=""/><input onChange={e => console.log( e.target.files )} type="file"/>
                <h1>First Name:  {this.state.firstName}</h1>
                <h1>Last Name:  {this.state.lastName}</h1>
                <h1>Email:  {this.state.email}</h1>
                <h1>Location:   {this.state.location}</h1>
            </div>
        )
    }
}