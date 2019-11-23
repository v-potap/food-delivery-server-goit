class OrdersValidators {
  static validateNewOrder(body) {
    const response = {
      status: "",
      order: {}
    };

    if (!body) {
      response.status = "Error: invalid request";
      return { errCode: 400, response };
    }

    response.order = body;

    if (!response.order.creator) {
      response.status =
        "Error: invalid request => 'creator (userID)' is required";
      return { errCode: 400, response };
    }

    if (!response.order.deliveryType) {
      response.status = "Error: invalid request => 'deliveryType' is required";
      return { errCode: 400, response };
    }

    if (!response.order.deliveryAdress) {
      response.status =
        "Error: invalid request => 'deliveryAdress' is required";
      return { errCode: 400, response };
    }

    if (
      !response.order.productsList ||
      response.order.productsList.length === 0
    ) {
      response.status =
        "Error: invalid request => 'productsList' is required and should contain at least 1 item";
      return { errCode: 400, response };
    }

    return undefined;
  }
}

module.exports = OrdersValidators;
