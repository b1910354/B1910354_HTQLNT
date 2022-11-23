const sessions = require("../controllers/assignment.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(sessions.create)
    .get(sessions.findAll)

router.route('/:id')
    // .get(sessions.find)
    // .delete(sessions.delete)
    // .put(sessions.update)

module.exports = router;