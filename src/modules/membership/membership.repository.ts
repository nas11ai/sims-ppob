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

export const findUserByEmailSafe = async (email: string) => {
  const result = await pool.query(
    'SELECT id, email, first_name, last_name, profile_image FROM users WHERE email = $1',
    [email],
  );
  return result.rows[0] || null;
};

export const updateUserProfile = async (email: string, firstName: string, lastName: string) => {
  const result = await pool.query(
    `UPDATE users
     SET first_name = $1, last_name = $2, updated_at = NOW()
     WHERE email = $3
     RETURNING id, email, first_name, last_name, profile_image`,
    [firstName, lastName, email],
  );
  return result.rows[0];
};

export const updateUserProfileImage = async (email: string, profileImage: string) => {
  const result = await pool.query(
    `UPDATE users
     SET profile_image = $1, updated_at = NOW()
     WHERE email = $2
     RETURNING id, email, first_name, last_name, profile_image`,
    [profileImage, email],
  );
  return result.rows[0];
};
