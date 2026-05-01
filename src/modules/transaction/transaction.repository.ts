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
