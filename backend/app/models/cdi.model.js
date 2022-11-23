const mongoose = require("mongoose");

const cdiSchema = new mongoose.Schema({
    height: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    weight: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    health: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    numberOfRoses: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    month: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Month"
    },
    child: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Children"
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Class"
    }
});
module.exports = mongoose.model('CDI', cdiSchema);
