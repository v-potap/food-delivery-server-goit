class UsersValidators {
  static validateSignUpUser(body) {
    const response = {
      status: "",
      user: {}
    };

    if (!body) {
      response.status = "Error: invalid request";
      return { errCode: 400, response };
    }

    response.user = body;

    if (!response.user.username) {
        response.status="Error: invalid request => 'username' is required"
        return { errCode: 400, response };
      }

    return undefined;
  }
}

module.exports = UsersValidators;
