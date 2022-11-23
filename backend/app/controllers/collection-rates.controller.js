const createError = require("http-errors");
const CollectionRates = require("../models/collection-rates.model");
const Grate = require("../models/grade.model");
const TuitionFees = require("../models/tuition-fees.model");

exports.create = async (req, res, next) => {
  if (Object.keys(req.body) == 0) {
    return next(createError(400, "Data to create can not be empty."));
  }

  const collectionRates = await CollectionRates.find({
    $and: [
      {
        grade: { $in: req.body.grade },
      },
      {
        tuitionFees: { $in: req.body.tuitionFees },
      },
    ],
  }).exec();

  if (collectionRates.length) {
    return next(createError(409, "Data conflicts"));
  }

  try {
    const newCollectionRates = new CollectionRates({
      money: req.body.money,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      grade: req.body.grade,
      tuitionFees: req.body.tuitionFees,
    });
    const document = await newCollectionRates.save();

    // update Grate
    const grate = await Grate.findById({
      _id: req.body.grade,
    }).exec();
    grate.collectionRates.push(document._id);
    await grate.save();

    // update TuitionFees
    const tuitionFees = await TuitionFees.findById({
      _id: req.body.tuitionFees,
    }).exec();
    tuitionFees.collectionRates.push(document._id);
    await tuitionFees.save();

    return res.send(document);
  } catch (err) {
    return next(
      createError(500, "An error occurred while creating a CollectionRates.")
    );
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await CollectionRates.find()
      .populate({
        path: "grade",
        populate: { path: "schoolYear" },
      })
      .populate("tuitionFees")
      .exec();
    return res.send(documents);
  } catch (err) {
    console.log(err);
  }
};

exports.find = async (req, res, next) => {
  try {
    const document = await CollectionRates.findById({ _id: req.params.id })
      .populate({
        path: "grade",
        populate: { path: "schoolYear" },
      })
      .populate("tuitionFees")
      .exec();
    return res.send(document);
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const collectionRates = await CollectionRates.findById({
      _id: req.params.id,
    }).exec();

    // delete CollectionRates
    const document = await CollectionRates.deleteOne({
      _id: req.params.id,
    }).exec();

    // delete CollectionRates in Grate
    const grate = await Grate.findById({ _id: collectionRates.grade }).exec();
    grate.collectionRates = grate.collectionRates.filter(
      (collectionRate, index) => {
        return ![collectionRate].join("").includes(req.params.id);
      }
    );
    await grate.save();

    // delete CollectionRates in TuitionFees
    const tuitionFees = await TuitionFees.findById({
      _id: collectionRates.tuitionFees,
    });
    tuitionFees.collectionRates = tuitionFees.collectionRates.filter(
      (collectionRate, index) => {
        return ![collectionRate].join("").includes(req.params.id);
      }
    );
    await tuitionFees.save();

    return res.send(document);
  } catch (error) {
    console.log(error);
  }
};
