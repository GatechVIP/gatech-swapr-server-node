var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:'); //create db in memory, volatile!
var exists = false; //TODO: when we write the db to disk, then we need to check if it exists


db.serialize(function(){
  if(!exists){
    //stores student accounts. username, full_name, email are PII, so protect them!
    db.run(
      "CREATE TABLE id_map\
      (id INTEGER PRIMARY KEY,\
      username TEXT UNIQUE ON CONFLICT ROLLBACK NOT NULL ON CONFLICT ROLLBACK,\
      email TEXT NOT NULL ON CONFLICT ROLLBACK UNIQUE ON CONFLICT ROLLBACK,\
      full_name TEXT,\
      pwd_hash TEXT NOT NULL ON CONFLICT ROLLBACK UNIQUE ON CONFLICT ROLLBACK,\
      token TEXT NOT NULL ON CONFLICT ROLLBACK UNIQUE ON CONFLICT ROLLBACK,\
      role_id INTEGER NOT NULL,\
      FOREIGN KEY(role_id) REFERENCES role_map(role_id))"
    );

    db.run(
      "CREATE TABLE role_map\
      (role_id INTEGER NOT NULL,\
      role TEXT NOT NULL)"
    );

    db.run(
      "CREATE TABLE reviews_received\
      (assignment_id INTEGER,\
      author_id INTEGER,\
      URL TEXT,\
      num_reviews INTEGER,\
      FOREIGN KEY(assignment_id) REFERENCES assignment_map(assignment_id),\
      FOREIGN KEY(author_id) REFERENCES id_map(id),\
      FOREIGN KEY(URL) REFERENCES peer_submissions(URL))"
    );

    db.run(
      "CREATE TABLE reviews_pending\
      (assignment_id INTEGER,\
      author_id INTEGER,\
      assigned_rater_id INTEGER,\
      URL TEXT,\
      datetime_assigned DATETIME,\
      datetime_due DATETIME,\
      FOREIGN KEY(assignment_id) REFERENCES assignment_map(assignment_id),\
      FOREIGN KEY(author_id) REFERENCES id_map(id),\
      FOREIGN KEY(URL) REFERENCES peer_submissions(URL))"
    );

    db.run(
      "CREATE TABLE assignment_map\
      (assignment_id INTEGER PRIMARY KEY AUTOINCREMENT,\
      assignment_name TEXT,\
      session_id INTEGER,\
      FOREIGN KEY(session_id) REFERENCES session_map(session_id))"
    );

    db.run(
      "CREATE TABLE peer_submissions\
      (id INTEGER NOT NULL,\
      session_id INTEGER NOT NULL,\
      URL TEXT UNIQUE NOT NULL,\
      FOREIGN KEY(id) REFERENCES id_map(id)\
      constraint unq unique (id, session_id))"
    );

    db.run(
      "CREATE TABLE course_map\
      (course_id INTEGER PRIMARY KEY AUTOINCREMENT,\
      course_name TEXT NOT NULL,\
      institution TEXT NOT NULL,\
      department TEXT NOT NULL)"
    );

    db.run(
      "CREATE TABLE session_map\
      (session_id INTEGER PRIMARY KEY AUTOINCREMENT,\
      course_id INTEGER NOT NULL,\
      semester TEXT NOT NULL,\
      year INTEGER NOT NULL,\
      status TEXT NOT NULL,\
      FOREIGN KEY(course_id) REFERENCES course_map(course_id))"
    );

    db.run(
      "CREATE TABLE instructor_map\
      (instructor_id INTEGER NOT NULL,\
      session_id INTEGER NOT NULL,\
      FOREIGN KEY(instructor_id) REFERENCES id_map(id),\
      FOREIGN KEY(session_id) REFERENCES session_map(session_id)\
      PRIMARY KEY(instructor_id, session_id))"
    );

    db.run(
      "CREATE TABLE session_enrollment\
      (student_id INTEGER NOT NULL,\
      session_id INTEGER NOT NULL,\
      FOREIGN KEY(session_id) REFERENCES session_map(session_id),\
      FOREIGN KEY(student_id) REFERENCES id_map(id),\
      PRIMARY KEY(student_id, session_id))"
    );

    //populate the role_map table
    db.run("INSERT INTO role_map (role_id, role) VALUES (0, 'admin')");
    db.run("INSERT INTO role_map (role_id, role) VALUES (1, 'instructor')");
    db.run("INSERT INTO role_map (role_id, role) VALUES (2, 'student')");
    db.run("INSERT INTO id_map (username, email, full_name, pwd_hash, token, role_id) VALUES ('teacher0', 'adas62@gatech.edu', 'Ayan Das', '329jlasjg;a', '3289rjaksghnasd8', 1)");
    db.run("INSERT INTO id_map (username, email, full_name, pwd_hash, token, role_id) VALUES ('teacher1', 'anjandas@gatech.edu', 'Anjan Das', 'ytkjjkg', 'hlktjfkj', 1)");
    db.run("INSERT INTO id_map (username, email, full_name, pwd_hash, token, role_id) VALUES ('student1', 'ben10@gatech.edu', 'Ben Tennyson', 'as;hetoashjg;', 'akj;leasjgiowaute', 2)");
    db.run("INSERT INTO id_map (username, email, full_name, pwd_hash, token, role_id) VALUES ('student2', 'aduncan37@gatech.edu', 'Austin Duncan', ';asfjd;liasjf;a;', 'hgai;as', 2)");
    db.run("INSERT INTO id_map (username, email, full_name, pwd_hash, token, role_id) VALUES ('student3', 'ajaydeepsingh@gatech.edu', 'Ajay Singh', 'fa;sjf;', '7328901aszafas', 2)");


    console.log("Memory DB set up!");
  }

});

module.exports = db;
