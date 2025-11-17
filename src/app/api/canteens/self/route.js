import { getCanteens } from "@/models/canteen";

export async function GET() {
    const canteens = await getCanteens();
    return NextResponse.json(canteens);
}