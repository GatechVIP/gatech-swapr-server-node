var db = require('../db/sqliteSetup');

db.run("INSERT INTO id_map (id, username, email, full_name, pwd_hash, token, role_id) VALUES (1, 'user_1', 'test1@email.com', 'Userman, Joe', '$2a$08$coVk4YsFLJXrU.UVcma6fOUaW73Q/MU2anQF9nA5sD7.ZpqzfgJu2', '', 1)");
db.run("INSERT INTO id_map (id, username, email, full_name, pwd_hash, token, role_id) VALUES (2, 'user_2', 'test2@email.com', 'Student, Maria', '$2a$08$HQAwqKLRqe6jYraaFVKh1.frSNuERpp0BwFnOQDfwE7I.axP0okMy', '', 1)");
db.run("INSERT INTO id_map (id, username, email, full_name, pwd_hash, token, role_id) VALUES (3, 'user_3', 'test3@email.com', 'Ipswitch, Isambard', '$2a$08$3V7qSpVpcQuO/k6KTA9GnevUHmvIMpobH6RzQE4M6McP8a7074OoC', '', 1)");
db.run("INSERT INTO id_map (id, username, email, full_name, pwd_hash, token, role_id) VALUES (4, 'user_4', 'test4@email.com', 'McDonald, Carlotta May', '$2a$08$5sbxZmoWt5krITN8lEeL7OUB5lNkQSFIyRdU6T4/c5aIbSRIGYzgC', '', 1)");

