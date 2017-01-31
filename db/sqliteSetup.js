var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.cached.Database(':memory:'); //create db in memory, volatile!
var exists = false; //TODO: when we write the db to disk, then we need to check if it exists

db.serialize(function(){
  if(!exists){
    //stores student accounts. username, full_name, email are PII, so protect them!
    db.run(
      "CREATE TABLE id_map\
      (id INTEGER PRIMARY KEY AUTOINCREMENT,\
      username TEXT UNIQUE ON CONFLICT ROLLBACK NOT NULL ON CONFLICT ROLLBACK,\
      email TEXT NOT NULL ON CONFLICT ROLLBACK UNIQUE ON CONFLICT ROLLBACK,\
      full_name TEXT,\
      pwd_hash TEXT NOT NULL ON CONFLICT ROLLBACK UNIQUE ON CONFLICT ROLLBACK,\
      token TEXT NOT NULL ON CONFLICT ROLLBACK UNIQUE ON CONFLICT ROLLBACK,\
      role_id INTEGER NOT NULL,\
      FOREIGN KEY(role_id) REFERENCES role_map(role_id)\
      )"
    );

    db.run(
      "CREATE TABLE role_map\
      (role_id INTEGER PRIMARY KEY AUTOINCREMENT,\
      role TEXT NOT NULL)"
    );

    //NEEDS A PRIMARY KEY
    db.run(
      "CREATE TABLE reviews_received\
      (assignment_id INTEGER,\
      author_id INTEGER,\
      URL TEXT,\
      num_reviews INTEGER,\
      FOREIGN KEY(assignment_id) REFERENCES assignment_map(assignment_id),\
      FOREIGN KEY(author_id) REFERENCES id_map(id),\
      FOREIGN KEY(URL) REFERENCES peer_submissions(URL)\
      )"
    );

    //NEEDS A PRIMARY KEY
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
      FOREIGN KEY(URL) REFERENCES peer_submissions(URL)\
      )"
    );

    db.run(
      "CREATE TABLE assignment_map\
      (assignment_id INTEGER PRIMARY KEY,\
      assignment_name TEXT,\
      session_id INTEGER,\
      FOREIGN KEY(session_id) REFERENCES session_map(session_id)\
      )"
    );

    //NEEDS A PRIMARY KEY
    db.run(
      "CREATE TABLE peer_submissions\
      (id INTEGER NOT NULL,\
      session_id INTEGER NOT NULL,\
      URL TEXT UNIQUE NOT NULL,\
      FOREIGN KEY(id) REFERENCES id_map(id)\
      constraint unq unique (id, session_id)\
      )"
    );

    /* THIS TABLE MAPS ADMIN USERS TO THEIR INSTITUTION AND DEPARTMENT */
    // currently, each admin only belongs to one institution and department
    db.run(
      "CREATE TABLE institution_map\
      (admin_id INTEGER PRIMARY KEY,\
      institution TEXT NOT NULL,\
      department TEXT NOT NULL,\
      FOREIGN KEY(admin_id) REFERENCES id_map(id)\
      )"
    );

    db.run(
      "CREATE TABLE course_map\
      (course_id INTEGER PRIMARY KEY,\
      course_name TEXT NOT NULL\
      )"
    );

    /* THIS TABLE MAPS COURSES TO THE ADMIN THAT CREATED THEM */
    db.run(
      "CREATE TABLE admin_map\
      (admin_id INTEGER NOT NULL,\
      course_id INTEGER NOT NULL,\
      FOREIGN KEY(admin_id) REFERENCES id_map(id),\
      FOREIGN KEY(course_id) REFERENCES course_map(course_id),\
      PRIMARY KEY(admin_id, course_id)\
      )"
    );

    db.run(
      "CREATE TABLE session_map\
      (session_id INTEGER PRIMARY KEY,\
      course_id INTEGER NOT NULL,\
      semester TEXT NOT NULL,\
      year INTEGER NOT NULL,\
      status TEXT NOT NULL,\
      FOREIGN KEY(course_id) REFERENCES course_map(course_id)\
      )"
    );

    /* THIS TABLE MAPS INSTRUCTORS TO THE SESSIONS THEY TEACH */
    db.run(
      "CREATE TABLE instructor_map\
      (instructor_id INTEGER NOT NULL,\
      session_id INTEGER NOT NULL,\
      FOREIGN KEY(instructor_id) REFERENCES id_map(ID),\
      FOREIGN KEY(session_id) REFERENCES session_map(session_id),\
      PRIMARY KEY(instructor_id, session_id)\
      )"
    );

    /* THIS TABLE MAPS STUDENTS TO SESSIONS THEY ARE ENROLLED IN */
    db.run(
      "CREATE TABLE enrollment_map\
      (student_id INTEGER NOT NULL,\
      session_id INTEGER NOT NULL,\
      FOREIGN KEY(student_id) REFERENCES id_map(id),\
      FOREIGN KEY(session_id) REFERENCES session_map(session_id),\
      PRIMARY KEY(student_id, session_id)\
      )"
    );

    //populate the role_map table
    db.run("INSERT INTO role_map (role) VALUES ('root')");        // role_id = 1
    db.run("INSERT INTO role_map (role) VALUES ('admin')");       // role_id = 2
    db.run("INSERT INTO role_map (role) VALUES ('instructor')");  // role_id = 3
    db.run("INSERT INTO role_map (role) VALUES ('student')");     // role_id = 4

    console.log("Database tables created!");
  }

});

module.exports = db;
