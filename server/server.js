require('dotenv').config()

const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    massive = require('massive'),
    postsCtrl = require('./controllers/posts_ctrl'),
    commentsCtrl = require('./controllers/comments_ctrl'),
    userCtrl = require('./controllers/user_ctrl'),
    friendsCtrl = require('./controllers/friends_ctrl'),
    socketsCtrl = require('./controllers/socketsCtrl'),
    bodyParser = require('body-parser'),
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY),
    socket = require('socket.io'),
    http = require('http')

let connections = []
let users = []
const app = express(),
    { SERVER_PORT, SESSION_SECRET, DOMAIN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, DB_CONNECTION } = process.env

//   Auth0 here
app.use( express.static( `${__dirname}/../build` ) )

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

massive(DB_CONNECTION).then(db => app.set('db', db))

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extreParams, profile, done) {
    const db = app.get('db')
    const { sub, name, picture } = profile._json

    db.find_user([sub])
        .then(resp => {
            if (resp[0]) {
                done(null, resp[0].user_id)
            } else {
                db.create_user([name, picture, sub])
                    .then(resp => {
                        done(null, resp[0].user_id)
                    })
            }
        })

}))

passport.serializeUser((id, done) => done(null, id))
passport.deserializeUser((id, done) => {
    const db = app.get('db')
    db.find_logged_in_user([id]).then(resp => done(null, resp[0]))
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', (req, res, next) => {

    const authCB = passport.authenticate('auth0', {
        successRedirect: process.env.LOGIN
    })
    authCB(req, res, next)
})
app.get('/auth/me', (req, res) => {
    if (!req.user) {
        res.status(404).send('User no longer Logged in')
    } else {
        res.status(200).send(req.user)
    }
})

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect(process.env.LOGOUT)
}
)

//  Frontend Endpoints start here
app.use(bodyParser.json())

app.get("/api/userinfo", userCtrl.getUserInfo)
app.put("/api/user", (req, res, next) => {
    console.log(req.body)
    next()
}, userCtrl.updateUserInfo)
app.put("/api/user/type/:type", userCtrl.updateUserType)

app.get("/api/posts", postsCtrl.readPosts)
app.put("/api/posts", postsCtrl.updatePost)
app.post("/api/posts", postsCtrl.createPost)
app.put("/api/posts/delete", postsCtrl.deletePost)
app.post("/api/posts/filter", postsCtrl.filterPost)
app.post("/api/posts/save", postsCtrl.savedPost)
app.get("/api/posts/save", postsCtrl.getSavedPost)

app.get("/api/comments/:post_id_com", commentsCtrl.readComments)
app.put("/api/comments", commentsCtrl.updateComment)
app.post("/api/comments", commentsCtrl.createComment)
app.delete("/api/comments", commentsCtrl.deleteComment)

app.get("/api/friends", friendsCtrl.readCurrentFriends)
app.get("/api/pendingfriends", friendsCtrl.readPendingFriends)
app.put("/api/newfriends", friendsCtrl.searchNewFriends)
app.put("/api/addfriend", friendsCtrl.createFriendship)
app.put("/api/confirmfriend", friendsCtrl.confirmFriend)
app.put("/api/friend/delete", friendsCtrl.deleteFriend)

// Stripe Payment

app.post('/api/payment', function (req, res, next) {
    //convert amount to pennies
    const amountArray = req.body.amount.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
        if (amountArray[i] === ".") {
            if (typeof amountArray[i + 1] === "string") {
                pennies.push(amountArray[i + 1]);
            } else {
                pennies.push("0");
            }
            if (typeof amountArray[i + 2] === "string") {
                pennies.push(amountArray[i + 2]);
            } else {
                pennies.push("0");
            }
            break;
        } else {
            pennies.push(amountArray[i])
        }
    }
    const convertedAmt = parseInt(pennies.join(''));

    const charge = stripe.charges.create({
        amount: convertedAmt, // amount in cents, again
        currency: 'usd',
        source: req.body.token.id,
        description: 'Test charge from react app'
    }, function (err, charge) {
        if (err) return res.sendStatus(500)
        return res.sendStatus(200);
        // if (err && err.type === 'StripeCardError') {
        //   // The card has been declined
        // }
    });
});

// Socket connections
const server = http.createServer(app),
    io = socket(server)

io.on('connection', function (socket) {
    connections.push(socket);
    console.log(`${socket.id} connected: ${connections.length} active connections.`)

    socket.on('test', function (data) {
        console.log(socket.id)
    })

    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1);
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == socket.id) {
                users.splice(i, 1);
                break;
            }
        }
        console.log(`Connection disconnected: ${connections.length} active connections.`)
        io.sockets.emit('update users', { users: users });
        if (!connections.length) {
            messages = [];
        }
    })

    socket.on('post', function (data) {
        const db = app.get('db')
        db.get_posts(data.user_id)
            .then(posts => {
                socket.emit('get posts', posts)
            }).catch(err => console.log(err))
    })

    socket.on('get comments', function (data) {
        const db = app.get('db'),
            { post_id_com } = data
        // console.log( post_id_com )
        db.get_post_comments(post_id_com)
            .then(comments => {
                // console.log( comments )
                socket.emit(`send comments ${post_id_com}`, comments)
            })
    })

    socket.on('get requests', function (data) {
        const db = app.get('db'),
            { user_id } = data
        console.log(user_id)
        db.get_friend_requests(user_id)
            .then(requests => {
                console.log(requests)
                socket.emit('friend requests', requests)
            })
    })

    socket.on('get friends', function (data) {
        const db = app.get('db'),
            { user_id } = data
        console.log(user_id)
        db.get_friends(user_id)
            .then(currentFriends => {
                console.log(currentFriends)
                socket.emit('current friends', currentFriends)
            })
    })
})

server.listen(SERVER_PORT, () => console.log(`Server listening to port ${SERVER_PORT}`))