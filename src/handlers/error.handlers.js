const errorHandler = (err, req, res, next)  => {
    res
      .status(500)
      .send('Error found: ' + err.stack);
  };

  module.exports = errorHandler;