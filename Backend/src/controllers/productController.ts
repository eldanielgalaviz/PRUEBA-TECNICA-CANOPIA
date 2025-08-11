import { Request, Response } from 'express';
import { createProductDb, getProductsDb, getProductByIdDb, updateProductDb, softDeleteProductDb } from '../models/productModel';

//crear
export const createProduct = async (req: Request, res: Response) => {
  const id = await createProductDb(req.body);
  const product = await getProductByIdDb(id);
  res.status(201).json(product);
};

//consultar tdos
export const listProducts = async (req: Request, res: Response) => {
  const products = await getProductsDb();
  res.json(products);
};

//consultar producto
export const getProduct = async (req: Request, res: Response) => {
  const product = await getProductByIdDb(Number(req.params.id));
  if (!product) return res.status(404).json({ message: 'product not found' });
  res.json(product);
};

//actualizar producto
export const updateProduct = async (req: Request, res: Response) => {
  await updateProductDb(Number(req.params.id), req.body);
  const product = await getProductByIdDb(Number(req.params.id));
  res.json(product);
};

//eliminar prodcuto
export const deleteProduct = async (req: Request, res: Response) => {
  await softDeleteProductDb(Number(req.params.id));
  res.status(204).send();
};
