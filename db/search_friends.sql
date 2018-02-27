select user_id, user_type, first_name, last_name, user_img
from users 
where user_id not in ( select fnd_user_id from friends where user_id_fnd = $1 and pending = true ) 
and user_id != $1
and (first_name like $2 and last_name ~* $3)
order by first_name 

-- assign $3 to (/w+) if null
-- db.search_friends( [ user_id, 'John', lastName || '/w+' ] )