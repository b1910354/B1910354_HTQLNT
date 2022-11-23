const createError = require("http-errors");
const Month = require("../models/month.model");

exports.create = async (req,res, next) =>  {
    const month = await Month.find().exec();
    if(month.length) {
        res.send(month);
    }

    try{
        const documents = await Month.insertMany([
            {
                name: "01",
                nameDetail: "january"
            },
            {
                name: "02",
                nameDetail: "February"
            },
            {
                name: "03",
                nameDetail: "March"
            },
            {
                name: "04",
                nameDetail: "April"
            },
            {
                name: "05",
                nameDetail: "May"
            },
            {
                name: "06",
                nameDetail: "June"
            },
            {
                name: "07",
                nameDetail: "July"
            },
            {
                name: "08",
                nameDetail: "August"
            },
            {
                name: "09",
                nameDetail: "September"
            },
            {
                name: "10",
                nameDetail: "October"
            },
            {
                name: "11",
                nameDetail: "November"
            },
            {
                name: "12",
                nameDetail: "December"
            },
        ]);
        return res.send(documents);
    }catch(err) {
        return next(
            createError(500, "An error occurred while creating the Months.")
        );
    }
}

exports.findAll = async (req, res, next) => {
    try{
        const documents = await Month.find().populate().exec();
        return res.send(documents);
    }catch(err) {
        return next(
            createError(500, "An error occurred while finding all the Months.")
        )
    }
}

exports.find = async (req, res, next) => {
    try{
        const document = await Month.findById({_id: req.params.id}).populate().exec();
        return res.send(document);
    }catch(err) {
        return next(
            createError(500, "An error occurred while finding a Month.")
        )
    }
}

exports.update = async (req, res, next) => {
    try {
        const document = await Month.findById({_id: req.params.id}).populate().exec();
        document.name = req.body.name;
        await document.save();
        return res.send(document);
    }catch(err) {
        console(err);
    }
}

exports.delete = async (req, res, next) => {
    try{
        const document = await Month.deleteOne({_id : req.params.id});
        res.send(document);
    }catch(err) {
        return next(
            createError(500, "An error occurred while deleting a Month.")
        )
    }
}