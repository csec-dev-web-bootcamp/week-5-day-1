import express from "express";
import { createCategoryPipe, updateCategoryPipe } from "./categories.pipe";
import {
  createCategory,
  deleteCategory,
  getManyCategories,
  getOneCategory,
  updateCategory,
} from "./categories.service";

const categoriesController = express.Router();

categoriesController.get("/", async (eq, res) => {
  const categories = await getManyCategories();
  return res.json(categories);
});

categoriesController.post("/", createCategoryPipe, async (eq, res) => {
  const data = req.body;
  const category = await createCategory(data);
  return res.json(category);
});

categoriesController.get("/:id", async (eq, res) => {
  const { id } = req.params;
  const category = await getOneCategory(id);
  return res.json(category);
});

categoriesController.put("/:id", updateCategoryPipe, async (eq, res) => {
  const data = req.body;
  const { id } = req.params;
  const category = await updateCategory(id, data);
  return res.json(category);
});

categoriesController.delete("/:id", async (eq, res) => {
  const { id } = req.params;
  const category = await deleteCategory(id);
  return res.json(category);
});

export default categoriesController;
