import { getOrderUsers, searchOrderUsers } from "@/models/orderItems";

export async function GET(req, { params }) {
    const { id: canteen_id } = await params;
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword");

    let users;

    if (keyword) {
        users = await searchOrderUsers(canteen_id, keyword);
    } else {
        users = await getOrderUsers(canteen_id);
    }
    return Response.json(users)
}