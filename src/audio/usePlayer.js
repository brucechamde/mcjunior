import { useSyncExternalStore } from 'react'

import { getSnapshot, subscribe } from './engine'

// Current player state: { index, playing, currentTime, duration, error }
export function usePlayer() {
  return useSyncExternalStore(subscribe, getSnapshot)
}
