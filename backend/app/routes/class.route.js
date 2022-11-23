const classes = require("../controllers/class.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(classes.create)
    .get(classes.findAll)

router.route('/:id')
    .get(classes.find)
    .put(classes.deleteChild)
//     .delete(classes.delete)
//     .put(classes.update)
router.route('/:id/add-child')
    .put(classes.addChild)
    
module.exports = router;
