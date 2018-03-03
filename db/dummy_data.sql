insert into users ( auth_id, user_name, user_img, first_name, last_name, user_location ) values ( 'bacon123', 'LrdBacon', 'baconStrip image', 'Ben', 'Johnson', 'Provo' );
insert into users ( auth_id, user_name, user_img, first_name, last_name, user_location ) values ( 'blueFreak1020', 'BlueFreak', 'BlueShells Image', 'Alli', 'Johnson', 'La-Grande' );
insert into users ( auth_id, user_name, user_img, first_name, last_name, user_location ) values ( 'texas', 'TexasMan', 'TexasHouse image', 'Mike', 'Shannon', 'Austin' );
insert into users ( auth_id, user_name, user_img, first_name, last_name, user_location ) values ( 'mkBase', 'MkBase', 'myBase image', 'Court', 'E', 'Draper' );
insert into users ( auth_id, user_name, user_img, first_name, last_name, user_location ) values ( 'nutForHealth', 'HealthNut', 'pills image', 'Jeff', 'Skidmore', 'Salt-Lake' );

insert into posts ( user_id_posts, post_title, post_img, post_body ) values ( 1, 'Best Bacon', 'searingBacon image', 'This most definetly isthe best way to cook bacon' );
insert into posts ( user_id_posts, post_title, post_img, post_body ) values ( 1, 'Burning Bacon', 'crispyBacon image', 'Everyone really hates burned bacon deep down inside dont deny it' );
insert into posts ( user_id_posts, post_title, post_img, post_body ) values ( 3, 'Texas is the Best', 'millionDolarHouse image', 'Texas has the lowest cost of living in any state so you can own an awesome house' );
insert into posts ( user_id_posts, post_title, post_img, post_body ) values ( 2, 'Blue, the color of Truth', 'blueEyes image', 'Clearly people with blue eyes tell the truth, the internet says so' );
insert into posts ( user_id_posts, post_title, post_img, post_body ) values ( 5, 'Processing, the end of you and me', 'bagOfChips image', 'Through the industrialization of the food industry we all are going to die of nutrition' );
insert into posts ( user_id_posts, post_title, post_img, post_body ) values ( 4, 'Base', 'base image', 'I like my bass, its my precios' );

insert into comments ( user_id_com, post_id_com, com_title, com_body ) values ( 4, 1, 'Nope', 'I like to cook bacon my way' );
insert into comments ( user_id_com, post_id_com, com_title, com_body ) values ( 1, 1, 'Fine', 'Then just go home!' );
insert into comments ( user_id_com, post_id_com, com_title, com_body ) values ( 5, 1, 'Alright', 'Guys lets just not eat bacon, its full of fats and nitrates' );
insert into comments ( user_id_com, post_id_com, com_title, com_body ) values ( 1, 5, 'IDK', 'I fell like Im going to live a long life even with this crap' );
insert into comments ( user_id_com, post_id_com, com_title, com_body ) values ( 5, 5, 'no no no', 'You most definetly will die, its just a matter of time and consumption' );
insert into comments ( user_id_com, post_id_com, com_title, com_body ) values ( 4, 5, 'I agree', 'I agree with myself because im like that' );
insert into comments ( user_id_com, post_id_com, com_title, com_body ) values ( 3, 5, 'I like milk', 'Milk is good for you' );
insert into comments ( user_id_com, post_id_com, com_title, com_body ) values ( 5, 5, 'HA', 'Depeneds on how it was sourced and processed' );
insert into comments ( user_id_com, post_id_com, com_title, com_body ) values ( 1, 2, 'what', '..............' );
insert into comments ( user_id_com, post_id_com, com_title, com_body ) values ( 2, 2, 'JK', 'This post is a troll' );
insert into comments ( user_id_com, post_id_com, com_title, com_body ) values ( 2, 2, 'really', 'You dont really love me do you!' );

insert into filtered_posts ( user_id_filter, post_id_filter ) values ( 2, 1 );
insert into filtered_posts ( user_id_filter, post_id_filter ) values ( 2, 2 );
insert into filtered_posts ( user_id_filter, post_id_filter ) values ( 2, 5 );
insert into filtered_posts ( user_id_filter, post_id_filter ) values ( 2, 6 );
insert into filtered_posts ( user_id_filter, post_id_filter ) values ( 4, 2 );
insert into filtered_posts ( user_id_filter, post_id_filter ) values ( 4, 4 );
insert into filtered_posts ( user_id_filter, post_id_filter ) values ( 5, 2 );
insert into filtered_posts ( user_id_filter, post_id_filter ) values ( 5, 3 );

insert into saved_posts ( user_id_sv, post_id_sv ) values ( 1, 1 );
insert into saved_posts ( user_id_sv, post_id_sv ) values ( 1, 2 );
insert into saved_posts ( user_id_sv, post_id_sv ) values ( 1, 3 );
insert into saved_posts ( user_id_sv, post_id_sv ) values ( 2, 3 );
insert into saved_posts ( user_id_sv, post_id_sv ) values ( 2, 4 );

insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 1, 2, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 2, 1, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 1, 3, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 3, 1, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 1, 4, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 4, 1, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 1, 5, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 5, 1, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 2, 3, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 3, 2, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 3, 4, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 4, 3, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 3, 5, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 5, 3, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 4, 5, true );
insert into friends ( user_id_fnd, fnd_user_id, pending ) values ( 5, 4, true );
insert into friends ( user_id_fnd, fnd_user_id ) values ( 2, 4 );
