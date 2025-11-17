import { createCanteen, getCanteens } from "@/models/canteen";
import { getDataFromForm, handleImage } from "@/utils/backendUtils";
import { NextResponse } from "next/server";

export async function GET() {
    const canteens = await getCanteens();
    return Response.json(canteens);
}

export async function POST(req) {
    const formData = await req.formData();
    let { name, cover_img, profile_img } = getDataFromForm(formData, 'name', 'cover_img', 'profile_img');
    if (!name) {
        return Response.json({ message: "Name must be entered" }, { status: 400 })
    }
    if (cover_img) {
        cover_img = await handleImage('canteen_img', cover_img)
    } else {
        cover_img = process.env.DEFAULT_CANTEEN_COVER_IMAGE_PATH
    }
    if (profile_img) {
        profile_img = await handleImage('canteen_img', profile_img);
    } else {
        profile_img = process.env.DEFAULT_CANTEEN_PROFILE_IMAGE_PATH;
    }
    const isok = await createCanteen(name,profile_img,cover_img);
    if(isok){
        return Response.json({message : "Canteen Created Successfully"})
    }
    return Response.json({message : "Can't create canteen"},{status : 500})

}