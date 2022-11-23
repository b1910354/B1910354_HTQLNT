const createError = require('http-errors');
const Classes = require('../models/class.model');
const Grade = require('../models/grade.model');
const Children = require('../models/children.model');
const CDI = require('../models/cdi.model');

exports.create = async (req, res, next) => {
    if(Object.keys(req.body) == 0) {
        return next(
            createError(400, 'Data to create an not be empty.')
        )
    }

    try {
        const document = await new Classes({
            name: req.body.name,
            grade: req.body.grade,
        }).save();

        // update grade
        const grade = await Grade.findById({_id: req.body.grade});
        grade.class.push(document._id);
        await grade.save();

        return res.send(document);
    }catch(err) {
        return next(
            createError(500, 'An error occurred while creating a class')
        )
    }
}

exports.findAll = async (req, res, next) => {
    try{
        const documents = await Classes.find().populate({
            path: "grade",
            populate: {path: "schoolYear"}
        });
        return res.send(documents);
    }catch(err) {
        return next(
            createError(500, 'An error occurred while finding all classes')
        )
    }
}

exports.delete = async (req, res, next) => {
    try {
        
    }catch(err) {
        return next(
            createError(500, 'An error occurred while deleting a class')
        )
    }
}

exports.find = async (req, res, next) => {
    try {
        const document = await Classes.findById(req.params.id).populate({
            path: "grade",
            populate: {path: "schoolYear"}
        }).populate("assignment",).populate("children").populate({
            path: "cdi",
            populate: {path: "month"}
        });
        return res.send(document);
    }catch(error) {
        return next(
            createError(500, 'An error occurred while finding a class')
        )
    }
}

exports.addChild = async (req, res, next) => {
    try {
        const class_s = await Classes.findById(req.params.id);
        class_s.children.push(req.body.child);
        await class_s.save();

        // update children
        const child = await Children.findById(req.body.child);
        child.class.push(req.params.id);
        await child.save();

        return res.send(class_s);
    }catch(err) {
        return next(
            createError(500, 'An error occurred while creating a class')
        )
    }
}

exports.deleteChild = async (req, res, next) => {
    try {
        const class_s = await Classes.findById(req.params.id);
        class_s.children = class_s.children.filter(child => child!= req.body.child);
        await class_s.save();

        // update children
        const child = await Children.findById(req.body.child);
        child.class = child.class.filter(value => value!= req.params.id);
        await child.save();

        // update cdi
        // const cdi = await CDI.findOneAndDelete({child: req.body.child});

        // update cdi of class
        // class_s.cdi = class_s.cdi.filter(value => value != cdi._id);
        // await class_s.cdi.save();

        res.send(cdi);
    }catch(error) {
        return next(
            createError(500, 'An error occurred while deleting a class')
        )
    }
}

