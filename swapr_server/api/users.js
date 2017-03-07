var db = require('../db/sqliteSetup.js');
 
 function createUser(username, email, fullname, role_id)
 {
 	//	todo: find the correct pwd_hash
 	var pwd_hash =0;
 	db.all("INSERT into id_map [(username, email, fullname, role_id)] VALUES ('"+username+"', '"+email+"', '"+fullname+"', "+role_id+")", function(err, row) {
 		println(err);
         });
 }

 function createInstructor(username, email, fullname) {
 	createUser(username, email, fullname, 1);
 }

 function createStudent(username, email, fullname) {
 	createUser(username, email, fullname, 0);
 }

 function testFunc()
 {
 	console.log("testFunc Called");
 }