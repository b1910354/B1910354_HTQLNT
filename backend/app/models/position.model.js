const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Teacher"
    }]
});

module.exports = mongoose.model('Position', positionSchema);
