select * 
from saved_posts
join posts on post_id = post_id_sv
where user_id_sv = $1
