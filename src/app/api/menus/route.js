import { createMenu } from "@/models/menu";
import { getDataFromForm, handleImage } from "@/utils/backendUtils";

export async function POST(req) {
    const formData = await req.formData();
    let { canteen_id, name,quantity, img, price } = getDataFromForm(formData, 'canteen_id', 'name', 'img', 'price');
    if (!canteen_id || !name || !quantity || !price) {
        return Response.json({ message: "Canteen_id and name are required" }, { status: 400 })
    }
    if (img) {
        img = await handleImage('menu_img', img)
    } else {
        img = process.env.DEFAULT_MENU_IMAGE_PATH;
    }
    const isok = await createMenu(canteen_id,name,quantity,img,price);
    if(isok){
        return Response.json({message : "Menu Created Successfully"})
    }
    return Response.json({message : "Can't create Menu"},{status : 500})

}