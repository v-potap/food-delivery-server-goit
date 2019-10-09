const qs = require("querystring");

class UsersController {
  static saveUser(user) {
    // получить файл с юзером
    // найти путь папки users
    // сохранить туда файл
  }

  static signUpUser(req, res) {
    // Взять данные что пришли

    if (req.method === "POST") {
      let body = "";

      req.on("data", function(data) {
        body = body + data;

        console.log("Incoming data!!!!");
      });

      request.on("end", function() {
        const post = qs.parse(body);
        console.log(post);
      });
    }

    // Взять username с данных, сохранить в переменную

    // Сохраняем данные в <username>.json

    // Сохранить <username>.json в папку users

    // Отправляем файл в ответе с данными юзера
    // использовать response
  }
}

module.exports = UsersController;
