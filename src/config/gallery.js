// Gallery photos come from Cloudinary (free plan), so you can add photos without touching the code.
//
// One-time setup
//   1. Create a free account at cloudinary.com and copy your "Cloud name" (top of the dashboard).
//   2. Settings > Security > "Restricted media types": untick "Resource list" and save.
//      (This lets the website read the list of photos that share a tag.)
//   3. Paste your cloud name below.
//
// Adding photos
//   Media Library > Upload. Give each photo the tag for its category:
//     gallery-nightclub, gallery-weddings, gallery-corporate
//   (tag = tagPrefix + the category name in lowercase, spaces become dashes).
//   Folders are optional and only for your own tidiness. The tag is what the site reads.
//   To add a new category, add its name to `categories` below and tag photos with gallery-<name>.
//
// While cloudName is empty, or if Cloudinary can't be reached, the site shows the
// bundled photos from src/data/localPhotos.js instead.
export const CLOUDINARY = {
  cloudName: 'rgjl1oez',
  tagPrefix: 'gallery-',
  categories: ['Nightclub', 'Weddings', 'Corporate'],
}
