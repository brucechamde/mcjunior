import { mixes } from '../data/mixes'

// One shared audio player for the whole site, so music keeps playing while people move between pages,
// and so the DJ deck and the background can read the same live frequency data.
// Browsers only allow audio after a click, so nothing is created or played until then.

let audio = null
let context = null
let analyser = null
let data = null
let lastRead = -1
let levels = null

let snapshot = { index: null, playing: false, currentTime: 0, duration: 0, error: false }
const listeners = new Set()

function emit(patch) {
  snapshot = { ...snapshot, ...patch }
  listeners.forEach((listener) => listener())
}

export const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const getSnapshot = () => snapshot

function ensure() {
  if (audio) return
  audio = new Audio()
  audio.preload = 'none'

  audio.addEventListener('play', () => emit({ playing: true }))
  audio.addEventListener('pause', () => emit({ playing: false }))
  audio.addEventListener('timeupdate', () => emit({ currentTime: audio.currentTime }))
  audio.addEventListener('loadedmetadata', () => emit({ duration: audio.duration }))
  audio.addEventListener('error', () => emit({ error: true, playing: false }))
  audio.addEventListener('ended', () => next())

  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (AudioContextClass) {
    context = new AudioContextClass()
    analyser = context.createAnalyser()
    analyser.fftSize = 256
    analyser.smoothingTimeConstant = 0.78
    context.createMediaElementSource(audio).connect(analyser)
    analyser.connect(context.destination)
    data = new Uint8Array(analyser.frequencyBinCount)
  }
}

export function play(index) {
  ensure()
  context?.resume()

  if (index === snapshot.index) {
    if (audio.paused) audio.play().catch(() => emit({ error: true }))
    return
  }

  audio.src = mixes[index].src
  emit({ index, currentTime: 0, duration: 0, error: false })
  audio.play().catch(() => emit({ error: true }))
}

export function toggle() {
  if (snapshot.index === null) return play(0)
  ensure()
  context?.resume()
  if (audio.paused) audio.play().catch(() => emit({ error: true }))
  else audio.pause()
}

export function next() {
  play(((snapshot.index ?? -1) + 1) % mixes.length)
}

export function prev() {
  // Restart the track if it has been playing a few seconds, otherwise go to the previous one
  if (audio && audio.currentTime > 3) {
    audio.currentTime = 0
    return
  }
  play(((snapshot.index ?? 0) - 1 + mixes.length) % mixes.length)
}

export function seek(seconds) {
  if (audio) audio.currentTime = seconds
}

export function stop() {
  if (audio) {
    audio.pause()
    audio.removeAttribute('src')
    audio.load()
  }
  emit({ index: null, playing: false, currentTime: 0, duration: 0, error: false })
}

// Live frequency levels, or null when nothing is playing. Cheap to call several times per frame.
export function getLevels() {
  if (!analyser || !snapshot.playing) return null
  const now = performance.now()
  if (now - lastRead < 8 && levels) return levels
  lastRead = now

  analyser.getByteFrequencyData(data)
  const avg = (from, to) => {
    let sum = 0
    for (let i = from; i < to; i++) sum += data[i]
    return sum / ((to - from) * 255)
  }
  levels = { bins: data, bass: avg(0, 5), mid: avg(5, 30), high: avg(30, 90) }
  return levels
}
