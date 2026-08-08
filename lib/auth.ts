import { SignJWT, jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production-32ch'
)

export async function signToken(payload: Record<string, string | number | boolean>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET)
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as Record<string, unknown>
  } catch {
    return null
  }
}

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
  const adminUser = (process.env.ADMIN_USERNAME || 'admin').trim()
  const adminPass = (process.env.ADMIN_PASSWORD || 'ChinezeAdmin2024!').trim()
  const inputUser = String(username || '').trim()
  const inputPass = String(password || '').trim()
  if (inputUser !== adminUser) return false
  return inputPass === adminPass
}
