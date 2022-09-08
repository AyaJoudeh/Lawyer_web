const express = require("express");
const app = express();
const { User } = require("../models/User");
const { Case } = require("../models/Case");
const { Session } = require("../models/Session");
const bcrypt = require("bcrypt");


//get User for update
app.get("/updateUser/:id", async(req, res) => {
    try {
        const lawyer = await User.findById(req.params.id);
        const cookies = require('cookie-universal')(req, res);
        const user = cookies.get("user");
        res.render('updateLawyer', { lawyer: lawyer, user: user });
    } catch (err) {
        res.status(500).send(err);
    }
});

//Update User
app.post("/updateUser/:id", async(req, res) => {
    const body = {...req.body };
    if (body.password) {
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
    }
    try {
        const updatedUser = await User.updateMany({ _id: req.params.id }, {
            $set: {
                username: body.username,
                lawyerName: body.lawyerName,
                email: body.email,
                password: body.password,
                telephoneNumber: body.telephoneNumber,
                isAdmin: body.isAdmin,
            }
        });
        res.redirect("/lawyers");
    } catch (err) {
        res.status(500).send(err);
    }
});

//////////////////////////////////////////////////////

//Delete User
app.get("/deleteUser/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        try {
            await Session.deleteMany({ userId: user._id });
            await Case.deleteMany({ userId: user._id });
            await User.findByIdAndDelete(req.params.id);
            res.redirect("/lawyers");
        } catch (err) {
            res.status(500).send(err);
        }
    } catch (err) {
        res.status(404).send("User not found!");
    }
});



module.exports = app;