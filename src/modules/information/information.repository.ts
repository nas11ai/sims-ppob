import pool from '../../config/database';

export const getBanners = async () => {
  const result = await pool.query(
    'SELECT banner_name, banner_image, description FROM banners ORDER BY created_at ASC',
  );
  return result.rows;
};

export const getServices = async () => {
  const result = await pool.query(
    'SELECT service_code, service_name, service_icon, service_tariff FROM services ORDER BY created_at ASC',
  );
  return result.rows;
};
