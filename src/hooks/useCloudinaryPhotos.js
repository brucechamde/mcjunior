import { useEffect, useState } from 'react'

import { CLOUDINARY } from '../config/gallery'

const { cloudName } = CLOUDINARY

const encodeId = (id) => id.split('/').map(encodeURIComponent).join('/')
const delivery = (item, transform) =>
  `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/v${Number(item.version)}/${encodeId(item.public_id)}`

// Cloudinary tags are case-sensitive, so look up the common spellings and merge them.
const spellings = (tag) => [...new Set([tag, tag.toLowerCase(), tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()])]

async function fetchTag(tag, signal) {
  const res = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${encodeURIComponent(tag)}.json`, { signal })
  // Cloudinary answers 404 for a tag with no photos, which is fine.
  if (res.status === 404) return []
  if (!res.ok) throw new Error(`Cloudinary list failed (${res.status})`)
  const { resources } = await res.json()
  return resources
}

async function fetchPhotos(tag, signal) {
  const results = await Promise.all(spellings(tag).map((spelling) => fetchTag(spelling, signal)))
  const byId = new Map()
  results.flat().forEach((item) => byId.set(item.public_id, item))

  return [...byId.values()].map((item) => ({
    id: `${item.public_id}-${item.version}`,
    width: item.width,
    height: item.height,
    created: item.created_at,
    // 800px wide thumbnail with responsive sizes, and a larger version for the viewer
    src: delivery(item, 'f_auto,q_auto,w_800,c_limit'),
    srcSet: [480, 800, 1200].map((w) => `${delivery(item, `f_auto,q_auto,w_${w},c_limit`)} ${w}w`).join(', '),
    full: delivery(item, 'f_auto,q_auto,w_1800,c_limit'),
  }))
}

// Photos for one tag, newest first. `fallback` is shown while Cloudinary is not configured, or if the tag
// is empty or unreachable. Returns { status: 'loading' | 'ready' | 'local' | 'fallback', photos }.
export function useCloudinaryPhotos(tag, fallback, label = 'Event photo') {
  const [state, setState] = useState(() =>
    cloudName ? { status: 'loading', photos: [] } : { status: 'local', photos: fallback },
  )

  useEffect(() => {
    if (!cloudName) return
    const controller = new AbortController()

    fetchPhotos(tag, controller.signal)
      .then((photos) => {
        if (photos.length === 0) throw new Error('empty')
        const sorted = photos
          .sort((a, b) => new Date(b.created) - new Date(a.created))
          .map((photo, i) => ({ ...photo, alt: `${label} ${i + 1}` }))
        setState({ status: 'ready', photos: sorted })
      })
      .catch((error) => {
        if (controller.signal.aborted) return
        console.warn(
          `Photos: nothing found for the "${tag}" tag (${error.message}), showing bundled photos. Check the cloud name, the "Resource list" setting and the tag in src/config/gallery.js.`,
        )
        setState({ status: 'fallback', photos: fallback })
      })

    return () => controller.abort()
  }, [tag, fallback, label])

  return state
}
