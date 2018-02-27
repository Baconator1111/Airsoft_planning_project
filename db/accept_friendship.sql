update friends 
set pending = true
where fnd_id = $3;

insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( $1, $2, true );