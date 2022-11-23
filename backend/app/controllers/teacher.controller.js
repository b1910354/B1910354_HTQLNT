const createError = require("http-errors");
const Teacher = require("../models/teacher.model");
const Position = require("../models/position.model");
const Diploma = require("../models/diploma.model");

exports.create = async (req, res, next) => {
  if (Object.keys(req.body) == 0) {
    return next(createError(400, "Data to create can not be empty."));
  }

  const teacher = await Teacher.find({
    $and: [
      {
        phone: { $in: req.body.phone },
      },
      {
        mail: { $in: req.body.mail },
      },
    ],
  }).exec();
  if (teacher.length) {
    return next(createError(409, "Data conflicts"));
  }

  try {
    const newTeacher = new Teacher({
      name: req.body.name,
      gender: req.body.gender,
      dateOfBirth: new Date(req.body.dateOfBirth),
      phone: req.body.phone,
      mail: req.body.mail,
      position: req.body.position,
      diplomas: req.body.diploma,
    });
    const document = await newTeacher.save();

    // update position
    const position = await Position.findById({
      _id: req.body.position,
    }).exec();
    position.teachers.push(document._id);
    await position.save();
    
    // update diploma
    const diploma = await Diploma.findById({ _id: req.body.diploma }).exec();
    diploma.teachers.push(document._id);
    await diploma.save();

    return res.send(document);
  } catch (err) {
    return next(
      createError(500, "An error occurred while creating a Teacher.")
    );
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await Teacher.find()
      .populate("position")
      .populate("diplomas")
      .exec();
    return res.send(documents);
  } catch (err) {
    console.log(err);
  }
};

exports.find = async (req, res, next) => {
  try {
    const document = await Teacher.findById({ _id: req.params.id })
      .populate("position")
      .populate("diplomas")
      .exec();
    return res.send(document);
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById({ _id: req.params.id }).exec();
    // delete teacher
    const document = await Teacher.deleteOne({ _id: req.params.id }).exec();
    // delete teacher in position
    const position = await Position.findById({ _id: teacher.position }).exec();
    position.teachers = position.teachers.filter((teacher, index) => {
      return ![teacher].join("").includes(req.params.id);
    });
    await position.save();
    // delete teacher in diploma
    console.log(teacher);
    console.log(teacher.diplomas);
    for (var value of teacher.diplomas) {
      const diploma = await Diploma.findById({ _id: value });
      diploma.teachers = diploma.teachers.filter((teacher, index) => {
        return ![teacher].join("").includes(req.params.id);
      });
      await diploma.save();
    }

    return res.send(document);
  } catch (error) {
    console.log(error);
  }
};
