import { getOrderById } from "@/models/order";
import { getOrderItemsByOrderIdAndCanteenId, updateOrderItemStatus } from "@/models/orderItems";
import { getDataFromForm } from "@/utils/backendUtils";

export async function PUT(req, { params }) {
    const { id: orderId, canteenId } = await params;
    const formData = await req.formData();

    let { status } = getDataFromForm(formData, 'status');

    const order = await getOrderById(orderId);
    if (!order) {
        return Response.json({ message: 'OrderItem Not found' }, { status: 400 })
    }

    const orderItems = await getOrderItemsByOrderIdAndCanteenId(orderId, canteenId);
    for (let i = 0; i < orderItems.length; i++) {
        const isOk = await updateOrderItemStatus(orderItems[i].id, status);
        if (!isOk) {
            return Response.json({ message: "Can't Change OrderItem Status" }, { status: 500 })
        }
    }

    return Response.json({ message: 'Order Status Updated Successfully' })
}
