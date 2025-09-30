import { Request, Response } from "express";
import Category from "../../models/category.model";
// [GET] /categories
export const index = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    where: { deleted: false, status: "active" },
  });
  res.render("client/pages/categories/index.pug", {
    pageTitle: "Danh sách danh mục",
    categories: categories,
  });
};
