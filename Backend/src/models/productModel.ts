import pool from '../config/db';

//crear producto
export const createProductDb = async (data: any) => {
  const [res] = await pool.query(
    'INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)',
    [data.name, data.description || null, data.price, data.stock ?? 0, data.category_id ?? null]
  );
  return (res as any).insertId;
};
//consultar
export const getProductsDb = async () => {
  const [rows] = await pool.query('SELECT * FROM products WHERE status = 1');
  return rows as any[];
};

//consultar por id
export const getProductByIdDb = async (id: number) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ? AND status = 1', [id]);
  return (rows as any[])[0] || null;
};

//actualizar
export const updateProductDb = async (id: number, data: any) => {
  await pool.query('UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?', [data.name, data.description, data.price, data.stock, data.category_id, id]);
};

//eliminar
export const softDeleteProductDb = async (id: number) => {
  await pool.query('UPDATE products SET status = 0 WHERE id = ?', [id]);
};
