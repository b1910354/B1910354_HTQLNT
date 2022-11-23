const createError = require("http-errors");
const TuitionFees = require("../models/tuition-fees.model");

exports.create = async (req,res, next) =>  {
    const tuitionFees = await TuitionFees.find().exec();
    if(tuitionFees.length) {
        if(Object.keys(req.body) == 0) {
            return next(
                createError(400, "Data to create can not be empty.")
            )
        }

        const tuitionFees = await TuitionFees.find({name: req.body.name}).exec();
        if(tuitionFees.length) {
            return next(
                createError(409, 'Data conflicts')
            );
        }

        try{
            const newTuitionFees = new TuitionFees({
                name: req.body.name
            });
            const document = await newTuitionFees.save();
            return res.send(document);
        }catch(err) {
            return next(
                createError(500, "An error occurred while creating a TuitionFees.")
            )
        }
    }

    try{
        const documents = await TuitionFees.insertMany([
            {
                name: "Tuition"
            },
            {
                name: "Meal fee"
            },
            {
                name: "Surcharges"
            },
        ]);
        return res.send(documents);
    }catch(err) {
        return next(
            createError(500, "An error occurred while creating the TuitionFees.")
        );
    }
}

exports.findAll = async (req, res, next) => {
    try{
        const documents = await TuitionFees.find().populate().exec();
        return res.send(documents);
    }catch(err) {
        return next(
            createError(500, "An error occurred while finding all the TuitionFees.")
        )
    }
}

exports.find = async (req, res, next) => {
    try{
        const document = await TuitionFees.findById({_id: req.params.id}).populate().exec();
        return res.send(document);
    }catch(err) {
        return next(
            createError(500, "An error occurred while finding a TuitionFees.")
        )
    }
}

exports.update = async (req, res, next) => {
    try {
        const document = await TuitionFees.findById({_id: req.params.id}).populate().exec();
        document.name = req.body.name;
        await document.save();
        return res.send(document);
    }catch(err) {
        console(err);
    }
}

exports.delete = async (req, res, next) => {
    try{
        const document = await TuitionFees.deleteOne({_id : req.params.id});
        res.send(document);
    }catch(err) {
        return next(
            createError(500, "An error occurred while deleting a TuitionFees.")
        )
    }
}