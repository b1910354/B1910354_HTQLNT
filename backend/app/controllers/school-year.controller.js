const createError = require("http-errors");
const SchoolYear = require("../models/school-year.model");

exports.create = async (req,res, next) =>  {
    if(Object.keys(req.body) == 0) {
        return next(
            createError(400, "Data to create can not be empty.")
        )
    }

    const schoolYear = await SchoolYear.find({name: req.body.name}).exec();
    if(schoolYear.length) {
        return next(
            createError(409, 'Data conflicts')
        );
    }

    try{
        const newSchoolYear = new SchoolYear({
            name: req.body.name
        });
        const document = await newSchoolYear.save();
        return res.send(document);
    }catch(err) {
        return next(
            createError(500, "An error occurred while creating a SchoolYear.")
        )
    }
}

exports.findAll = async (req, res, next) => {
    try{
        const documents = await SchoolYear.find().populate("grades").exec();
        return res.send(documents);
    }catch(err) {
        return next(
            createError(500, "An error occurred while finding all the SchoolYears.")
        )
    }
}

exports.find = async (req, res, next) => {
    try{
        const document = await SchoolYear.findById({_id: req.params.id}).populate().exec();
        return res.send(document);
    }catch(err) {
        return next(
            createError(500, "An error occurred while finding a SchoolYear.")
        )
    }
}

exports.update = async (req, res, next) => {
    try {
        const document = await SchoolYear.findById({_id: req.params.id}).populate().exec();
        document.name = req.body.name;
        await document.save();
        return res.send(document);
    }catch(err) {
        console(err);
    }
}

exports.delete = async (req, res, next) => {
    try{
        const document = await SchoolYear.deleteOne({_id : req.params.id});
        res.send(document);
    }catch(err) {
        return next(
            createError(500, "An error occurred while deleting a SchoolYear.")
        )
    }
}