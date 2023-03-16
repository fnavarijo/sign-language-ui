const SANITY_CDN = 'https://cdn.sanity.io/images/'
const PROJECT_ID = '4xfj4i31'
const DATASET = 'production'

export function getSanityImage (imageReference: string) {
  const imageName = imageReference.replace('image-', '')
  const imagePath = imageName.slice(0, -4)
  const fileFormat = imageName.slice(-3)
  return `${SANITY_CDN}${PROJECT_ID}/${DATASET}/${imagePath}.${fileFormat}`
}