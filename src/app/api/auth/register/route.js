import { createUser } from '@/models/user';
import { getDataFromForm } from '@/utils/backendUtils';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const {
      ph_no,
      name,
      nrc,
      current_address,
      password, } = getDataFromForm(formData,
        'ph_no',
        'name',
        'nrc',
        'current_address',
        'password',);
    if(!ph_no || ! name || ! nrc || ! current_address || ! password){
        return Response.json({messsage : "There are missing field"},{status : 400})
    }
    const userId = await createUser({ph_no,name,nrc,current_address,password});

    return Response.json({ message: 'User created successfully'}, { status: 201 });
  } catch (err) {
    console.error(err);

    if (err.code === 'ER_DUP_ENTRY') {
      return Response.json({ message: 'Phone or NRC already exists' }, { status: 409 });
    }

    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
