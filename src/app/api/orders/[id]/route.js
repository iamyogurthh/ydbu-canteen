import { deleteOrderById } from "@/models/order";

export async function DELETE(request, { params }) {
    const { id } = await params;
    const isok = await deleteOrderById(id);
    if (isok) {
        return Response.json({message : "Successfully deleted"});
    }
    return Response.json({ message: "Can't Delete Order " }, { status: 400 });
}



