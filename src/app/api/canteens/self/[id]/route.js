import { deleteCanteenById, getCanteenById, updateCanteen } from '@/models/canteen'
import { deleteImage, getDataFromForm, handleImageEdit } from '@/utils/backendUtils'

export async function PUT(req, { params }) {
  const { id } = await params
  const canteen = await getCanteenById(id)
  if (!canteen) {
    return Response.json({ message: 'Canteen Not found' }, { status: 400 })
  }
  const formData = await req.formData()
  let { name, profile_img, cover_img } = getDataFromForm(
    formData,
    'name',
    'profile_img',
    'cover_img'
  )
  if (!name || !profile_img || !cover_img) {
    return Response.json({ message: 'All fields are required' })
  }
  profile_img = await handleImageEdit(
    'canteen_img',
    profile_img,
    process.env.DEFAULT_CANTEEN_PROFILE_IMAGE_PATH,
    canteen,
    'profile'
  )
  cover_img = await handleImageEdit(
    'canteen_img',
    cover_img,
    process.env.DEFAULT_CANTEEN_COVER_IMAGE_PATH,
    canteen,
    'cover'
  )
  const isok = await updateCanteen(id, name, profile_img, cover_img)
  if (isok) {
    return Response.json({ message: 'Canteen Updated Successfully' })
  }
  return Response.json({ message: "Can't update canteen" }, { status: 500 })
}

export async function GET(req, { params }) {
  const { id } = await params
  const canteen = await getCanteenById(id)
  if (!canteen) {
    return Response.json({ message: 'Canteen Not found' }, { status: 400 })
  }
  return Response.json(canteen)
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const canteen = await getCanteenById(id);

  if(!canteen){
    return Response.json({ message: "Canteen Not Found " }, { status: 400 });
  }


  //  (/sample_img/canteen.jpg)
  const profileImageFolder = canteen.profile_img.split('/')[1];
  const coverImageFolder = canteen.cover_img.split('/')[1];

  if(profileImageFolder !== 'sample_img'){
    await deleteImage(profileImageFolder,canteen.profile_img.split('/')[2]);
  }

  if(coverImageFolder !== 'sample_img'){
    await deleteImage(coverImageFolder,canteen.cover_img.split('/')[2]);
  }

  const isok = await deleteCanteenById(id);
  if (isok) {
      return Response.json({message : "Successfully deleted"});
  }
  return Response.json({ message: "Can't Delete Canteen " }, { status: 400 });
}