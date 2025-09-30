import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";
// [GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
  const slugCategory = req.params.slugCategory;
  console.log(slugCategory);
  const tours = await sequelize.query(
    `
    SELECT tours.*
        FROM tours
        JOIN tours_categories ON tours.id = tours_categories.tour_id
        JOIN categories ON tours_categories.category_id = categories.id
        where 
            categories.slug = '${slugCategory}'
            AND categories.deleted = 0
            AND categories.status = 'active'
            AND tours.deleted = 0
            AND tours.status = 'active'
    `,
    {
      type: QueryTypes.SELECT,
    }
  );
  tours.forEach((item) => {
    if (item["images"]) {
      const images = JSON.parse(item["images"]);
      item["image"] = images[0];
    }
    item["price_special"] = item["price"] * (1 - item["discount"] / 100);
  });
  // select * from tours where deleted=false AND status="active"
  res.render("client/pages/tours/index.pug", {
    pageTitle: "Danh sách tour",
    tours: tours,
  });
};
// [GET] /tours/detail/:slugTour
export const detail = async (req: Request, res: Response) => {
  const slugTour = req.params.slugTour;
  const tourDetail = await Tour.findOne({
    where: { slug: slugTour, deleted: false, status: "active" },
    raw: true,
  });
  if (tourDetail["images"]) {
    tourDetail["images"] = JSON.parse(tourDetail["images"]);
  }
  tourDetail["price_special"] =
    tourDetail["price"] * (1 - tourDetail["discount"] / 100);
  res.render("client/pages/tours/detail.pug", {
    pageTitle: "Chi tiết tour",
    tour: tourDetail,
  });
};
