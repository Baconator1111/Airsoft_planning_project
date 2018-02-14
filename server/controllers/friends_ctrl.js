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
    },
    createFriendship: function( req, res ) {
        const db = req.app.get( 'db' )
    },
    confirmFriend: function( req, res ) {
        const db = req.app.get( 'db' )
    },
    deleteFriend: function( req, res ) {
        const db = req.app.get( 'db' )
    }
}