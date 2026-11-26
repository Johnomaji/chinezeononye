import { SignJWT, jwtVerify } from 'jose'

// ADMIN_USERNAME, ADMIN_PASSWORD and JWT_SECRET come from the environment (Vercel >
// Settings > Environment Variables, or .env.local). There are deliberately no
// defaults: this repository is public, so a default would be a published password.

export const adminLoginConfigured = () =>
  Boolean(process.env.ADMIN_USERNAME?.trim() && process.env.ADMIN_PASSWORD?.trim() && process.env.JWT_SECRET)

function secret() {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not set')
  return new TextEncoder().encode(process.env.JWT_SECRET)
}

export async function signToken(payload: Record<string, string | number | boolean>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret())
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, secret())
    return payload as Record<string, unknown>
  } catch {
    return null
  }
}

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
  if (!adminLoginConfigured()) return false
  const adminUser = process.env.ADMIN_USERNAME!.trim()
  const adminPass = process.env.ADMIN_PASSWORD!.trim()
  const inputUser = String(username || '').trim()
  const inputPass = String(password || '').trim()
  if (inputUser !== adminUser) return false
  return inputPass === adminPass
}
