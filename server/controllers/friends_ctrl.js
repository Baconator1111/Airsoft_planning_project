module.exports = {
    readCurrentFriends: function( req, res ) {
        const db = req.app.get( 'db' ),
            { user_id } = req.user

        db.get_friends( user_id )
            .then( friends => res.status(200).send( friends ) )        
    },
    searchNewFriends: function( req, res ) {
        const db = req.app.get( 'db' ),
            { user_id } = req.user,
            { first_name, last_name } = req.body
            
        db.search_friends([ user_id, first_name, last_name ])
            .then( friends => res.status(200).send( friends ) )
    },
    createFriendship: function( req, res ) {
        const db = req.app.get( 'db' ),
            { user_id } = req.user,
            { friend_id } = req.body

            db.search_friends([ user_id, friend_id ])
            .then( () => res.status(200).send( "Friendship Pending" ) )
    },
    confirmFriend: function( req, res ) {
        const db = req.app.get( 'db' ),
            { user_id } = req.user,
            { friend_id } = req.body

        db.accept_friendship([ user_id, friend_id ])
            .then( () => res.status(200).send( "Friend Accepted" ) ) 

    },
    deleteFriend: function( req, res ) {
        const db = req.app.get( 'db' ),
            { user_id } = req.user,
            { friend_id } = req.body

        db.delete_friendship([ user_id, friend_id ])
            .then( () => res.status(200).send( "Friend Deleted" ) ) 
    }
}