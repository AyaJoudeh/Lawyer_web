const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    sessionDate: {
        type: Date,
        required: true,
        default: Date.now(),
    },

    notes: {
        type: String,
        minLength: 5,
        maxLength: 50,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
    },
    caseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
    }

}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);

exports.Session = Session;