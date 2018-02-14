select *
from posts 
where post_id not in ( select post_id_filter from filtered_posts where user_id_filter = $1 )