select user_type, first_name, last_name, user_img
from users 
where user_id in ( select fnd_user_id from friends where user_id_fnd = $1 and pending = true )