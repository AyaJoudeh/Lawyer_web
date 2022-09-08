const mongoose = require("mongoose");


const caseSchema = new mongoose.Schema({
    caseNumber: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },

    caseType: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },

    caseDate: {
        type: Date,
        required: true,
    },

    clientName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },

    clientFeature: {
        type: String,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },

    clientTelephone: {
        type: String,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },

    clientLawyerName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },

    opponentName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },

    opponentFeature: {
        type: String,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },

    opponentTelephone: {
        type: String,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },

    opponentLawyerName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },

    courtName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },

    description: {
        type: String,
        minLength: 0,
        maxLength: 50,
        trim: true,
    },

    files: [{
        type: String,
        default: "",
    }],

    expenses: {
        type: Number,
        default: 0,
    },

    isClosed: {
        type: Boolean,
        default: false,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
    },
}, { timestamps: true });


const Case = mongoose.model("Case", caseSchema);

exports.Case = Case;