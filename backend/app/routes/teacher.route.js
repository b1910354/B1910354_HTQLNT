const teachers = require('../controllers/teacher.controller');
const express = require('express');
const router = express.Router();

router.route('/')
    .post(teachers.create)
    .get(teachers.findAll)

router.route('/:id')
    .get(teachers.find)
    .delete(teachers.delete)

module.exports = router;