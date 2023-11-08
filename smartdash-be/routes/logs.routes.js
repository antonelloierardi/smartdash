const express = require('express');
const logs = require("../controllers/logs.controller.js");
const router = express.Router();

// Create a new Log
router.post("/", logs.create);

// Retrieve all Log
router.get("/", logs.findAll);

// Retrieve a single Log with id
router.get("/:id", logs.findOne);

// Update a Log with id
router.put("/:id", logs.update);

// Delete a Log with id
router.delete("/:id", logs.delete);

// delete all
router.delete("/", logs.deleteAll);

module.exports = router;
