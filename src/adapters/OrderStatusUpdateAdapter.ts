import { IOrderStatusUpdate } from "@/models/OrderStatusUpdate";

export const adaptOrderStatusUpdateData = (orderStatusUpdate: IOrderStatusUpdate): IOrderStatusUpdate => {
    return {
        id: orderStatusUpdate.id,
        estatus: orderStatusUpdate.estatus,
    };
}