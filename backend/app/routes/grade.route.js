const grades = require("../controllers/grade.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(grades.create)
    .get(grades.findAll)

router.route('/:id')
    .get(grades.find)
    .delete(grades.delete)

module.exports = router;