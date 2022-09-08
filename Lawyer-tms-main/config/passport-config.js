// User validation middleware

const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt");
const { User } = require("../models/User");

function initialize(passport) {
    const authenticateUser = (username, password, done) => {
        const user = User.findOne({ username: username }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, { message: "خطأ في اسم المستخدم أو كلمة المرور" });

            bcrypt.compare(password, user.password, (err, res) => {
                if (err) return done(err);
                if (res === false) return done(null, false, { message: "خطأ في اسم المستخدم أو كلمة المرور" });

                return done(null, user);
            });
        });
    }
    passport.use(new LocalStrategy({ usernameField: "username" },
        authenticateUser))
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

module.exports = initialize;