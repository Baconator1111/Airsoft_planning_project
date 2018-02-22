import React from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom'

import Landing from './wrapperCom/Landing/Landing'
import HomeFeed from './wrapperCom/HomeFeed/HomeFeed'
import Friends from './wrapperCom/Friends/Friends'
import SavedPosts from './wrapperCom/SavedPosts/SavedPosts'
import Profile from './wrapperCom/Profile/Profile'
import FriendInfo from './wrapperCom/FriendInfo/FriendInfo'
import Donate from './components/Donate/Donate'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/friend' component={FriendInfo}/>
        <Route path='/general_feed' component={HomeFeed}/>
        <Route path='/saved_posts' component={SavedPosts}/>
        <Route path='/friends' component={Friends}/>
        <Route path='/donate' component={Donate}/>
    </Switch>  
)