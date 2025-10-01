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
