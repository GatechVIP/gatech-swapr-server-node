var request = require('supertest');

var url = 'http://localhost:3000/api';

describe('Instructor Creation', function() {
    //test addition of new username
    it ('should allow addition of new username', function(done) {
        var reqBody = {
            'username': 'teacher_new',
            'first_name': 'FIRSTNAME',
            'last_name': 'LASTNAME',
            'email': 'instructor@example.com',
            'password': 'teacher'
        };
        request(url)
            .post('/swaprinstructors')
            .set('Authorization', 'bearer 1234')
            .send(reqBody)
            .expect(201)
            .end(done);
    });
    //test to disallow existing usernames
    it ('should not allow insert of existing username', function(done) {
        var reqBody = {
            'username': 'teacher0',
            'first_name': 'FIRSTNAME',
            'last_name': 'LASTNAME',
            'email': 'instructor2@example.com',
            'password': 'teacher'
        };
        request(url)
            .post('/swaprinstructors')
            .set('Authorization', 'bearer 1234')
            .send(reqBody)
            .expect(201)
            .end(function() {
                request(url)
                    .post('/swaprinstructors')
                    .set('Authorization', 'bearer 1234')
                    .send(reqBody)
                    .expect(400)
                    .end(done);
            });
    });
    //test to ensure a blank username doesn't get inserted
    it ('should not allow insert of blank username', function(done) {
        var reqBody = {
            'username': '',
            'first_name': 'FIRSTNAME',
            'last_name': 'LASTNAME',
            'email': 'blankinstructor@example.com'
        };
        request(url)
            .post('/swaprinstructors')
            .set('Authorization', 'bearer 1234')
            .send(reqBody)
            .expect(400)
            .end(done);
    });

    it ('should not allow invalid characters in username');
    it ('should not allow blank first name');
    it ('should not allow blank last name');
    it ('should not allow invalid characters in first name');
    it ('should not allow invalid characters in last name');
});
