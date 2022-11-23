const createError = require("http-errors");
const Diploma = require("../models/diploma.model");

exports.create = async (req, res, next) => {
  const diplomas = await Diploma.find().exec();
  if (diplomas.length) {
    if (Object.keys(req.body) == 0) {
      return next(createError(400, "Data to create can not be empty."));
    }

    const diploma = await Diploma.find({ name: req.body.name }).exec();
    if (diploma.length) {
      return next(createError(409, "Data conflicts"));
    }

    try {
      const newDiploma = new Diploma({
        name: req.body.name,
      });
      const document = await newDiploma.save();
      return res.send(document);
    } catch (err) {
      return next(
        createError(500, "An error occurred while creating a diploma.")
      );
    }
  }

  try {
    const documents = await Diploma.insertMany([
      { name: "diploma of intermediate pedagogy of early childhood education" },
      { name: "diploma in early childhood education college" },
      { name: "diploma of university of early childhood education" },
      { name: "level 1 foreign language certificate" },
      { name: "level 2 foreign language certificate" },
      { name: "level 3 foreign language certificate" },
      { name: "level 4 foreign language certificate" },
      { name: "certificate in basic informatics" },
    ]);
    return res.send(documents);
  } catch (err) {
    return next(
      createError(500, "An error occurred while creating the diplomas.")
    );
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await Diploma.find().populate().exec();
    return res.send(documents);
  } catch (err) {
    return next(
      createError(500, "An error occurred while finding all the diplomas.")
    );
  }
};

exports.find = async (req, res, next) => {
  try {
    const document = await Diploma.findById({ _id: req.params.id })
      .populate()
      .exec();
    return res.send(document);
  } catch (err) {
    return next(createError(500, "An error occurred while finding a diploma."));
  }
};

exports.update = async (req, res, next) => {
  try {
    const document = await Diploma.findById({ _id: req.params.id })
      .populate()
      .exec();
    document.name = req.body.name;
    document.save();
    return res.send(document);
  } catch (err) {
    console.log(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const document = await Diploma.deleteOne({ _id: req.params.id });
    return res.send(document);
  } catch (err) {
    console.log(err);
  }
};
