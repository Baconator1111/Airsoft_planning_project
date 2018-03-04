import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class MenuBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    render() {
        return (
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
        )
    }
}