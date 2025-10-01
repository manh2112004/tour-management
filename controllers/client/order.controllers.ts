import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";
// [POST] /order
export const order = async (req: Request, res: Response) => {
  const data = req.body;
  //   lưu data vào bảng order
  const dataOrder = {
    code: "",
    fullName: data.info.fullName,
    phone: data.info.phone,
    node: data.info.note,
    status: "initial",
  };
  const order = await Order.create(dataOrder);
  const orderId = order.dataValues.id;
  const code = generateOrderCode(orderId);
  await Order.update(
    {
      code: code,
    },
    {
      where: {
        id: orderId,
      },
    }
  );
  // lưu data vào orderItem
  for (const item of data.cart) {
    const dataItem = {
      orderId: orderId,
      tourId: item.tourId,
      quantity: item.quantity,
    };
    const infoTour = await Tour.findOne({
      raw: true,
      where: {
        id: item.tourId,
        deleted: false,
        status: "active",
      },
    });
    dataItem["price"] = infoTour["price"];
    dataItem["discount"] = infoTour["discount"];
    dataItem["timeStart"] = infoTour["timeStart"];
    await OrderItem.create(dataItem);
  }
  res.json({
    code: 200,
    message: "Đặt hàng thành công",
    orderCode: code,
  });
};
// [GET] /order/success
export const success = async (req: Request, res: Response) => {
  const orderCode = req.query.orderCode;
  const order = await Order.findOne({
    raw: true,
    where: {
      code: orderCode,
      deleted: false,
    },
  });
  console.log(order);
  const ordersItem = await OrderItem.findAll({
    raw: true,
    where: {
      orderId: order["id"],
    },
  });
  console.log(ordersItem);
  for (const item of ordersItem) {
    item["price_special"] = item["price"] * (1 - item["discount"] / 100);
    item["total"] = item["price_special"] * item["quantity"];
    const tourInfo = await Tour.findOne({
      raw: true,
      where: {
        id: item["tourId"],
      },
    });
    item["title"] = tourInfo["title"];
    item["slug"] = tourInfo["slug"];
    item["image"] = JSON.parse(tourInfo["images"])[0];
  }
  order["total_price"] = ordersItem.reduce(
    (sum, item) => sum + item["total"],
    0
  );
  res.render("client/pages/order/success.pug", {
    pageTitle: "Đặt hàng thành công",
    order: order,
    ordersItem: ordersItem,
  });
};
