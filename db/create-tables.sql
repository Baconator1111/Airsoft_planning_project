create table users ( 
    user_id serial primary key,
    auth_id text,
    user_type text default 'reg',
    user_name text,
    user_img text,
    first_name varchar(20),
    last_name varchar(20), 
    user_location text
);

create table posts (
    post_id serial primary key,
    user_id_posts int,
    post_title varchar(100),
    post_img text,
    post_body varchar(3000)  
);

create table comments (
    com_id serial primary key,
    user_id_com int,
    post_id_com int,
    com_title varchar(100),
    com_body varchar(3000)  
);

create table friends (
    fnd_id serial primary key,
    user_id_fnd int,
    fnd_user_id int,
    pending boolean default false
);

create table saved_posts (
    sv_id serial primary key,
    user_id_sv int,
    post_id_sv int
);

create table filtered_posts (
    filter_id serial primary key,
    user_id_filter int, 
    post_id_filter int
);