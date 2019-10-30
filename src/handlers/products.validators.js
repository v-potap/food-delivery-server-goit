class ProductsValidators {
  static validateProductID(body) {
    const response = {
      status: "",
      products: []
    };

    if (!body) {
      response.status = "Error: invalid request";
      return { errCode: 400, response };
    }

    response.user = JSON.parse(body);

    if (!response.user.username) {
      response.status = "Error: invalid request => 'username' is required";
      return { errCode: 400, response };
    }

    return undefined;
  }
}

module.exports = UsersValidators;
