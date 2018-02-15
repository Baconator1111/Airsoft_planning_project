update users
set user_img = $2, first_name = $3, last_name = $4, user_location = $5, user_email = $6
where user_id = $1