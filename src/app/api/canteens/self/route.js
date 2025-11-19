import { getCanteensWithOwnerInfo } from "@/models/canteen";

export async function GET() {
    const canteens = await getCanteensWithOwnerInfo();
    return Response.json(canteens);
}