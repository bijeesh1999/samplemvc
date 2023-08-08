const express = require('express');
const {getEmployee,getOneEmployee,putOneEmployee,delOneEmployee} = require("../controller/controller")

const router = express.Router();

router.route("/").get(getEmployee).post();

router.route("/:id").get(getOneEmployee).put(putOneEmployee).delete(delOneEmployee);

module.exports = router;