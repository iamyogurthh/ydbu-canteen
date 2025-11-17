import { getAllMenuByCanteenId, getAvailableMenuByCanteenId } from "@/models/menu";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const {id} = await params;
    const allParam = request.nextUrl.searchParams.get("all");
    const all = allParam === "true";  
    if(all){
        const {canteen,menus} = await getAllMenuByCanteenId(id);
        return NextResponse.json({canteen,menus});
    }
    const {canteen,menus} = await getAvailableMenuByCanteenId(id);
    return NextResponse.json({canteen,menus})
}