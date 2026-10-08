// Tracks for the "Play a mix" feature. Files live in public/audio/ (128 kbps mp3, about 3 MB each).
//
// These are free electronic and party tracks by Kevin MacLeod (incompetech.com), licensed under Creative
// Commons: By Attribution 4.0 (https://creativecommons.org/licenses/by/4.0/). They are safe for commercial
// use as long as the credit stays visible, which the Mixes section and the mini player both do.
//
// To use Bruce's own mixes instead: drop the mp3 files in public/audio/, replace the entries below, and
// remove the credit lines. Keep files under about 8 MB each so they start playing quickly.
export const mixes = [
  { id: 'werq', title: 'Werq', artist: 'Kevin MacLeod', style: 'Dance floor', bpm: 125, seconds: 162, src: '/audio/werq.mp3' },
  {
    id: 'enter-the-party',
    title: 'Enter the Party',
    artist: 'Kevin MacLeod',
    style: 'Party electro',
    bpm: 120,
    seconds: 188,
    src: '/audio/enter-the-party.mp3',
  },
  {
    id: 'digital-lemonade',
    title: 'Digital Lemonade',
    artist: 'Kevin MacLeod',
    style: 'Electronic',
    bpm: 120,
    seconds: 180,
    src: '/audio/digital-lemonade.mp3',
  },
  {
    id: 'tech-live',
    title: 'Tech Live',
    artist: 'Kevin MacLeod',
    style: 'Tech house',
    bpm: 124,
    seconds: 228,
    src: '/audio/tech-live.mp3',
  },
  {
    id: 'ouroboros',
    title: 'Ouroboros',
    artist: 'Kevin MacLeod',
    style: 'Progressive electronic',
    bpm: 130,
    seconds: 162,
    src: '/audio/ouroboros.mp3',
  },
  {
    id: 'neon-laser-horizon',
    title: 'Neon Laser Horizon',
    artist: 'Kevin MacLeod',
    style: 'Synthwave',
    bpm: 160,
    seconds: 179,
    src: '/audio/neon-laser-horizon.mp3',
  },
  {
    id: 'kick-shock',
    title: 'Kick Shock',
    artist: 'Kevin MacLeod',
    style: 'Club electro',
    bpm: 138,
    seconds: 63,
    src: '/audio/kick-shock.mp3',
  },
  {
    id: 'cyborg-ninja',
    title: 'Cyborg Ninja',
    artist: 'Kevin MacLeod',
    style: 'Hard electronic',
    bpm: 160,
    seconds: 180,
    src: '/audio/cyborg-ninja.mp3',
  },
]
