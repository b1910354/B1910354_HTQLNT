const createError = require("http-errors");
const Position = require("../models/position.model");

exports.create = async (req,res, next) =>  {
    const positions = await Position.find().exec();
    if(positions.length) {
        if(Object.keys(req.body) == 0) {
            return next(
                createError(400, "Data to create can not be empty.")
            )
        }

        const position = await Position.find({name: req.body.name}).exec();
        if(position.length) {
            return next(
                createError(409, 'Data conflicts')
            );
        }

        try{
            const newPosition = new Position({
                name: req.body.name
            });
            const document = await newPosition.save();
            return res.send(document);
        }catch(err) {
            return next(
                createError(500, "An error occurred while creating a position.")
            )
        }
    }

    try{
        const documents = await Position.insertMany([
            {
                name: "school board"
            },
            {
                name: "system administration"
            },
            {
                name: "child management teacher"
            },
            {
                name: "accounting"
            },
        ]);
        return res.send(documents);
    }catch(err) {
        return next(
            createError(500, "An error occurred while creating the positions.")
        );
    }
}

exports.findAll = async (req, res, next) => {
    try{
        const documents = await Position.find().populate().exec();
        return res.send(documents);
    }catch(err) {
        return next(
            createError(500, "An error occurred while finding all the positions.")
        )
    }
}

exports.find = async (req, res, next) => {
    try{
        const document = await Position.findById({_id: req.params.id}).populate().exec();
        return res.send(document);
    }catch(err) {
        return next(
            createError(500, "An error occurred while finding a position.")
        )
    }
}

exports.update = async (req, res, next) => {
    try {
        const document = await Position.findById({_id: req.params.id}).populate().exec();
        document.name = req.body.name;
        await document.save();
        return res.send(document);
    }catch(err) {
        console(err);
    }
}

exports.delete = async (req, res, next) => {
    try{
        const document = await Position.deleteOne({_id : req.params.id});
        res.send(document);
    }catch(err) {
        return next(
            createError(500, "An error occurred while deleting a position.")
        )
    }
}


