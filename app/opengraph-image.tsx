import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Chineze Eden — Teacher · Mentor · Writer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0A',
          backgroundImage:
            'radial-gradient(ellipse 80% 80% at 15% 0%, rgba(201,162,39,0.22), rgba(10,10,10,0))',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top rule + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 72, height: 2, backgroundColor: '#C9A227' }} />
          <div
            style={{
              color: '#E8C547',
              fontSize: 22,
              letterSpacing: 8,
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Chineze Eden
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 104,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -2,
            }}
          >
            Unlocking
          </div>
          <div
            style={{
              color: '#E8C547',
              fontSize: 104,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -2,
            }}
          >
            Extraordinary
          </div>
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 104,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -2,
            }}
          >
            Potential
          </div>
        </div>

        {/* Footer strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 28 }}>
            Teacher · Mentor · Writer
          </div>
          <div style={{ color: 'rgba(232,197,71,0.85)', fontSize: 24, letterSpacing: 3 }}>
            Boyspiration™
          </div>
        </div>

        {/* Gold edge */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 12,
            backgroundColor: '#C9A227',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
