import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/fontawesome-free-solid'
import './navbar.css'
import Logo from './logo-01.png'

export default class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: false
        }
    }

    componentDidMount() {
        this.handleMenuClose()
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
                        <Link to='/general_feed' className='navLogo' ><img src={Logo} alt=""/></Link>
                        <h1 className='navTitle' >{this.props.page}</h1>
                        <button className='navBtn' onClick={() => this.handleMenuClose()} ><FontAwesomeIcon icon={faBars} /></button>
                    </div>
                    <div className='navLinks' >
                        <Link to='/my_team'><div>Team</div></Link>
                        <Link to='/profile'><div>My Profile</div></Link>
                        <Link to='/friends'><div>My Friends</div></Link>
                        <Link to='/saved_posts'><div>Saved Posts</div></Link>
                        <Link to='/tech_tips'><div>Tech Tips</div></Link>
                        <a href={process.env.REACT_APP_LOGOUT}> <button>Logout</button></a>
                    </div>
                </div>
            )
        }
        return (
            <div className='navMain' >
                <Link to='/general_feed' className='navLogo' ><img src={Logo} alt=""/></Link>
                <h1 className='navTitle' >{this.props.page}</h1>
                <button className='navBtn' onClick={() => this.handleMenuOpen()} ><FontAwesomeIcon icon={faBars} /></button>
            </div>
        )
    }
}