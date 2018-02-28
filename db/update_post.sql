update posts
set post_title = $3, post_img = $4, post_body = $5
where post_id = $2 and user_id_posts = $1