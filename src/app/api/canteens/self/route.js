import { getCanteensWithOwnerInfo, searchCanteensWithOwnerInfo } from "@/models/canteen";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword");
    let canteens;
    if (keyword) {
        canteens = await searchCanteensWithOwnerInfo(keyword);
    } else {
        canteens = await getCanteensWithOwnerInfo();
    }
    return Response.json(canteens);
}