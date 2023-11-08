const express = require('express');
const agenda = require("../controllers/agenda.controller.js");
const router = express.Router();


router.post("/", agenda.create);

router.get("/", agenda.findAll);

router.get("/:id", agenda.findOne);

router.put("/:id", agenda.update);

router.delete("/:id", agenda.delete);

router.delete("/", agenda.deleteAll);

module.exports = router;
