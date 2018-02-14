module.exports = {
    updateUser: function( req, res ) {
        const db = req.app.get( 'db' )
        db.update_user([  ])
    }
}