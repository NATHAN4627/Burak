import { ObjectId } from "mongoose";
import { OrderStatus } from "../enums/order.enum";

export interface OrderItem {
  _id: ObjectId;
  itemQuantity: number;
  itemPrice: number;
  orderId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: ObjectId;
  orderTotal: number;
  orderDelivery: number;
  orderStatus: OrderStatus;
  memberId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItemInput {
  productId: ObjectId;
  itemPrice: number;
  itemQuantity: number;
  orderId?: ObjectId; // bu postman dan kelmaydi, uzimiz hosil etamiz
}
