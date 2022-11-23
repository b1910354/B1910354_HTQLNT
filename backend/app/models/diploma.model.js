const mongoose = require("mongoose");

const diplomaSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
    },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Teacher"
    }]
});

module.exports = mongoose.model('Diploma', diplomaSchema);
