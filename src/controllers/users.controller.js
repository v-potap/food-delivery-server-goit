const url = require("url");

const User = require("../modules/db/schemas/user");
const UsersValidators = require("../handlers/users.validators");

class UsersController {
  static async signUpUser(req, res) {
    const user = req.body;
    const err = UsersValidators.validateSignUpUser(user);

    if (err) {
      res.writeHead(err.errCode, err.response.status, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(err.response));
      return;
    }

    const newUser = await User.create(user);

    const responseSuccess = {
      status: "success",
      user: newUser
    };

    res.writeHead(201, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify(responseSuccess));
  }

  static async getUsersByID(req, res) {
    const route = url.parse(req.url).pathname;
    const userID = route.slice(1);

    try {
      const user = await User.findById(userID);

      const responseSuccess = {
        status: "success",
        user
      };

      res.writeHead(201, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify(responseSuccess));
    } catch (err) {
      res.writeHead(400, "Invalid request", {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(err.message));
      return;
    }
  }

  static async updateUserByID(req, res) {
    const route = url.parse(req.url).pathname;
    const userID = route.slice(1);
    const user = req.body;

    try {
      const newUser = await User.findByIdAndUpdate(userID, user, { new: true });

      const responseSuccess = {
        status: "success",
        user: newUser
      };

      res.writeHead(201, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify(responseSuccess));
    } catch (err) {
      res.writeHead(400, "Invalid request", {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(err.message));
      return;
    }
  }
}

module.exports = UsersController;
