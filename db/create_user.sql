insert into users ( auth_id, user_name, user_img )
values ( $3, $1, $2 )
returning *