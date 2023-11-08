const express = require('express');
const cities = require("../controllers/cities.controller.js");
const router = express.Router();

router.post("/", cities.create);

router.get("/", cities.findAll);

router.get("/:id", cities.findOne);

/* router.put("/:id", cities.update);

router.delete("/:id", cities.delete);

router.delete("/", cities.deleteAll); */

module.exports = router;