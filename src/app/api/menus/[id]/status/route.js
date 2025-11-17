import { getMenuById, updateMenuStatus } from "@/models/menu"
import { getDataFromForm } from "@/utils/backendUtils"

export async function PUT(req, { params }) {
    const { id } = await params;
    const formData = await req.formData();

    let { status } = getDataFromForm(formData, 'status');

    const menu = await getMenuById(id)
    if (!menu) {
        return Response.json({ message: 'Menu Not found' }, { status: 400 })
    }
    const isOk = await updateMenuStatus(id, status);
    if (isOk) {
        return Response.json({ message: 'Menu Status Updated Successfully' })
    }
    return Response.json({ message: "Can't Change Menu Status" }, { status: 500 })
}