import React, { Component } from 'react'
import axios from 'axios'

import './profile.css'

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
                    email: userInfo.user_email || "Enter Your Email Here",
                    location: userInfo.user_location || "Enter Your Location Here"
                })
        })
    }

    handleChange( input, prop ) {
        this.setState({
            [ prop ]: input
        })
    }

    handleSaveChanges() {
        console.log(this.state.userimg)
        let body = {
            user_img: this.state.userimg,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            user_location: this.state.location,
            user_email: this.state.email,

        }
        console.log( body )
        axios.put('/api/user', body).catch( error => console.log( error ) )
    }

    render(){
        return (
            <div className='profileMain'>
                <NavBar page= 'Profile' />
                <h1>Profile</h1>
                <img src={ this.state.userimg } alt=""/><input onChange={e => console.log( e.target.files )} type="file"/>
                <div >First Name:  <input className='profile_input' onChange={(e)=>this.handleChange(e.target.value,'firstName')} value = {this.state.firstName}/></div>
                <div >Last Name:  <input className='profile_input' onChange={(e)=>this.handleChange(e.target.value,'lastName')} value = {this.state.lastName}/></div>
                <div >Email:   <input className='profile_input' onChange={(e)=>this.handleChange(e.target.value,'email')} value = {this.state.email}/></div>                
                <div >Location:   <input className='profile_input' onChange={(e)=>this.handleChange(e.target.value,'location')} value = {this.state.location}/></div>                
                <button onClick={ ()=> this.handleSaveChanges() }>Save Changes</button>
            </div>
        )
    }
}

