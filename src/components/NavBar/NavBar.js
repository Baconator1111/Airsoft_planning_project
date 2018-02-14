import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class NavBar extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            menu: false
        }
    }

    componentDidMount(){
        this.handleMenuClose()
    }

    handleMenuOpen(){
        this.setState({ menu: true })
    }

    handleMenuClose(){
        this.setState({ menu: false })
    }

    render(){
        if(this.state.menu){
            return (
                <div>
                    <Link to='/general_feed' ><div> Logo here </div></Link>
                    <h1>NavBar: { this.props.page }</h1>
                    <button onClick={ () => this.handleMenuClose() } >menu icon</button>
                    <div>
                        <Link to='/my_team'><div>Team</div></Link>
                        <Link to='/profile'><div>My Profile</div></Link>
                        <Link to='/friends'><div>My Friends</div></Link>
                        <Link to='/saved_posts'><div>Saved Posts</div></Link>
                        <Link to='/tech_tips'><div>Tech Tips</div></Link>
                        <a href={ process.env.REACT_APP_LOGOUT }> <button>Logout</button></a>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <Link to='/general_feed' >Logo here </Link>
                <h1>NavBar: { this.props.page }</h1>
                <button onClick={ () => this.handleMenuOpen() } >menu icon</button>
            </div>
        )
    }
}