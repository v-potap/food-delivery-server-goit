const fs = require("fs");
const path = require("path");
const qs = require("querystring");
const UsersValidators = require("../handlers/users.validators");

class UsersController {
  saveUser = (post, user) => {
    // получить файл с юзером
    // найти путь папки users
    // const userFile = path.join(__dirname, "../db/users", user);
    // сохранить туда файл
    // fs.writeFile(userFile, post, err => {
    //   if (err) return "";
    //   return userFile;
    // });
  };

  static signUpUser(req, res) {
    // Взять данные что пришли
    let body = "";

    req.on("data", function(data) {
      body = body + data;

      console.log("Incoming data!!!!");
    });

    req.on("end", function() {
      const err = UsersValidators.validateSignUpUser(body);
      if (err) {
        res.writeHead(err.errCode, err.response.status, {
          "Content-Type": "application/json"
        });
        res.end(JSON.stringify(err.response));
        return;
      }

      const post = Object.keys(qs.parse(body))[0];

      // Взять username с данных, сохранить в переменную
      const { username } = JSON.parse(body);

      // Сохраняем данные в <username>.json
      // Сохранить <username>.json в папку users
      // const savedUser = saveUser(post, username + ".json");
      const userFile = path.join(__dirname, "../db/users", username + ".json");
      fs.writeFileSync(userFile, post);

      if (fs.existsSync(userFile)) {
        fs.readFile(userFile, (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal error!!!");
            return;
          }

          const responseSuccess = {
            status: "success",
            // Отправляем файл в ответе с данными юзера
            user: JSON.parse(data)
          };

          res.writeHead(201, {
            "Content-Type": "application/json"
          });

          // использовать response
          res.end(JSON.stringify(responseSuccess));
        });
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal error!!!");
      }
    });
  }
}

module.exports = UsersController;
