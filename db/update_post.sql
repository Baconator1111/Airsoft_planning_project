update posts
set post_title = $3, post_img = $4, post_body = $4
where post_id = $2 and user_id_post = $1