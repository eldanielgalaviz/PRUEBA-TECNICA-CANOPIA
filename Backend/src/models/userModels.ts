import pool from '../config/db';

//Buscar por nombre de usuario
export const findUserByUsername = async (username: string) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ? AND status = 1', [username]);
  return (rows as any[])[0] || null;
};

//crear un usuario
export const createUser = async (username: string, hashedPassword: string, email: string, role = 'user') => {
  const [result] = await pool.query('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)', [username, hashedPassword, email, role]);
  return (result as any).insertId;
};
