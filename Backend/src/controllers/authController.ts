import { Request, Response } from 'express';
import { findUserByUsername, createUser } from '../models/userModels';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'example';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'username and password required' });

  const user = await findUserByUsername(username);
  if (!user) return res.status(401).json({ message: 'invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'invalid credentials' });

  //token con expiración de 5 minutos
  const token = jwt.sign({ sub: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '5m' });
  res.json({ token, expiresIn: 300 });
};

//endpoint para crear usuario con hash
export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) return res.status(400).json({ message: 'username, password and email required' });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const id = await createUser(username, hashed, email);
  res.status(201).json({ id });
};
