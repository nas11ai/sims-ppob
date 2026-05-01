import pool from '../../config/database';

export const getBalanceByEmail = async (email: string) => {
  const result = await pool.query('SELECT balance FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};

export const topupBalance = async (email: string, amount: number, invoiceNumber: string) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const updated = await client.query(
      `UPDATE users
       SET balance = balance + $1, updated_at = NOW()
       WHERE email = $2
       RETURNING balance`,
      [amount, email],
    );

    const user = await client.query('SELECT id FROM users WHERE email = $1', [email]);

    await client.query(
      `INSERT INTO transactions (invoice_number, user_id, transaction_type, description, total_amount)
       VALUES ($1, $2, 'TOPUP', 'Top Up balance', $3)`,
      [invoiceNumber, user.rows[0].id, amount],
    );

    await client.query('COMMIT');
    return updated.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const findServiceByCode = async (serviceCode: string) => {
  const result = await pool.query('SELECT * FROM services WHERE service_code = $1', [serviceCode]);
  return result.rows[0] || null;
};

export const createTransaction = async (
  email: string,
  serviceId: string,
  serviceName: string,
  invoiceNumber: string,
  amount: number,
) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const userResult = await client.query('SELECT id, balance FROM users WHERE email = $1', [
      email,
    ]);

    const user = userResult.rows[0];

    if (Number(user.balance) < amount) {
      throw { statusCode: 400, appStatus: 102, message: 'Saldo tidak mencukupi' };
    }

    const updated = await client.query(
      `UPDATE users
       SET balance = balance - $1, updated_at = NOW()
       WHERE id = $2
       RETURNING balance`,
      [amount, user.id],
    );

    const trxResult = await client.query(
      `INSERT INTO transactions (invoice_number, user_id, service_id, transaction_type, description, total_amount)
       VALUES ($1, $2, $3, 'PAYMENT', $4, $5)
       RETURNING invoice_number, transaction_type, total_amount, created_on`,
      [invoiceNumber, user.id, serviceId, serviceName, amount],
    );

    await client.query('COMMIT');

    return {
      ...trxResult.rows[0],
      balance: Number(updated.rows[0].balance),
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const getTransactionHistory = async (
  email: string,
  offset: number,
  limit: number | null,
) => {
  const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [email]);

  const userId = userResult.rows[0]?.id;
  if (!userId) return [];

  const query =
    limit !== null
      ? `SELECT t.invoice_number, t.transaction_type, t.description, t.total_amount, t.created_on
       FROM transactions t
       WHERE t.user_id = $1
       ORDER BY t.created_on DESC
       LIMIT $2 OFFSET $3`
      : `SELECT t.invoice_number, t.transaction_type, t.description, t.total_amount, t.created_on
       FROM transactions t
       WHERE t.user_id = $1
       ORDER BY t.created_on DESC
       OFFSET $2`;

  const params = limit !== null ? [userId, limit, offset] : [userId, offset];
  const result = await pool.query(query, params);
  return result.rows;
};
