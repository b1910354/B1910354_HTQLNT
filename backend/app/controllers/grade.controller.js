const createError = require("http-errors");
const Grade = require("../models/grade.model");
const SchoolYear = require("../models/school-year.model");
const Diploma = require("../models/diploma.model");

exports.create = async (req, res, next) => {
  if (Object.keys(req.body) == 0) {
    return next(createError(400, "Data to create can not be empty."));
  }

  const grade = await Grade.find({
    $and: [
      {
        name: { $in: req.body.name },
      },
      {
        schoolYear: { $in: req.body.schoolYear },
      },
    ],
  }).exec();

  if (grade.length) {
    return next(createError(409, "Data conflicts"));
  }

  try {
    const newGrade = new Grade({
      name: req.body.name,
      note: req.body.note,
      schoolYear: req.body.schoolYear,
    });
    const document = await newGrade.save();

    // update SchoolYear
    const schoolYear = await SchoolYear.findById({
      _id: req.body.schoolYear,
    }).exec();
    schoolYear.grades.push(document._id);
    await schoolYear.save();

    return res.send(document);
  } catch (err) {
    return next(createError(500, "An error occurred while creating a Grade."));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await Grade.find()
      .populate("schoolYear")
      .populate("class")
      .populate({
        path: "collectionRates",
        populate: { path: "tuitionFees" },
      })
      .exec();
    return res.send(documents);
  } catch (err) {
    console.log(err);
  }
};

exports.find = async (req, res, next) => {
  try {
    const document = await Grade.findById({ _id: req.params.id })
      .populate("schoolYear")
      .populate({
        path: "class",
        populate: {path: "assignment", populate: {path: "teacher"}}
      })
      .populate({
        path: "collectionRates",
        populate: { path: "tuitionFees"},
      })
      .exec();
    return res.send(document);
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const grade = await Grade.findById({ _id: req.params.id }).exec();
    // delete Grade
    const document = await Grade.deleteOne({ _id: req.params.id }).exec();
    // delete Grade in SchoolYear
    const schoolYear = await SchoolYear.findById({
      _id: grade.schoolYear,
    }).exec();
    schoolYear.grades = schoolYear.grades.filter((grade, index) => {
      return ![grade].join("").includes(req.params.id);
    });
    await schoolYear.save();
    // delete Grade in SchoolYear
    // for (var value of grade.schoolYear) {
    // const schoolYear = await SchoolYear.findById({ _id: gra });
    // schoolYear.grades = schoolYear.grades.filter((grade, index) => {
    //   return ![grade].join("").includes(req.params.id);
    // });
    // await schoolYear.save();
    // }

    return res.send(document);
  } catch (error) {
    console.log(error);
  }
};
