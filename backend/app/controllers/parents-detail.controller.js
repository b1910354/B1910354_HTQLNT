const createError = require("http-errors");
const ParentsDetail = require("../models/parent-detail.model");
const Parents = require("../models/parents.model");
exports.create = async (req,res, next) =>  {
    // create parents detail
    if(Object.keys(req.body) == 0) {
        return next(
            createError(400, "Data to create can not be empty.")
        )
    }
    var newParentsDetail = new ParentsDetail({
        name: req.body.name,
        gender: req.body.gender,
        phone: req.body.phone,
        mail: req.body.mail,
        relationship: req.body.relationship,
        address: req.body.address,
        parents: req.body.parents,
    });
    try {
        newParentsDetail = await newParentsDetail.save();

        // update parents
        const parents = await Parents.findById({_id: newParentsDetail.parents});
        parents.parentsDetail.push(newParentsDetail._id);
        await parents.save();

        return res.send(newParentsDetail);
    }catch(err){
        return next(
            createError(500, "An error occurred while creating a Parents Detail.")
        )
    }
}

exports.findAll = async (req, res, next) =>  {
    try{
        const documents = await ParentsDetail.find().populate("parents");
        return res.send(documents);
    }catch(err) {
        return next(
            createError(500, "An error occurred while finding a Parents Detail.")
        )
    }
}

exports.find = async (req, res, next) =>  {
    try{
        const document = await ParentsDetail.findById({_id: req.body.params}).populate("parents");
        return res.send(document);
    }catch(err) {
        return next(
            createError(500, "An error occurred while finding a Parents Detail.")
        )
    }
}

exports.delete = async (req, res, next) => {
    try {
        const parentsDetail = await ParentsDetail.findById({_id: req.params.id});
        const document = await parentsDetail.deleteOne({_id: req.params.id});

        // update parent
        const parents = await Parents.findById({_id: parentsDetail.parents});
        parents.parentsDetail = parents.parentsDetail.filter(
            (value, index) => {
                return ![value].join("").includes(req.params.id);
            }
        )
        await parents.save();

        return res.send(document);
    }catch(err) {
        return next(
            createError(500, "An error occurred while deleting a Parents Detail.")
        )
    }
}