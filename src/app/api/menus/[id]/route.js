import { getMenuById, updateMenu } from "@/models/menu";
import { getDataFromForm, handleImageEdit } from "@/utils/backendUtils";

export async function GET(req,{params}){
    const {id} = await params;
    const menu = await getMenuById(id)
    if(!menu){
        return Response.json({message : "Menu Not found"},{status : 400})
    }
    return Response.json(menu)
}

export async function PUT(req,{params}){
    const {id} = await params;
    const menu = await getMenuById(id)
    if(!menu){
        return Response.json({message : "Menu Not found"},{status : 400})
    }
    const formData = await req.formData();
    let {canteen_id,name,quantity,img,price} = getDataFromForm(formData,'canteen_id','name','quantity','img','price');
    if(!canteen_id || !name || !quantity || !img || !price){
        return Response.json({message : "All fields are required"},{status : 400})
    }
    img = await handleImageEdit('menu_img',img,process.env.DEFAULT_MENU_IMAGE_PATH,menu);
    const isok = await updateMenu(id,name,quantity,img,price);
    if(isok){
        return Response.json({message : "Menu Updated Successfully"})
    }
    return Response.json({message : "Can't update Menu"},{status : 500})

}