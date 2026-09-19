import { useEffect, useState } from 'react'

import { CLOUDINARY } from '../config/gallery'
import { localCategories, localPhotos } from '../data/localPhotos'

const { cloudName, tagPrefix, categories: configured } = CLOUDINARY

const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const encodeId = (id) => id.split('/').map(encodeURIComponent).join('/')
const delivery = (item, transform) =>
  `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/v${item.version}/${encodeId(item.public_id)}`

async function fetchCategory(category, signal) {
  const res = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tagPrefix}${slug(category)}.json`, {
    signal,
  })
  // Cloudinary answers 404 for a tag with no photos yet, which is fine.
  if (res.status === 404) return []
  if (!res.ok) throw new Error(`Cloudinary list failed (${res.status})`)
  const { resources } = await res.json()
  return resources.map((item) => ({
    id: `${item.public_id}-${item.version}`,
    category,
    width: item.width,
    height: item.height,
    created: item.created_at,
    // 800px wide thumbnail with responsive sizes, and a larger version for the viewer
    src: delivery(item, 'f_auto,q_auto,w_800,c_limit'),
    srcSet: [480, 800, 1200].map((w) => `${delivery(item, `f_auto,q_auto,w_${w},c_limit`)} ${w}w`).join(', '),
    full: delivery(item, 'f_auto,q_auto,w_1800,c_limit'),
  }))
}

const local = { status: 'local', photos: localPhotos, categories: localCategories }

// Returns { status: 'loading' | 'ready' | 'local' | 'fallback', photos, categories }.
// 'local' means Cloudinary isn't configured; 'fallback' means it was configured but unreachable or empty.
export function useGalleryPhotos() {
  const [state, setState] = useState(() => (cloudName ? { status: 'loading', photos: [], categories: [] } : local))

  useEffect(() => {
    if (!cloudName) return
    const controller = new AbortController()

    Promise.allSettled(configured.map((category) => fetchCategory(category, controller.signal))).then((results) => {
      if (controller.signal.aborted) return
      const photos = results
        .flatMap((result) => (result.status === 'fulfilled' ? result.value : []))
        .sort((a, b) => new Date(b.created) - new Date(a.created))
        .map((photo, i) => ({ ...photo, alt: `${photo.category} event photo ${i + 1}` }))

      if (photos.length === 0) {
        console.warn('Gallery: no Cloudinary photos found, showing bundled photos. Check the cloud name, the "Resource list" setting and the photo tags in src/config/gallery.js.')
        setState({ ...local, status: 'fallback' })
        return
      }

      setState({
        status: 'ready',
        photos,
        categories: configured.filter((category) => photos.some((p) => p.category === category)),
      })
    })

    return () => controller.abort()
  }, [])

  return state
}
