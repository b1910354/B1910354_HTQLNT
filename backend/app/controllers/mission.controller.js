const createError = require('http-errors');
const Mission = require('../models/mission.model');

exports.create = async (req, res, next) => {
    if(Object.keys(req.body) == 0 ) {
        return next(
            createError(400, 'Data not empty')
        );
    }

    try {
        const mission = await new Mission({
            name: req.body.name,
            description: req.body.description,
        }).save();
        return res.send(mission);
    }catch(errors)  {
        return next(
            createError(500, 'error creating mission')
        );
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const missions = await Mission.find();
        return res.send(missions);
    } catch(error){
        return next(
            createError(500, 'errror finding mission')
        );
    };
    
}

exports.delete = async (req, res, next) => {
    try {
        const document = await Mission.deleteOne({_id : req.params.id});
        return res.send(document);
    } catch(error){
        return next(
            createError(500, 'error deleting mission')
        );
    };
}