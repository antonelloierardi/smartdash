/* const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
  router.delete("/files/:name", controller.remove);

  app.use(router);
};

module.exports = routes; */

const express = require('express');
const file = require("../controllers/file.controller");
const router = express.Router();



router.delete("/:name", file.remove); 

module.exports = router;