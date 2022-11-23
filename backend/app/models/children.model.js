const mongoose = require("mongoose");

const childrenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    gender: {
        type: Boolean,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    parentsDetail: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ParentsDetail"
    }],
    class: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Class"
    }],
    cdi: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "CDI"
    }],
    receipts: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Receipt"
    }]
});
module.exports = mongoose.model('Children', childrenSchema);
