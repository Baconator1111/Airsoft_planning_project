module.exports = {
    updateUserInfo: function( req, res ) {
        const db = req.app.get( 'db' ),
            { user_id } = req.user,
            { first_name, last_name, location } = req.body

        db.update_user_info([ user_id, first_name, last_name, location ])
            .then( ()=> res.status(200).send( 'User Updated' ) )
    },
    updateUserType: function( req, res ) {
        const db = req.app.get( 'db' ),
            { user_id } = req.user,
            { type } = req.params

        db.update_user_info([ user_id, type ])
            .then( ()=> res.status(200).send( 'User Updated' ) )
    }
}