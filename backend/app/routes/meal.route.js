const meals = require("../controllers/meal.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(meals.create)
    .get(meals.findAll)

router.route('/:id')
    // .get(meals.find)
    .delete(meals.delete)
    // .put(meals.update)

module.exports = router;