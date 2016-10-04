var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:'); //create db in memory, volatile!
var exists = false //TODO: when we write the db to disk, then we need to check if it exists

db.serialize(function(){
    if(!exists){
        //stores student accounts. usernam, full_name, email are PII, so protect them!
        db.run(
            "CREATE TABLE id_map \
            (id TEXT PRIMARY KEY ON CONFLICT ROLLBACK NOT NULL UNIQUE ON CONFLICT ROLLBACK, \
            username TEXT UNIQUE ON CONFLICT ROLLBACK NOT NULL ON CONFLICT ROLLBACK,\
            email TEXT NOT NULL ON CONFLICT ROLLBACK UNIQUE ON CONFLICT ROLLBACK,\
            full_name TEXT,\
            pwd_hash TEXT NOT NULL ON CONFLICT ROLLBACK UNIQUE ON CONFLICT ROLLBACK,\
            pwd_salt TEXT NOT NULL ON CONFLICT ROLLBACK UNIQUE ON CONFLICT ROLLBACK,\
            token TEXT NOT NULL ON CONFLICT ROLLBACK UNIQUE ON CONFLICT ROLLBACK)"
            );

        db.run(
            "CREATE TABLE reviews_received\
            (assignment_id, author_id, URL, num_reviews int,\
            FOREIGN KEY(assignment_id) REFERENCES assignment_map(assignment_id),\
            FOREIGN KEY(author_id) REFERENCES id_map(id),\
            FOREIGN KEY(URL) REFERENCES peer_submissions(URL))"
            );

        db.run(
            "CREATE TABLE reviews_pending\
            (assignment_id, author_id, assigned_rater_id, URL, datetime_assigned datetime, datetime_due datetime,\
            FOREIGN KEY(assignment_id) REFERENCES assignment_map(assignment_id),\
            FOREIGN KEY(author_id) REFERENCES id_map(id),\
            FOREIGN KEY(URL) REFERENCES peer_submissions(URL))"
            );

        db.run(
            "CREATE TABLE assignment_map\
            (assignment_id int primary key, assignment_name text, session_id int,\
            FOREIGN KEY(session_id) REFERENCES session_map(session_id))"
            );

        db.run(
            "CREATE TABLE session_map\
            (session_id int primary key, course_id int, session_name text,\
            FOREIGN KEY(course_id) REFERENCES course_map(course_id))"
            );

        db.run(
            "CREATE TABLE course_map\
            (course_id int primary key, course_name text, department text, institution text)"
            );

        db.run(
            "CREATE TABLE peer_submissions\
            (id text not null, session_id int not null, URL text unique not null,\
            FOREIGN KEY(id) REFERENCES id_map(id)\
            constraint unq unique (id, session_id))"
            );
        db.run(
            "CREATE TABLE instructor\
            (id text not null, course_id int not null, URL text unique not null,\
            FOREIGN KEY(id) REFERENCES id_map(id)"
            );
    }

    //Insert some test students
    db.run("INSERT INTO id_map (id, username, email, full_name, pwd_hash, pwd_salt, token) VALUES (1, 'user_1', 'test1@email.com', 'Userman, Joe', 'skJH9d89h', 'sl88d9','reirnb')");
    db.run("INSERT INTO id_map (id, username, email, full_name, pwd_hash, pwd_salt, token) VALUES (2, 'user_2', 'test2@email.com', 'Student, Maria', 'q3gqefg', 'j7jwtsdf','xcgfqg3r')");
    db.run("INSERT INTO id_map (id, username, email, full_name, pwd_hash, pwd_salt, token) VALUES (3, 'user_3', 'test3@email.com', 'Ipswitch, Isambard', 'aa35tn', 'qrwefag','3gtw3')");
    db.run("INSERT INTO id_map (id, username, email, full_name, pwd_hash, pwd_salt, token) VALUES (4, 'user_4', 'test4@email.com', 'McDonald, Carlotta May', '23grwhtsa', 'f23q5th','fdgsfdafg')");

});

module.exports = db;
