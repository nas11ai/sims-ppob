import pool from '../../config/database';

export const findUserByEmail = async (email: string) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};

export const createUser = async (
  email: string,
  firstName: string,
  lastName: string,
  hashedPassword: string,
) => {
  const result = await pool.query(
    `INSERT INTO users (email, first_name, last_name, password)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, first_name, last_name`,
    [email, firstName, lastName, hashedPassword],
  );
  return result.rows[0];
};
