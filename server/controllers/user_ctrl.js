module.exports = {
    getUserInfo: function( req, res ) {
        const db = req.app.get( 'db' ),
            { user_id } = req.user
        
        db.get_user_info( user_id )
            .then( userInfo => res.status(200).send( userInfo[0] ) ) 
                .catch( error => console.log( error ) )   
    },
    updateUserInfo: function( req, res ) {
        console.log( req.body )
        const db = req.app.get( 'db' ),
            { user_id } = req.user,
            { user_img, first_name, last_name, user_location, user_email } = req.body
        

        db.update_user_info([ user_id, user_img, first_name, last_name, user_location, user_email ])
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