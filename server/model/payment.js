class Payment {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const conn = await this.db.getConnection();
    try {
      const query = "select id as payment_id, payment_name from payment";
      const [rows] = await conn.query(query);

      return rows;
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
  }

  async create(payment_name) {
    const conn = await this.db.getConnection();
    try {
      await conn.beginTransaction();

      const insertPaymentQuery = `INSERT INTO payment
              (payment_name,user_id) 
              VALUES (?, ?)`;

      await conn.query(insertPaymentQuery, [payment_name, 11]);
      await conn.commit();
    } catch (error) {
      conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  // findById() {}
  // removeById() {}
}

module.exports = Payment;
