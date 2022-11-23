const createError = require("http-errors");
const Assignment = require("../models/assignment.model");
const Class = require("../models/class.model");
const Teacher = require("../models/teacher.model");
const Mission = require("../models/mission.model");

exports.create = async (req, res, next) => {
  if (Object.keys(req.body) == 0) {
    return res.status(400).json({
      error: "Please fill all the fields!",
    });
  }

  try {
    const assignment = await new Assignment({
      teacher: req.body.teacher,
      class: req.body.class || "aaaaaaaaaaaaaaaaaaaaaaaa",
      mission: req.body.mission,
      note: req.body.note || "no notes",
    }).save();

    // update class
    if (
      req.body.class.length == 24 &&
      req.body.class != "aaaaaaaaaaaaaaaaaaaaaaaa"
    ) {
      const class_s = await Class.findById(req.body.class);
      class_s.assignment = assignment._id;
      await class_s.save();
    }

    // update mission
    const mission = await Mission.findById(req.body.mission);
    mission.assignments.push(assignment._id);
    await mission.save();

    // update teacher
    const teacher = await Teacher.findById(req.body.teacher);
    teacher.assignments.push(assignment._id);
    await teacher.save();

    return res.send(assignment);
  } catch (error) {
    return next(createError(400, error.message));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const assignments = await Assignment.find()
      .populate({
        path: "teacher",
        populate: { path: "position" },
      })
      .populate({
        path: "class",
        populate: { path: "grade", populate: { path: "schoolYear" } },
      })
      .populate("mission");

    return res.send(assignments);
  } catch (error) {
    return next(createError(500, error.message));
  }
};
