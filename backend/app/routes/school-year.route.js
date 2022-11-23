const schoolYears = require("../controllers/school-year.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(schoolYears.create)
    .get(schoolYears.findAll)

router.route('/:id')
    .get(schoolYears.find)
    .delete(schoolYears.delete)
    .put(schoolYears.update)

module.exports = router;