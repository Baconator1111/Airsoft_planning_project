module.exports = {
    readCurrentFriends: function (req, res) {
        const db = req.app.get('db'),
            { user_id } = req.user

        db.get_friends(user_id)
            .then(friends => res.status(200).send(friends))
    },
    readPendingFriends: function (req, res) {
        const db = req.app.get('db'),
            { user_id } = req.user

        db.get_friend_requests(user_id)
            .then(friendReq => res.status(200).send(friendReq))
    },
    searchNewFriends: function (req, res) {
        const db = req.app.get('db'),
            { user_id } = req.user
        let { first_name, last_name } = req.body
        if(!first_name && !last_name){
            first_name = null
            last_name = null
        } else if (!last_name) {
            last_name = ''
        }

        console.log(user_id, first_name, last_name)

        db.search_friends([user_id, first_name, last_name])
            .then(friends => res.status(200).send(friends))
    },
    createFriendship: function (req, res) {
        const db = req.app.get('db'),
            { user_id } = req.user,
            { fnd_user_id } = req.body

        db.create_friendship([user_id, fnd_user_id])
            .then(() => res.status(200).send("Friendship Pending"))
    },
    confirmFriend: function (req, res) {
        const db = req.app.get('db'),
            { user_id } = req.user,
            { fnd_user_id, fnd_id } = req.body

        db.accept_friendship([user_id, fnd_user_id, fnd_id])
            .then(() => res.status(200).send("Friend Accepted"))

    },
    deleteFriend: function (req, res) {
        console.log( 'Delete friend hit' )

        const db = req.app.get('db'),
            { user_id } = req.user,
            { fnd_user_id } = req.body
        console.log( req.body )
        console.log( user_id, fnd_user_id )

        db.delete_friendship([user_id, fnd_user_id])
            .then(() => res.status(200).send("Friend Deleted"))
    }
}