const express = require('express');





const {getEmployee,postEmployee,getOneEmployee,putOneEmployee,delOneEmployee,employeesrch } = require("../controller/controller")

const router = express.Router();

router.route("/").get(getEmployee).post(postEmployee);

router.route("/:id").get(getOneEmployee).put(putOneEmployee).delete(delOneEmployee);


module.exports = router;