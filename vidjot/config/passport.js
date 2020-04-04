const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const User = mongoose.model('users');


module.exports = function(passport) {
    passport.use(new localStrategy({
        usernameField: 'email'
    }, (email, password,done) => {
        // console.log(email);
        User.findOne({email: email})
        .then(user => {
            if (!user) {
                return done(null, false, {message: "No User Found!"});
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    done(null, user);
                } else {
                    done(null, false, {message: "Password incorrect!"});
                }
            });
        });
    }));


    passport.serializeUser((user,done)=> {done(null, user.id)});

    passport.deserializeUser((id,done)=>{
        User.findById(id, (err,user)=>{done(err,user)});
    });
};