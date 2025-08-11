import { Request, Response } from 'express';
import { createcategoriesDb, getcategoriesDb, getcategoriesByIdDb, updatecategoriesDb, softDeletecategoriesDb } from '../models/categoriesModel';

//crear
export const createcategories = async (req: Request, res: Response) => {
  const id = await createcategoriesDb(req.body);
  const categories = await getcategoriesByIdDb(id);
  res.status(201).json(categories);
};

//consultar tdos
export const listcategories = async (req: Request, res: Response) => {
  const categories = await getcategoriesDb();
  res.json(categories);
};

//consultar categories
export const getcategories = async (req: Request, res: Response) => {
  const categories = await getcategoriesByIdDb(Number(req.params.id));
  if (!categories) return res.status(404).json({ message: 'categories not found' });
  res.json(categories);
};

//actualizar categories
export const updatecategories = async (req: Request, res: Response) => {
  await updatecategoriesDb(Number(req.params.id), req.body);
  const categories = await getcategoriesByIdDb(Number(req.params.id));
  res.json(categories);
};

//eliminar prodcuto
export const deletecategories = async (req: Request, res: Response) => {
  await softDeletecategoriesDb(Number(req.params.id));
  res.status(204).send();
};
