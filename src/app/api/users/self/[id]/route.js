import { getUserById, updateUser } from "@/models/user";
import { getDataFromForm, handleImageEdit } from "@/utils/backendUtils";

export async function GET(req,{params}){
    const { id } = await params;
    const user = await getUserById(id);
    if (!user) {
        return Response.json({ message: "Can't find User " }, { status: 404 });
    }
    return Response.json(user);
}

export async function PUT(req, { params }) {
    const { id } = await params;
    const user = await getUserById(id);
    if (!user) {
        return Response.json({ message: "Can't find User " }, { status: 404 });
    }
    const formData = await req.formData();
    let {
        img,
        ph_no,
        name,
        nrc,
        roll_no,
        major,
        current_address,
        password, } = getDataFromForm(formData,
            'img',
            'ph_no',
            'name',
            'nrc',
            'roll_no',
            'major',
            'current_address',
            'password',);
    if (!img || !ph_no || !name || !nrc || !roll_no || !major || !current_address || !password) {
        return Response.json({ messsage: "There are missing field" }, { status: 400 })
    }
    img = await handleImageEdit('user_img', img, process.env.DEFAULT_USER_IMAGE_PATH, user);
    const isok = await updateUser(id,ph_no,name,img,nrc,roll_no,major,current_address,password);
    if (isok) {
        return Response.json({ message: "User Updated Successfully" })
    }
    return Response.json({ message: "Can't update User" }, { status: 500 })

}