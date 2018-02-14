module.exports = {
    readComments: function( req, res ) {
        const db = req.app.get( 'db' ),
            { post_id_com } = req.body

        db.get_post_comments( post_id_com )
            then( comments => res.status(200).send( comments ) )
    },
    createComment: function( req, res ) {
        const db = req.app.get( 'db' ),
            { user_id } = req.user,
            { post_id_com, com_title, com_body } = req.body

        db.create_comments([ user_id, post_id_com, com_title, com_body ])
            .then( ()=> res.status(200).send( 'comment created' ))
    },
    updateComment: function( req, res ) {
        const db = req.app.get( 'db' ),
            { user_id } = req.user,
            { com_title, com_body } = req.body

        db.update_comments([ user_id, post_id_com, com_title, com_body ])
            .then( ()=> res.status(200).send( 'comment updated' ))
    },
    deleteComment: function( req, res ) {
        const db = req.app.get( 'db' ),
            { user_id } = req.user,
            { com_id } = req.body

        db.delete_post_comments([ user_id, com_id ])
            .then( ()=> res.status(200).send( 'comment deleted' ))
    }
}