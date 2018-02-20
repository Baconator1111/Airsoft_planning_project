select * 
from saved_posts
join posts on post_id = post_id_sv
join users on user_id = user_id_posts
where user_id_sv = $1
