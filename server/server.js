require( 'dotenv' ).config()

const express = require( 'express' ),
      session = require( 'express-session' ),
      passport = require( 'passport' ),
      Auth0Strategy = require( 'passport-auth0' ),
      massive = require( 'massive' ),
      postsCtrl = require( './controllers/posts_ctrl' ),
      commentsCtrl = require( './controllers/comments_ctrl' ),
      userCtrl = require( './controllers/user_ctrl' ),
      friendsCtrl = require( './controllers/friends_ctrl' )

const app = express(),
    { SERVER_PORT, SESSION_SECRET, DOMAIN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, DB_CONNECTION } = process.env

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use( passport.initialize() )
app.use( passport.session() )

massive( DB_CONNECTION ).then( db => app.set( 'db', db ) )

passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function( accessToken, refreshToken, extreParams, profile, done ){
    const db = app.get( 'db' )
    const { sub, name, picture } = profile._json

    db.find_user([ sub ])
        .then( resp => {
            if ( resp[0] ) {
                done( null, resp[0].user_id)
            } else {
                db.create_user([ name, picture, sub ])
                    .then( resp => {
                        done(null, resp[0].user_id)
                    })
            }
        })

}))

passport.serializeUser( ( id, done ) => done( null, id) )
passport.deserializeUser( ( id, done ) => {
    const db = app.get( 'db' )
    db.find_logged_in_user([ id ]).then( resp => done( null, resp[0] ))
} )

app.get( '/auth', passport.authenticate( 'auth0' ) )
app.get( '/auth/callback', passport.authenticate( 'auth0', { 
    successRedirect: 'http://localhost:3000/'
} ) )
app.get( '/auth/me', ( req, res) => {
    if ( !req.user ) {
        res.status( 404 ).send( 'User no longer Logged in' )
    } else {
        res.status( 200 ).send( req.user )
    }
})

app.get( '/logout', ( req, res ) =>{
    req.logout() 
    res.redirect( 'http://localhost:3000/#/')
    }
)

//app endpoints start here

app.put( "/api/user", userCtrl.updateUserInfo )
app.put( "/api/user/type/:type", userCtrl.updateUserType )

app.get( "/api/posts", postsCtrl.readPosts )
app.put( "/api/posts", postsCtrl.updatePost )
app.post( "/api/posts", postsCtrl.createPost )
app.delete( "/api/posts", postsCtrl.deletePost )

app.get( "/api/comments", commentsCtrl.readComments )
app.put( "/api/comments", commentsCtrl.updateComment )
app.post( "/api/comments", commentsCtrl.createComment )
app.delete( "/api/comments", commentsCtrl.deleteComment )

app.get( "/api/friends", friendsCtrl.readCurrentFriends )
app.put( "/api/newfriends", friendsCtrl.searchNewFriends )
app.put( "/api/addfriend", friendsCtrl.createFriendship )
app.put( "/api/comfirmfriend", friendsCtrl.confirmFriend )
app.delete( "/api/friend", friendsCtrl.deleteFriend )
    

app.listen(SERVER_PORT, ()=> console.log(`Server listening to port ${ SERVER_PORT }`))