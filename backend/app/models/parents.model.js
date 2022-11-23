const mongoose = require("mongoose");

const parentsSchema = new mongoose.Schema({
    parentsDetail: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "ParentsDetail"
    }]
});

module.exports = mongoose.model('Parents', parentsSchema);
