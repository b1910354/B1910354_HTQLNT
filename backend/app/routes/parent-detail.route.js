const parentsDetail = require("../controllers/parents-detail.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(parentsDetail.create)
    .get(parentsDetail.findAll)

router.route('/:id')
    .get(parentsDetail.find)
    .delete(parentsDetail.delete)
//     .put(parentsDetail.update)

module.exports = router;