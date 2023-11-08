const express = require('express');
const sidebars = require("../controllers/sidebars.controller.js");
const router = express.Router();

router.post("/", sidebars.create);

router.get("/", sidebars.findAll);

router.get("/:id", sidebars.findOne);

router.put("/:id", sidebars.update);

router.delete("/:id", sidebars.delete);

router.delete("/", sidebars.deleteAll);

module.exports = router;
