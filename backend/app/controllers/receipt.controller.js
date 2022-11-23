const createError = require('http-errors');
const Receipt = require('../models/receipt.model');
const Class = require('../models/class.model');
const Children = require('../models/children.model');

exports.create = async (req, res, next) => {
    if(Object.keys(req.body) == 0 ) {
        return next(
            createError(400, 'Data not empty')
        );
    }
    try {
        const receipt = await new Receipt({
            name: req.body.name,
            child: req.body.child,
            class: req.body.class
        }).save();
        
        // update child
        const child = await Children.findById(req.body.child);
        child.receipts.push(receipt._id);
        await child.save();
        
        // update class
        const class_s = await Class.findById(req.body.class);
        class_s.receipts.push(receipt._id);
        await class_s.save();

        return res.send(receipt);
    } catch(error){
        return next(
            createError(500, 'error creating receipt')
        );
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const receipts = await Receipt.find().populate("child").populate("class");
        return res.send(receipts);
    }catch(error) {
        return next(
            createError(500, 'error finding receipts')
        );
    }
}

exports.delete = async (req, res, next) => {
    try {
        const Receipt = await Receipt.findByIdAndRemove(req.params.id);

        // delete in session
        const session = await Session.fin
        return res.send(Receipt);
    }catch(error) {
        return next(
            createError(500, 'error deleting Receipt')
        );
    }
}