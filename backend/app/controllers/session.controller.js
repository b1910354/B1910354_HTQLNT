const createError = require('http-errors');
const Session = require('../models/session.model');

exports.create = async (req, res, next) => {
    if(Object.keys(req.body) == 0 ) {
        return next(
            createError(400, 'Data not empty')
        );
    }
    try {
        const session = await new Session({
            name: req.body.name,
        }).save();
        return res.send(session);
    } catch(error){
        return next(
            createError(500, 'error creating Session')
        );
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const sessions = await Session.find().populate("meals");
        return res.send(sessions);
    }catch(error) {
        return next(
            createError(500, 'error finding Sessions')
        );
    }
}

exports.delete = async (req, res, next) => {
    try {
        const session = await Session.findByIdAndRemove(req.params.id);
        return res.send(session);
    }catch(error) {
        return next(
            createError(500, 'error deleting Session')
        );
    }

}