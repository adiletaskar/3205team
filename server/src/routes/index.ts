const express = require("express");
const router = express.Router();
const { getByEmailAndNumber, getByEmail } = require("../controllers/index");
router.route("/email/:email").get(getByEmail);
router.route("/find").get(getByEmailAndNumber);

module.exports = router;
