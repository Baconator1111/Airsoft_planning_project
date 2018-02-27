select fnd_id, user_id, user_type, first_name, last_name, user_img
from users 
join friends on user_id = user_id_fnd 
where fnd_user_id = $1
and pending = false
