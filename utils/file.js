const fs = require("fs");

const deleteFile = (fileLink) => {
  fs.unlink(fileLink, (err) => {
    if (err) {
      throw err;
    }
  });
};

exports.deleteFile = deleteFile;
