module.exports = {
    updateUser: function( req, res ) {
        const db = req.app.get( 'db' ),
            { user_id } = req.user,
            { first_name, last_name, location } = req.body

        db.update_user([ user_id, first_name, last_name, location ])
            .then( ()=> res.status(200).send( 'User Updated' ) )
    }
}