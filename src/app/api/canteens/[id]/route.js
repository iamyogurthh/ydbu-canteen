import { getMenuByCanteenId } from "@/models/menu";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const {id} = await params;
    const {canteen,menus} = await getMenuByCanteenId(id);
    return NextResponse.json({canteen,menus});
}