const express = require("express");
const app = express();
const { Session } = require("../models/Session");

//add new session
app.post("/", async(req, res) => {
    const cookies = require('cookie-universal')(req, res);
    const user = cookies.get("user");
    try {
        const newSession = new Session({
            sessionDate: req.body.sessionDate,
            sessionTime: req.body.sessionTime,
            notes: req.body.notes,
            userId: user._id,
            caseId: req.body.caseId,
        });

        await newSession.save();
        res.redirect("/userCases?userId=" + user._id);
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = app;