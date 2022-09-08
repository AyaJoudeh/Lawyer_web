const express = require("express");
const app = express();
const { Case } = require("../models/Case");
const { User } = require("../models/User");
const { Session } = require("../models/Session");
const { isLoggedIn } = require("../config/auth");

//Create Case
app.post("/", async(req, res) => {
    const ar = [];
    req.files.forEach(function(e) {
        ar.push(e.location);
    });
    const cookies = require('cookie-universal')(req, res);
    const user = cookies.get("user");

    try {
        const newCase = new Case({
            caseNumber: req.body.caseNumber,
            caseType: req.body.caseType,
            caseDate: req.body.caseDate,
            clientName: req.body.clientName,
            clientFeature: req.body.clientFeature,
            clientTelephone: req.body.clientTelephone,
            clientLawyerName: req.body.clientLawyerName,
            opponentName: req.body.opponentName,
            opponentFeature: req.body.opponentFeature,
            opponentTelephone: req.body.opponentTelephone,
            opponentLawyerName: req.body.opponentLawyerName,
            courtName: req.body.courtName,
            description: req.body.description,
            expenses: req.body.expenses,
            isClosed: req.body.isClosed,
            files: ar,
            userId: user._id,
        });

        await newCase.save();

        if (user.isAdmin === true) {
            res.redirect("/addCase");
        } else {
            res.redirect("/addCase-user");
        }

    } catch (err) {
        res.status(500).send(err);
    }
});
//////////////////////////////////////////////////////////////////

//get Case for update
app.get("/updateCase/:id", isLoggedIn, async(req, res) => {
    try {
        const anyCase = await Case.findById(req.params.id);
        const user = await User.findOne({ _id: anyCase.userId });
        res.render('updateCase', { case1: anyCase, user: user });
    } catch (err) {
        res.status(500).send(err);
    }
});

//Update Case
app.post("/updateCase/:id", async(req, res) => {
    const ar = [];
    req.files.forEach(function(e) {
        ar.push(e.location);
    });
    const anyCase = await Case.findById(req.params.id);
    const user = await User.findOne({ _id: anyCase.userId });
    
    try {
        const updatedCase = await Case.updateMany({ _id: req.params.id }, {
            $set: {
                caseNumber: req.body.caseNumber,
                caseType: req.body.caseType,
                caseDate: req.body.caseDate,
                clientName: req.body.clientName,
                clientFeature: req.body.clientFeature,
                clientTelephone: req.body.clientTelephone,
                clientLawyerName: req.body.clientLawyerName,
                opponentName: req.body.opponentName,
                opponentFeature: req.body.opponentFeature,
                opponentTelephone: req.body.opponentTelephone,
                opponentLawyerName: req.body.opponentLawyerName,
                courtName: req.body.courtName,
                description: req.body.description,
                expenses: req.body.expenses,
                files: ar,
            }
        });
        res.redirect("/userCases?userId=" + user._id);
    } catch (err) {
        res.status(500).send(err);
    }
});
////////////////////////////////////////////////////////////

//Delete Case
app.get("/deleteCase/:id", async(req, res) => {
    const anyCase = await Case.findById(req.params.id);
    const user = await User.findOne({ _id: anyCase.userId });
    try {
        await Session.deleteMany({ caseId: anyCase._id });
        await Case.findByIdAndDelete(req.params.id);
        res.redirect("/userCases?userId=" + user._id);
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = app;