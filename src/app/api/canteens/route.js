import { createCanteen, getCanteensWithOwnerInfo } from "@/models/canteen";
import { createUserForCanteenOwner } from "@/models/user";
import { getDataFromForm, handleImage } from "@/utils/backendUtils";

export async function GET() {
    const canteens = await getCanteensWithOwnerInfo();
    return Response.json(canteens);
}

export async function POST(req) {
    try {
        const formData = await req.formData();
        let { canteen_name, cover_img, profile_img,
            ph_no, user_name, nrc, current_address, password } = getDataFromForm(formData, 'canteen_name', 'cover_img', 'profile_img',
                'ph_no',
                'user_name',
                'nrc',
                'current_address',
                'password');
        if (!canteen_name || !user_name || !ph_no || !user_name || !nrc || !current_address || !password) {
            return Response.json({ message: "All Fields must be entered" }, { status: 400 })
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
        const canteen_id = await createCanteen(canteen_name, profile_img, cover_img);
        if (canteen_id) {
            const userId = await createUserForCanteenOwner({ ph_no, name : user_name, nrc, current_address, password, canteen_id });
            return Response.json({ message: "Successfully Created" })
        }
        return Response.json({ mesage: "Canteen can't be created" }, { status: 400 })
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return Response.json({ message: 'Phone or NRC or Canteen_name already exists' }, { status: 409 });
        }
        return Response.json({ message: 'Server error' }, { status: 500 });

    }

}
