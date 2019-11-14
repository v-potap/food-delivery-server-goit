const mongoose = require("mongoose").set("debug", true);

const connectToDB = dbUrl => {
  mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(mongoBase => {
      console.log("Database connection successful");
      console.log(
        "Collections list: ",
        Object.keys(mongoBase.connection.collections)
      );
      console.log("Models list: ", Object.entries(mongoBase.connection.models));
    })
    .catch(err => {
      console.error("Database connection error");
    });
};

module.exports = connectToDB;
