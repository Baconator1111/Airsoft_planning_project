module.exports = {
    readPosts: function (req, res) {
        console.log(req.user.user_id)
        const db = req.app.get('db')
        const { user_id } = req.user

        db.get_posts(user_id)
            .then(posts => res.status(200).send(posts))

    },
    createPost: function (req, res) {
        const db = req.app.get('db'),
            { user_id } = req.user,
            { post_title, post_img, post_body } = req.body

        db.create_post([user_id, post_title, post_img, post_body])
            .then(() => res.status(200).send('post created'))
    },
    updatePost: function (req, res) {
        const db = req.app.get('db'),
            { user_id } = req.user,
            { post_id, post_title, post_img, post_body } = req.body

        db.update_post([user_id, post_id, post_title, post_img, post_body])
            .then(() => res.status(200).send('post updated'))
    },
    deletePost: function (req, res) {
        const db = req.app.get('db'),
            { user_id } = req.user,
            { post_id } = req.body

        db.delete_post([user_id, post_id])
            .then(() => res.status(200).send('post deleted'))
    },
    filterPost: function (req, res) {
        const db = req.app.get('db'),
        { user_id } = req.user,
        { post_id } = req.body

        db.add_filtered_post([user_id, post_id])
            .then(() => res.status(200).send('post deleted'))
    },
    savedPost: function (req, res) {
        const db = req.app.get('db'),
        { user_id } = req.user,
        { post_id } = req.body

        db.add_saved_post([user_id, post_id])
            .then(() => res.status(200).send('post deleted'))
    }

}