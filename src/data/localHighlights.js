// Bundled Highlights photos, used until Cloudinary has photos tagged for Highlights (see src/config/gallery.js).
import featured from '../assets/images/highlights/featured.jpeg'
import highlight1 from '../assets/images/highlights/highlight1.jpeg'
import highlight2 from '../assets/images/highlights/highlight2.jpeg'
import highlight3 from '../assets/images/highlights/highlight3.jpeg'
import highlight4 from '../assets/images/highlights/highlight4.jpeg'

const local = [
  { src: featured, width: 1152, height: 2048 },
  { src: highlight1, width: 1152, height: 2048 },
  { src: highlight2, width: 720, height: 482 },
  { src: highlight3, width: 2048, height: 2048 },
  { src: highlight4, width: 2048, height: 2048 },
]

export const localHighlights = local.map((photo, i) => ({
  ...photo,
  id: `local-highlight-${i}`,
  full: photo.src,
  alt: `Highlight photo ${i + 1}`,
}))
