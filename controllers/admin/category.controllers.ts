import { Request, Response } from "express";
import Category from "../../models/category.model";
// [GET] /admin/categories
export const index = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    raw: true,
    where: {
      deleted: false,
    },
  });
  console.log(categories);
  res.render("admin/pages/categories/index.pug", {
    pageTitle: "Danh mục tour",
    pageActive: "categories",
    categories: categories,
  });
};
