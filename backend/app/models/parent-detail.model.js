const mongoose = require("mongoose");

const parentsDetailSchema = new mongoose.Schema({
    parents: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Parents"
    },
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
    phone: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    mail: {
        type: String,
        required: false,
        lowercase: true,
        trim: true,
    },
    relationship: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    child: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Children",
        default: "aaaaaaaaaaaaaaaaaaaaaaaa"
    }
});
module.exports = mongoose.model('ParentDetail', parentsDetailSchema);
