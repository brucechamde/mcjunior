// Bundled photos, used until Cloudinary is configured (see src/config/gallery.js) or if it is unreachable.
import gallery1 from '../assets/images/gallery/gallery1.jpeg'
import gallery2 from '../assets/images/gallery/gallery2.jpeg'
import gallery3 from '../assets/images/gallery/gallery3.jpeg'
import gallery4 from '../assets/images/gallery/gallery4.jpeg'
import gallery5 from '../assets/images/gallery/gallery5.jpeg'
import gallery6 from '../assets/images/gallery/gallery6.jpeg'

const local = [
  { src: gallery1, width: 1152, height: 2048, alt: 'Event photo' },
  { src: gallery2, width: 1152, height: 2048, alt: 'Event photo' },
  { src: gallery3, width: 720, height: 482, alt: 'Event photo' },
  { src: gallery4, width: 2048, height: 2048, alt: 'Event photo' },
  { src: gallery5, width: 2048, height: 2048, alt: 'Event photo' },
  { src: gallery6, width: 2048, height: 1536, alt: 'Event photo' },
]

export const localPhotos = local.map((photo, i) => ({ ...photo, id: `local-${i}`, full: photo.src }))
