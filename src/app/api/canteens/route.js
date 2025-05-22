import { getCanteens } from "@/models/canteen";
import { NextResponse } from "next/server";

export async function GET(){
    const canteens = await getCanteens();
    return NextResponse.json(canteens);
}