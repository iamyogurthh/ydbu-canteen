import { deleteMenuById, getMenuById, updateMenu } from '@/models/menu'
import { deleteImage, getDataFromForm, handleImageEdit } from '@/utils/backendUtils'

export async function GET(req, { params }) {
  const { id } = await params
  const menu = await getMenuById(id)
  if (!menu) {
    return Response.json({ message: 'Menu Not found' }, { status: 400 })
  }
  return Response.json(menu)
}

export async function PUT(req, { params }) {
  const { id } = await params
  const menu = await getMenuById(id)
  if (!menu) {
    return Response.json({ message: 'Menu Not found' }, { status: 400 })
  }
  const formData = await req.formData()
  let { name, img, price } = getDataFromForm(
    formData,
    'canteen_id',
    'name',
    'img',
    'price'
  )
  if (!name || !img || !price) {
    return Response.json(
      { message: 'All fields are required' },
      { status: 400 }
    )
  }
  img = await handleImageEdit(
    'menu_img',
    img,
    process.env.DEFAULT_MENU_IMAGE_PATH,
    menu
  )
  const isok = await updateMenu(id, name, img, price)
  if (isok) {
    return Response.json({ message: 'Menu Updated Successfully' })
  }
  return Response.json({ message: "Can't update Menu" }, { status: 500 })
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const menu = await getMenuById(id);

  if(!menu){
    return Response.json({ message: "Menu Not Found " }, { status: 400 });
  }

  //  (/sample_img/menu.jpg)
  const imageFolder = menu.img.split('/')[1];

  if(imageFolder !== 'sample_img'){
    await deleteImage(imageFolder,menu.img.split('/')[2]);
  }

  const isok = await deleteMenuById(id);
  if (isok) {
      return Response.json({message : "Successfully deleted"});
  }
  return Response.json({ message: "Can't Delete Menu " }, { status: 400 });
}