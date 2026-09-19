import { useEffect, useRef } from 'react'

// Site-wide sound-wave visualizer, drawn on one fixed canvas behind the page.
// Simulated audio (no microphone or file): layered waves and a spectrum row swell on a ~124 BPM beat.
// Follows the active theme, stops animating for reduced-motion visitors, and pauses in hidden tabs.

const BPM = 124
const BAR_COUNT = 72

const PALETTES = {
  dark: {
    sky: ['#0f0724', '#170b34', '#24104a'],
    lightA: '232,87,127',
    lightAAlpha: 0.2,
    lightB: '140,100,255',
    lightBAlpha: 0.16,
    bars: 'rgba(232,87,127,0.16)',
    waves: ['232,87,127', '160,120,255', '232,87,127', '120,150,255'],
    waveAlpha: [0.16, 0.15, 0.1, 0.12],
  },
  light: {
    sky: ['#fbf8ff', '#f2eaff', '#e6d9fb'],
    lightA: '201,47,92',
    lightAAlpha: 0.13,
    lightB: '120,90,230',
    lightBAlpha: 0.13,
    bars: 'rgba(201,47,92,0.16)',
    waves: ['201,47,92', '120,90,230', '201,47,92', '90,120,230'],
    waveAlpha: [0.16, 0.16, 0.11, 0.13],
  },
}

const WAVES = [
  { amp: 0.085, freq: 1.3, speed: 0.9, base: 0.8, phase: 0 },
  { amp: 0.1, freq: 0.9, speed: -0.6, base: 0.85, phase: 1.7 },
  { amp: 0.07, freq: 2.1, speed: 1.4, base: 0.89, phase: 3.1 },
  { amp: 0.06, freq: 1.6, speed: -1.1, base: 0.93, phase: 4.6 },
]

function WaveBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let palette = PALETTES[root.dataset.theme] || PALETTES.dark
    let width = 0
    let height = 0
    let frame = 0
    let lastMs = 1200

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (ms) => {
      lastMs = ms
      const t = ms / 1000
      const beat = ((t * BPM) / 60) % 1
      const env = 0.7 + 0.3 * Math.exp(-beat * 4)

      const sky = ctx.createLinearGradient(0, 0, 0, height)
      sky.addColorStop(0, palette.sky[0])
      sky.addColorStop(0.6, palette.sky[1])
      sky.addColorStop(1, palette.sky[2])
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, width, height)

      // Drifting stage lights
      const ax = width * (0.15 + 0.05 * Math.sin(t * 0.2))
      const lightA = ctx.createRadialGradient(ax, 0, 0, ax, 0, width * 0.6)
      lightA.addColorStop(0, `rgba(${palette.lightA},${palette.lightAAlpha})`)
      lightA.addColorStop(1, `rgba(${palette.lightA},0)`)
      ctx.fillStyle = lightA
      ctx.fillRect(0, 0, width, height)

      const bx = width * (0.9 - 0.05 * Math.sin(t * 0.17))
      const lightB = ctx.createRadialGradient(bx, height * 0.3, 0, bx, height * 0.3, width * 0.55)
      lightB.addColorStop(0, `rgba(${palette.lightB},${palette.lightBAlpha})`)
      lightB.addColorStop(1, `rgba(${palette.lightB},0)`)
      ctx.fillStyle = lightB
      ctx.fillRect(0, 0, width, height)

      // Spectrum bars along the bottom edge
      const barWidth = width / BAR_COUNT
      ctx.fillStyle = palette.bars
      for (let i = 0; i < BAR_COUNT; i++) {
        const n = Math.sin(i * 0.55 + t * 2.1) * 0.5 + Math.sin(i * 0.23 - t * 1.3) * 0.5
        const h = height * 0.09 * env * (0.35 + 0.65 * Math.abs(n))
        ctx.fillRect(i * barWidth + barWidth * 0.18, height - h, barWidth * 0.64, h)
      }

      // Layered waves
      WAVES.forEach((wave, w) => {
        const rgb = palette.waves[w]
        const alpha = palette.waveAlpha[w]
        const yBase = height * wave.base
        const amp = height * wave.amp * env
        ctx.beginPath()
        ctx.moveTo(0, height)
        for (let x = 0; x <= width; x += 8) {
          const y =
            yBase -
            amp *
              (Math.sin(x * wave.freq * 0.004 + t * wave.speed + wave.phase) * 0.6 +
                Math.sin(x * wave.freq * 0.011 - t * wave.speed * 1.3) * 0.3 +
                Math.sin(x * 0.02 + t * 2) * 0.1)
          ctx.lineTo(x, y)
        }
        ctx.lineTo(width, height)
        ctx.closePath()

        const fill = ctx.createLinearGradient(0, yBase - amp, 0, height)
        fill.addColorStop(0, `rgba(${rgb},${alpha})`)
        fill.addColorStop(1, `rgba(${rgb},0)`)
        ctx.fillStyle = fill
        ctx.fill()

        ctx.strokeStyle = `rgba(${rgb},${Math.min(alpha * 2.2, 0.4)})`
        ctx.lineWidth = 1.25
        ctx.stroke()
      })
    }

    const loop = (ms) => {
      draw(ms)
      frame = requestAnimationFrame(loop)
    }

    // Repaint immediately when the theme changes (matters when animation is off)
    const observer = new MutationObserver(() => {
      palette = PALETTES[root.dataset.theme] || PALETTES.dark
      if (reduce) draw(lastMs)
    })
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })

    resize()
    const onResize = () => {
      resize()
      if (reduce) draw(lastMs)
    }
    window.addEventListener('resize', onResize)
    if (reduce) draw(lastMs)
    else frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-dvh w-full" />
}

export default WaveBackground
