// Gallery and Highlights photos come from Cloudinary (free plan), so you can add photos without touching code.
//
// One-time setup
//   1. Settings > Security > "Restricted media types": untick "Resource list" and save.
//      (This lets the website read the list of photos that share a tag.)
//   2. cloudName below is your account's Cloud name.
//
// Adding photos
//   Upload to Media Library (any folder) and give each photo a tag:
//     Gallery    -> shows on the Gallery page
//     Nightclub  -> shows on the Highlights page
//   A photo can have both tags. Select several photos at once > "Add tags" to do a batch.
//   The site reads the TAG, not the folder (Cloudinary does not publish folder contents).
//   Capitalisation does not matter: Nightclub, nightclub and NIGHTCLUB are all found.
//   New photos appear after a page refresh, newest first.
//
// If a tag has no photos, or Cloudinary can't be reached, that page shows the bundled photos instead
// (src/data/localPhotos.js and src/data/localHighlights.js).
//
// To use different tags, change the values below.
export const CLOUDINARY = {
  cloudName: 'rgjl1oez',
  tags: {
    gallery: 'Gallery',
    highlights: 'Nightclub',
  },
}
