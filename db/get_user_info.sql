select user_id, user_type, user_name, user_img, first_name, last_name, user_location, user_email 
from users
where user_id = $1