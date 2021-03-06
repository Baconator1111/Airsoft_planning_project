import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/fontawesome-free-solid'
import './navbar.css'

import MenuBar from '../MenuBar/MenuBar'

export default class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: false,
            userImg: null
        }
    }

    componentDidMount() {
        this.handleMenuClose()

        axios.get("/api/userinfo")
            .then(user => {
                let userInfo
                userInfo = user.data
                this.setState({ userImg: user.data.user_img })
            })

    }

    handleMenuOpen() {
        this.setState({ menu: true })
    }

    handleMenuClose() {
        this.setState({ menu: false })
    }

    render() {
        if (this.state.menu) {
            return (
                <div>
                    <div className='navMain' >
                        <Link to='/general_feed' className='navLogo' >UAF</Link>
                        <a className='logoutPosition' href={process.env.REACT_APP_LOGOUT}><button className='logoutBtn' >Logout</button></a>
                        {this.state.userImg ? <div className='userImgNavCont' ><img className='userImgNav' src={this.state.userImg} alt="" /></div> : <div className='userImgNavCont'><img className='userImgNav' src='' /></div>}
                        <button className='navBtn' onClick={() => this.handleMenuClose()} ><FontAwesomeIcon icon={faBars} /></button>
                    </div>
                    <div className='navLinks' >
                        {/* <Link to='/my_planning'><div>Plan</div></Link> */}
                        {/* <Link to='/my_team'><div>Team</div></Link> */}
                        {/* <Link to='/my_squad'><div>Squad</div></Link> */}
                        {/* <Link to='/current_game'><div>Game</div></Link> */}
                        <Link  to='/general_feed'><button className='dropDownBtn dropDownFeed' >Forum</button></Link>
                        <Link  to='/profile'><button className='dropDownBtn dropDownProfile' >My Profile</button></Link>
                        <Link  to='/friends'><button className='dropDownBtn dropDownFriends' >My Friends</button></Link>
                        <Link  to='/saved_posts'><button className='dropDownBtn dropDownSaved' >Saved Posts</button></Link>
                        {/* <Link to='/tech_tips'><div>Tech Tips</div></Link> */}
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className='navMain' >
                    <Link to='/general_feed' className='navLogo' >UAF</Link>
                    <div className='navRight' >
                        <a className='logoutPosition' href={process.env.REACT_APP_LOGOUT}><button className='logoutBtn' >Logout</button></a>
                        {this.state.userImg ? <div className='userImgNavCont' ><img className='userImgNav' src={this.state.userImg} alt="" /></div> : <div className='userImgNavCont'><img className='userImgNav' src='' /></div>}
                        <button className='navBtn' onClick={() => this.handleMenuOpen()} ><FontAwesomeIcon icon={faBars} /></button>
                    </div>
                </div>
                <MenuBar className='navMenuBar' />
            </div>
        )
    }
}