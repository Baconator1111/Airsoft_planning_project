import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/fontawesome-free-solid'
import './navbar.css'
import Logo from './logo-01.png'

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
                        <Link to='/general_feed'><div>Forum</div></Link>
                        <Link to='/profile'><div>My Profile</div></Link>
                        <Link to='/friends'><div>My Friends</div></Link>
                        <Link to='/saved_posts'><div>Saved Posts</div></Link>
                        {/* <Link to='/tech_tips'><div>Tech Tips</div></Link> */}
                    </div>
                </div>
            )
        }
        return (
            <div className='navMain' >
                <Link to='/general_feed' className='navLogo' >UAF</Link>
                <div className='navRight' >
                    <a className='logoutPosition' href={process.env.REACT_APP_LOGOUT}><button className='logoutBtn' >Logout</button></a>
                    {this.state.userImg ? <div className='userImgNavCont' ><img className='userImgNav' src={this.state.userImg} alt="" /></div> : <div className='userImgNavCont'><img className='userImgNav' src='' /></div>}
                    <button className='navBtn' onClick={() => this.handleMenuOpen()} ><FontAwesomeIcon icon={faBars} /></button>
                </div>
            </div>
        )
    }
}