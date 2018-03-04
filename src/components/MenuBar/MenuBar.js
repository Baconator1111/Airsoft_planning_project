import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './menuBar.css'

export default class MenuBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    render() {
        return (
            <div className='menuBar' >
                <div className='menuBarLinks' >
                    {/* <Link  to='/my_planning'><div className='menuBarPlanning' >Plan</div></Link> */}
                    {/* <Link  to='/my_team'><div className='menuBarTeam' >Team</div></Link> */}
                    {/* <Link  to='/my_squad'><div className='menuBaSquadr' >Squad</div></Link> */}
                    {/* <Link  to='/current_game'><div className='menuBarGame' >Game</div></Link> */}
                    <Link  to='/general_feed'><button className='menuBtn menuBarFeed' >Forum</button></Link>
                    <Link  to='/profile'><button className='menuBtn menuBarProfile' >My Profile</button></Link>
                    <Link  to='/friends'><button className='menuBtn menuBarFriends' >My Friends</button></Link>
                    <Link  to='/saved_posts'><button className='menuBtn menuBarSaved' >Saved Posts</button></Link>
                    {/* <Link  to='/tech_tips'><div className='menuBarTips' >Tech Tips</div></Link> */}
                </div>
            </div>
        )
    }
}