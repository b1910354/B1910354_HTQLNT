const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receiptSchema = new Schema({ 
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase:  true,
    },
    implementationDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Boolean,
        default: false,
    },
    totalAmount: {
        type: Number,
        default: 0,
    },
    child: {
        type: Schema.Types.ObjectId,
        ref: 'Children',
        required: true,
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Classes',
        required: true,
    }
});

module.exports = mongoose.model('Receipt', receiptSchema);
