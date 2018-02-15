select user_name, user_img, post_id, user_id_posts, post_title, post_img, post_body
from posts
join users on user_id = user_id_posts
where post_id not in ( select post_id_filter from filtered_posts where user_id_filter = $1 )