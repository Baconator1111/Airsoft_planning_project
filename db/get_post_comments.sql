select user_name, user_img, com_id, com_title, com_body
from comments 
join users on user_id = user_id_com
where post_id_com = $1