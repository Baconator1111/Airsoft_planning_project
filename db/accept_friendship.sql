update friends 
set pending = true
where ( user_id_fnd = $1 and fnd_user_id = $2 )
or ( user_id_fnd = $2 and fnd_user_id = $1 )

insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( $2, $1, true );
