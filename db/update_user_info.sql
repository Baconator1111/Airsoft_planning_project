update users
set first_name = $2, last_name = $3, location = $4
where user_id = $1