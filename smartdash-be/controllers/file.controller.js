const fs = require("fs");
//global.__basedir = __dirname;
exports.remove = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = "../smartdash-fe/src/assets/images/profiles/";

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      message: "File is deleted.",
    });
  });
};

exports.removeSync = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = "../smartdash-fe/src/assets/images/profiles/";

  try {
    fs.unlinkSync(directoryPath + fileName);

    res.status(200).send({
      message: "File is deleted.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete the file. " + err,
    });
  }
};