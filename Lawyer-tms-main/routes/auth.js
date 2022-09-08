const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const { User } = require("../models/User");

const passport = require("passport");

const initializePassport = require("../config/passport-config");
initializePassport(passport);

//User and admin authentication
app.post("/login", passport.authenticate("local", { failureRedirect: "/", failureFlash: true }), (req, res) => {
    try {
        const user = req.user;
        const { password, ...others } = user._doc;
        const cookies = require('cookie-universal')(req, res);
        cookies.set('user', others);

        if (user.isAdmin) {
            res.redirect("/lawyers");
        } else {
            res.redirect("/userCases?userId=" + user._id);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

//User and admin register
app.post("/register", async(req, res) => {
    const body = {...req.body };
    try {
        let user = await User.findOne({ email: body.email });
        if (user) return res.status(400).send("User already registered");

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(body.password, salt);

        const newUser = new User({
            username: body.username,
            lawyerName: body.lawyerName,
            email: body.email,
            password: hashedPass,
            telephoneNumber: body.telephoneNumber,
            isAdmin: body.isAdmin,
            profilePic: req.file.location,
        });

        await newUser.save();
        res.redirect("/addLawyer");
    } catch (err) {
        res.status(500).send(err);
    }
});

//logout 
app.get("/logout", function(req, res) {
    req.logout();
    res.clearCookie("user");
    res.redirect('/');
});


module.exports = app;