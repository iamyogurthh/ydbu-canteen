import { getUserByPhone } from "@/models/user";
import { handleImageEdit } from "@/utils/backendUtils";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { phoneNo } = await params;
    const user = await getUserByPhone(phoneNo);
    if (user) {
        return NextResponse.json(user);
    }
    return NextResponse.json({ message: "Can't find User " }, { status: 404 });
}

