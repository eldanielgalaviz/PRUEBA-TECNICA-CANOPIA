import pool from '../config/db';

//crear categories
export const createcategoriesDb = async (data: any) => {
  const [res] = await pool.query(
    'INSERT INTO categories (name, description) VALUES (?, ?)',
    [data.name, data.description]
  );
  return (res as any).insertId;
};
//consultar
export const getcategoriesDb = async () => {
  const [rows] = await pool.query('SELECT * FROM categories WHERE status = 1');
  return rows as any[];
};

//consultar por id
export const getcategoriesByIdDb = async (id: number) => {
  const [rows] = await pool.query('SELECT * FROM categories WHERE id = ? AND status = 1', [id]);
  return (rows as any[])[0] || null;
};

//actualizar
export const updatecategoriesDb = async (id: number, data: any) => {
  await pool.query(
  'UPDATE categories SET name = ?, description = ? WHERE id = ?',[data.name, data.description, id]);
};

//eliminar
export const softDeletecategoriesDb = async (id: number) => {
  await pool.query('UPDATE categories SET status = 0 WHERE id = ?', [id]);
};
