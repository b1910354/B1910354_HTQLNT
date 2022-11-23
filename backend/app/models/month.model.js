const mongoose = require("mongoose");
const monthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    nameDetail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    cdi : [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "CDI"
    }]
});
module.exports = mongoose.model('Month', monthSchema);
