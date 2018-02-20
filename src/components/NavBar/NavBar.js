import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

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
        console.log(this.props.page)
        if (this.state.menu) {
            return (
                <div>
                    <div className='navMain' >
                        <Link to='/general_feed' ><div> Logo here </div></Link>
                        <h1 className='navTitle' >{this.props.page}</h1>
                        <button className='navBtn' onClick={() => this.handleMenuClose()} >menu icon</button>
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
                <Link to='/general_feed' >Logo here </Link>
                <h1 className='navTitle' >{this.props.page}</h1>
                <button className='navBtn' onClick={() => this.handleMenuOpen()} >menu icon</button>
            </div>
        )
    }
}