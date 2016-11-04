var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:'); //create db in memory, volatile!
var exists = false; //TODO: when we write the db to disk, then we need to check if it exists

db.serialize(function(){
  if(!exists){
    //stores student accounts. username, full_name, email are PII, so protect them!
    db.run(
      "CREATE TABLE id_map\
      (id TEXT PRIMARY KEY ON CONFLICT ROLLBACK NOT NULL UNIQUE ON CONFLICT ROLLBACK, \
      username TEXT UNIQUE ON CONFLICT ROLLBACK NOT NULL ON CONFLICT ROLLBACK,\
      email TEXT NOT NULL ON CONFLICT ROLLBACK UNIQUE ON CONFLICT ROLLBACK,\
      full_name TEXT,\
      pwd_hash TEXT NOT NULL ON CONFLICT ROLLBACK UNIQUE ON CONFLICT ROLLBACK,\
      token TEXT NOT NULL ON CONFLICT ROLLBACK UNIQUE ON CONFLICT ROLLBACK,\
      role_id INT NOT NULL\
      FOREIGN KEY(role_id) REFERENCES role_map(role_id))"
    );

    db.run(
      "CREATE TABLE role_map\
      (role_id INT NOT NULL AUTOINCREMENT,\
      role TEXT NOT NULL)"
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
      "CREATE TABLE peer_submissions\
      (id text not null, session_id int not null, URL text unique not null,\
      FOREIGN KEY(id) REFERENCES id_map(id)\
      constraint unq unique (id, session_id))"
    );

    db.run(
      "CREATE TABLE course_map\
      (course_id INT PRIMARY KEY AUTOINCREMENT,\
      course_name TEXT NOT NULL,\
      institution TEXT NOT NULL,\
      department TEXT NOT NULL,\
      )"
    );

    db.run(
      "CREATE TABLE session_map\
      (session_id INT PRIMARY KEY AUTOINCREMENT,\
      course_id INT NOT NULL,\
      semester TEXT NOT NULL,\
      year INT NOT NULL,\
      status TEXT NOT NULL,\
      FOREIGN KEY(course_id) REFERENCES course_map(course_id))"
    );

    db.run(
      "CREATE TABLE instructor_map\
      (instructor_id TEXT NOT NULL,\
      session_id INT NOT NULL,\
      FOREIGN KEY(instructor_id) REFERENCES id_map(id),\
      FOREIGN KEY(session_id) REFERENCES session_map(session_id)\
      PRIMARY KEY(instructor_id, session_id))"
    );

    db.run(
      "CREATE TABLE session_enrollment\
      (student_id TEXT NOT NULL,\
      session_id INT NOT NULL,\
      FOREIGN KEY(session_id) REFERENCES session_map(session_id),\
      FOREIGN KEY(student_id) REFERENCES id_map(id),\
      PRIMARY KEY(student_id, session_id))"
    );
  }

  //populate the role_map table
  db.run("INSERT INTO role_map (role_id, role) VALUES (0, 'instructor')");
  db.run("INSERT INTO role_map (role_id, role) VALUES (1, 'student')");

  //Insert some test students
  db.run("INSERT INTO id_map (id, username, email, full_name, pwd_hash, token, role_id) VALUES (1, 'user_1', 'test1@email.com', 'Userman, Joe', '$2a$08$coVk4YsFLJXrU.UVcma6fOUaW73Q/MU2anQF9nA5sD7.ZpqzfgJu2', '', 1)");
  db.run("INSERT INTO id_map (id, username, email, full_name, pwd_hash, token, role_id) VALUES (2, 'user_2', 'test2@email.com', 'Student, Maria', '$2a$08$HQAwqKLRqe6jYraaFVKh1.frSNuERpp0BwFnOQDfwE7I.axP0okMy', '', 1)");
  db.run("INSERT INTO id_map (id, username, email, full_name, pwd_hash, token, role_id) VALUES (3, 'user_3', 'test3@email.com', 'Ipswitch, Isambard', '$2a$08$3V7qSpVpcQuO/k6KTA9GnevUHmvIMpobH6RzQE4M6McP8a7074OoC', '', 1)");
  db.run("INSERT INTO id_map (id, username, email, full_name, pwd_hash, token, role_id) VALUES (4, 'user_4', 'test4@email.com', 'McDonald, Carlotta May', '$2a$08$5sbxZmoWt5krITN8lEeL7OUB5lNkQSFIyRdU6T4/c5aIbSRIGYzgC', '', 1)");

});

module.exports = db;
