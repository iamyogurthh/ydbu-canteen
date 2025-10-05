import path from 'path'
import { writeFile } from 'fs/promises'
import fs from 'fs/promises'
export function getDataFromForm(formData, ...args) {
  let data = {}
  for (let i = 0; i < args.length; i++) {
    data[args[i]] = formData.get(args[i])
  }
  return data
}

export async function handleImage(folder, img) {
  const buffer = Buffer.from(await img.arrayBuffer())
  const filename = Date.now() + img.name.replaceAll(' ', '_')
  await writeFile(
    path.join(process.cwd(), `/public/${folder}/` + filename),
    buffer
  )
  return `/${folder}/${filename}`
}

export async function deleteImage(folder, filename) {
  const filepath = path.join(process.cwd(), 'public', folder, filename)

  try {
    await fs.access(filepath) // check if file exists
    await fs.unlink(filepath)
    console.log('File deleted successfully:', filename)
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('File does not exist, skipping delete:', filename)
    } else {
      throw error
    }
  }
}

export async function handleImageEdit(
  folder,
  img,
  defaultPath,
  object,
  type = null
) {
  if (type === 'profile') {
    if (typeof img === 'string') {
      img = img
    } else if (img && img.name !== '') {
      if (object.profile_img !== defaultPath) {
        await deleteImage(folder, object.profile_img.split('/')[2])
        img = await handleImage(folder, img)
      } else {
        img = await handleImage(folder, img)
      }
    }
    return img
  } else if (type === 'cover') {
    if (typeof img === 'string') {
      img = img
    } else if (img && img.name !== '') {
      if (object.cover_img !== defaultPath) {
        await deleteImage(folder, object.cover_img.split('/')[2])
        img = await handleImage(folder, img)
      } else {
        img = await handleImage(folder, img)
      }
    }
    return img
  } else {
    if (typeof img === 'string') {
      img = img
    } else if (img && img.name !== '') {
      if (object.img !== defaultPath) {
        await deleteImage(folder, object.img.split('/')[2])
        img = await handleImage(folder, img)
      } else {
        img = await handleImage(folder, img)
      }
    }
    return img
  }
}
