const responseMessage = require("../utils/response-message");
const httpStatusCode = require("../utils/http-status-code");

class PaymentController {
  constructor(payment) {
    this.payment = payment;
  }

  async getUserPayments(req, res, next) {
    try {
      const result = await this.payment.findByUserId(res.locals.userId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async createPayment(req, res, next) {
    try {
      const data = {
        payment_name: req.body.payment_name,
        user_id: res.locals.userId
      };

      await this.payment.create(data);
      res
        .status(httpStatusCode.CREATED)
        .json({ message: responseMessage.TRANSACTION_CREATED });
    } catch (err) {
      throw err;
    }
  }

  async deletePayment(req, res, next) {
    try {
      const p_id = req.params.p_id;
      await this.payment.deleteById(p_id);
      res
        .status(httpStatusCode.OK)
        .json({ message: responseMessage.TRANSACTION_DELETED });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PaymentController;
