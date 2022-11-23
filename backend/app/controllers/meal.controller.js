const createError = require('http-errors');
const Meal = require('../models/meal.model');
const Session = require('../models/session.model');

exports.create = async (req, res, next) => {
    if(Object.keys(req.body) == 0 ) {
        return next(
            createError(400, 'Data not empty')
        );
    }
    try {
        const meal = await new Meal({
            name: req.body.name,
            session: req.body.session,
        }).save();

        // update session
        const session = await Session.findById(req.body.session);
        session.meals.push(meal._id);
        await session.save();
        
        return res.send(meal);
    } catch(error){
        return next(
            createError(500, 'error creating meal')
        );
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const meals = await Meal.find().populate("session");
        return res.send(meals);
    }catch(error) {
        return next(
            createError(500, 'error finding meals')
        );
    }
}

exports.delete = async (req, res, next) => {
    try {
        const meal = await Meal.findByIdAndRemove(req.params.id);

        // delete in session
        const session = await Session.fin
        return res.send(meal);
    }catch(error) {
        return next(
            createError(500, 'error deleting meal')
        );
    }
}