const fs = require("fs");
const path = require("path");
const util = require("util");
const url = require("url");
const qs = require("querystring");

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

  static getUsersByQuery(req, res) {
    const usersPath = path.join(__dirname, "../db/users", "all-users.json");

    const usersIDs = qs.parse(url.parse(req.url).query)["ids"];
    const users = usersIDs ? usersIDs.split(",") : [];
    const allUsers = JSON.parse(fs.readFileSync(usersPath));

    let filteredUsers = [];

    if (users.length > 0) {
      filteredUsers = allUsers.filter(user => users.includes(user.id + ""));
    } else {
      filteredUsers = [...allUsers];
    }

    if (filteredUsers.length > 0) {
      res.writeHead(200, "OK", {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify({ status: "success", users: filteredUsers }));
    } else {
      res.writeHead(400, "Error: invalid request", {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify({ status: "not found", user: filteredUsers }));
    }

    res.writeHead(200, {
      "Content-Type": "application/json"
    });
  }

  static getUsersByID(req, res) {
    const usersPath = path.join(__dirname, "../db/users", "all-users.json");
    const route = url.parse(req.url).pathname;
    const userID = Number.parseInt(route.slice(1));
    const allUsers = JSON.parse(fs.readFileSync(usersPath));
    const users = allUsers.filter(user => user.id === userID);

    if (users.length > 0) {
      res.writeHead(200, "OK", {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify({ status: "success", users }));
    } else {
      res.writeHead(400, "Error: invalid request", {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify({ status: "no users", users }));
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
