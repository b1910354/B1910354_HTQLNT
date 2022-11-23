const createError = require("http-errors");
const Children = require("../models/children.model");
const Parents = require("../models/parents.model");
const ParentsDetail = require("../models/parent-detail.model");


exports.create = async (req,res, next) =>  {
    // create children
    var newChildren = new Children({
        name: req.body.name,
        gender: req.body.gender,
        dateOfBirth: new Date(req.body.dateOfBirth),
        address: req.body.address,
        parentsDetail: req.body.parentsDetail
    });
    try{
        newChildren = await newChildren.save();
        
        // update parent detail
        const parentsDetail = await ParentsDetail.findById({_id: req.body.parentsDetail});
        parentsDetail.child = newChildren._id;
        await parentsDetail.save();

        return res.send(newChildren);
    }catch(err) {
        return next(
            createError(500, "An error occurred while creating a Children.")
        )
    }
}

exports.findAll = async (req, res, next) => {
    try{
        const documents = await Children.find().populate({
            path: "class",
            populate: {path: "grade", populate: {path: "schoolYear"}}
        }).exec();
        return res.send(documents);
    }catch(err) {
        return next(
            createError(500, "An error occurred while finding all the Children.")
        )
    }
}

exports.find = async (req, res, next) => {
    try{
        const document = await Children.findById({_id: req.params.id}).populate().exec();
        return res.send(document);
    }catch(err) {
        return next(
            createError(500, "An error occurred while finding a Children.")
        )
    }
}

exports.update = async (req, res, next) => {
    try {
        const document = await Children.findById({_id: req.params.id}).populate().exec();
        document.name = req.body.name;
        await document.save();
        return res.send(document);
    }catch(err) {
        console(err);
    }
}

exports.delete = async (req, res, next) => {
    try{
        const children = await Children.findById({_id : req.params.id});
        const document = await Children.deleteOne({_id : req.params.id});
        
        for(var parentsDetail of children.parentsDetail) {
            const parents = await ParentsDetail.findById({_id: parentsDetail});
            await ParentsDetail.deleteOne({_id: parentsDetail});
            await Parents.deleteOne({_id: parents.parents});
        }

        res.send(document);
    }catch(err) {
        return next(
            createError(500, "An error occurred while deleting a Children.")
        )
    }
}
