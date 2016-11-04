#!/usr/bin/env node

'use strict';

var mongoose = require('../db/mongoose');
var User = require('../models/user');

//User Persistence
var save_user = function(username, password, role){
    var user = new User({
        username: username,
        password: password,
        role: role
    });

    user.save(function(err) {
        if (err)
            console.log(err);
        else
            console.log({ message: 'New user signed up!', token: user.token });
    });
}

var remove_and_save_user = function(username, password, role){
    if(User.findOne({username: username}, function(err, user) {
            if (!user) {
                console.log({error: 'User with name : ' + username + ' Not found'});
                save_user(username, password, role);
            }
            else {
                user.remove(function (err) {
                    if (!err) {
                        console.log("user with name : " + username + " removed");
                        save_user(username, password, role);
                    }
                })
            }
        }));
}



remove_and_save_user("manager@webandapp.com", "demouser", "manager");

setTimeout(process.exit, process.argv[3] || 3000);
