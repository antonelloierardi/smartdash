const express = require('express');
const settings = require("../controllers/settings.controller.js");
const router = express.Router();

router.post("/", settings.create);

router.get("/", settings.findAll);

router.get("/:id", settings.findOne);

router.put("/:id", settings.update);

router.delete("/:id", settings.delete);

router.delete("/", settings.deleteAll);

module.exports = router;
