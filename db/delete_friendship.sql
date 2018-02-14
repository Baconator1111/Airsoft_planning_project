delete from friends 
where ( user_id_fnd = $1 and fnd_user_id = $2 )
or ( user_id_fnd = $2 and fnd_user_id = $1 )