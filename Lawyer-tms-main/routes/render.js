const express = require("express");
const app = express();
const { User } = require("../models/User")
const { Case } = require("../models/Case");
const { Session } = require("../models/Session");

const { isLoggedIn, isLoggedOut } = require("../config/auth");
const { admin } = require("../config/admin");

//render login page
app.get("/", isLoggedOut, (req, res) => {
    res.render("login");
});
//render addLawyer page
app.get("/addLawyer", [isLoggedIn, admin], (req, res) => {
    const cookies = require('cookie-universal')(req, res);
    const user = cookies.get("user");
    res.render('addLawyer', { user: user });
});
// render lawyers page for admin
app.get("/lawyers", [isLoggedIn, admin], async(req, res) => {
    try {
        const lawyers = await User.find().select("-password");
        const user = req.user;
        const cookies = require('cookie-universal')(req, res);
        cookies.set('user', user);
        res.render("lawyers", { lawyers: lawyers, user: user });
    } catch (err) {
        res.status(500).send(err);
    }
});

// render addCase page for admin

app.get("/addCase", [isLoggedIn, admin], (req, res) => {
    const cookies = require('cookie-universal')(req, res);
    const user = cookies.get("user");
    res.render("addCase", { user: user });
});
// render addCase page for user
app.get("/addCase-user", isLoggedIn, async(req, res) => {
    const cookies = require('cookie-universal')(req, res);
    const user = cookies.get("user");
    res.render("addCase-user", { user: user });
});
//render userCases page for user
app.get("/userCases", isLoggedIn, async(req, res) => {
    const userId = req.query.userId;
    try {
        let cases;
        if (userId) {
            cases = await Case.find({ userId }).sort({ caseDate: -1 });
            const user = await User.findOne({ _id: userId });

            const cookies = require('cookie-universal')(req, res);
            const logUser = cookies.get("user");
            for (let i = 0; i < cases.length; i++) {
                let date = cases[i].caseDate.toISOString().split('T')[0].replaceAll('-', '/');
                date = date.split('/').reverse().join('/');
                cases[i] = {...cases[i]._doc, ... { caseDate: date } };
            }
            res.render("userCases", { cases: cases, user: user, logUser: logUser });
        } else {
            const cookies = require('cookie-universal')(req, res);
            const user = cookies.get("user");
            res.redirect("/userCases?userId=" + user._id);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
//render caseDetails page
app.get("/caseDetails/:id", isLoggedIn, async(req, res) => {
    try {
        const anyCase = await Case.findById(req.params.id);
        const user = await User.findOne({ _id: anyCase.userId });
        const cookies = require('cookie-universal')(req, res);
        const logUser = cookies.get("user");
        res.render("caseDetails", { case1: anyCase, user: user, logUser: logUser });
    } catch (err) {
        res.status(500).send(err);
    }
});
//render closedCases for admin
app.get("/closedCase", [isLoggedIn, admin], async(req, res) => {
    try {
        const cases = await Case.find().sort({ caseDate: -1 });
        const cookies = require('cookie-universal')(req, res);
        const user = cookies.get("user");
        res.render("closedCase", { cases: cases, user: user });
    } catch (err) {
        res.status(500).send(err);
    }
});
//render closeButton for admin
app.get("/closingCase/:id", async(req, res) => {
    try {
        const anyCase = await Case.findByIdAndUpdate(req.params.id, {
            $set: {
                isClosed: true,
            }
        });
        const user = await User.findOne({ _id: anyCase.userId });
        res.redirect("/userCases?userId=" + user._id);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/retrievingCase/:id", async(req, res) => {
    try {
        const anyCase = await Case.findByIdAndUpdate(req.params.id, {
            $set: {
                isClosed: false,
            }
        });
        res.redirect("/closedCase");
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/addSession", isLoggedIn, async(req, res) => {
    const cookies = require('cookie-universal')(req, res);
    const user = cookies.get("user");
    const caseId = req.query.caseId;
    res.render("addSession", { user: user, caseId: caseId });
});

app.get("/userSessions", isLoggedIn, async(req, res) => {
    const userId = req.query.userId;
    try {
        const sessions = await Session.find({ userId }).populate("caseId");
        const user = await User.findOne({ _id: userId });
        res.render("userSessions", { sessions: sessions, user: user });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app;