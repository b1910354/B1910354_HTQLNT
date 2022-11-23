const createError = require("http-errors");
const Parents = require("../models/parents.model");

exports.create = async (req,res, next) =>  {
    // create parents
    var newParents = new Parents({});
    try {
        newParents = await newParents.save();
        return res.send(newParents);
    }catch(err) {
        return next(
            createError(500, "An error occurred while creating a Parents.")
        )
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const documents = await Parents.find();
        return res.send(documents);
    }catch(err) {
        return next(
            createError(500, "An error occurred while finding all Parents.")
        )
    }
}

