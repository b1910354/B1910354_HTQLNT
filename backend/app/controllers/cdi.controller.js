const error = require('http-errors');
const CDI = require('../models/cdi.model');
const Month = require('../models/month.model');
const Children = require('../models/children.model');
const Classes = require('../models/class.model');

exports.create = async (req, res, next) => {
    if(Object.keys(req.body) == 0) {
        return next(
            error(400, 'Data empty')
        )
    }
    try {
        const document = await new CDI({
            height: req.body.height,
            weight: req.body.weight,
            health: req.body.health,
            numberOfRoses: req.body.numberOfRoses,
            month: req.body.month,
            child: req.body.child,
            class: req.body.class,
        }).save();

        // update month
        const month = await Month.findById({_id: req.body.month});
        month.cdi.push(document._id);
        await month.save();

        // update child
        const child = await Children.findById({_id: req.body.child});
        child.cdi.push(document._id);
        await child.save();

        // update class
        const classes = await Classes.findById({_id: req.body.class});
        classes.cdi.push(document._id);
        await classes.save();
        
        return res.send(document);
    }catch(err) {
        return next(
            error(500, 'error while creating a cdi')
        )
    }
}

exports.findAll = async (req, res, next) => {
    try{
        const documents = await CDI.find().populate("month").populate("child").populate("class");
        return res.send(documents);
    }catch(err) {
        return next(
            error(500, 'error while finding all cdi')
        )
    }
}

exports.update = async(req, res, next) => {
    if(Object.keys(req.body) == 0) {
        return next(
            error(400, 'Data empty')
        )
    }
    
    try {
        const cdi = await CDI.findOne({
            $and : [
                {
                    child: {$in: req.body.child}
                },
                {
                    class: {$in: req.body.class}
                },
                {
                    month: {$in: req.body.month}
                }
            ]
        });
        cdi.height = req.body.height;
        cdi.weight = req.body.weight;
        cdi.health = req.body.health;
        cdi.numberOfRoses = req.body.numberOfRoses;

        await cdi.save();

        return res.send(cdi);
    }catch(err) {
        return next(
            error(500, 'error while updating a cdi')
        )
    }
}