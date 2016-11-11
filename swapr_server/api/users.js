var db = require('../db/sqliteSetup.js');

function createInstructor(username, email, fullname) {
	//	todo: find the correct id and pwd_hash
	var pwd_hash = 0;
	db.all("INSERT into id_map [(username, email, fullname, role_id)] VALUES ('"+username+"', '"+email+"', '"+fullname+"', 1)", function(err, row) {
        })
}

//create student

//create user
function createUser(username, email, fullname, role_id)
{
	
}
