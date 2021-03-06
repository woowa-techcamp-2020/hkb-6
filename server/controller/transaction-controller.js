const httpStatusCode = require("../utils/http-status-code");
const resMsg = require("../utils/response-message");
const responseMessage = require("../utils/response-message");

class TransactionController {
  constructor(transaction) {
    this.transaction = transaction;
  }

  async createTransaction(req, res, next) {
    try {
      const data = req.body;
      data.user_id = res.locals.userId;

      await this.transaction.create(data);

      res
        .status(httpStatusCode.CREATED)
        .json({ message: responseMessage.TRANSACTION_CREATED });
    } catch (error) {
      next(error);
    }
  }

  async getTransactionByDate(req, res, next) {
    try {
      const data = {
        user_id: res.locals.userId,
        date: req.params.date,
      }

      const transactions = await this.transaction.findByDate(data);
      res.status(httpStatusCode.OK).json(transactions);
    } catch (error) {
      next(error);
    }
  }

  async patchTransaction(req, res, next) {
    try {
      const data = req.body;
      const t_id = req.params.t_id;
    
      await this.transaction.update(data, t_id);

      res
        .status(httpStatusCode.OK)
        .json({ message: resMsg.TRANSACTION_UPDATED });
    } catch (err) {
      next(err);
    }
  }

  async deleteTransaction(req, res, next) {
    try {
      const t_id = req.params.t_id;
      await this.transaction.delete(t_id);
      res
        .status(httpStatusCode.OK)
        .json({ message: resMsg.TRANSACTION_DELETED });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TransactionController;
