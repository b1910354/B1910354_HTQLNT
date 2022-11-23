const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    // stt: {
    //     type: Number,
    //     required: true,
    // },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Grade"
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Children"
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
    }],
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Assignment",
        default: "aaaaaaaaaaaaaaaaaaaaaaaa"
    }
});
module.exports = mongoose.model('Class', classSchema);
