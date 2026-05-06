import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaInitError: boolean
}

/* ─── Lazy, error-safe Prisma client ───
 * On serverless deployments (Vercel, Netlify, etc.) the filesystem
 * is read-only and SQLite cannot open its file.  We catch that
 * initialization error once and export `null` so the rest of the
 * app can gracefully skip database operations.
 */
function createPrismaClient(): PrismaClient | null {
  // If we already tried and failed, don't retry
  if (globalForPrisma.prismaInitError) return null

  try {
    const client = globalForPrisma.prisma ?? new PrismaClient({ log: ['query'] })

    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client

    return client
  } catch (err) {
    console.warn("Prisma client initialization failed — database operations will be skipped:", err)
    globalForPrisma.prismaInitError = true
    return null
  }
}

export const db = createPrismaClient()

/** Check if the database is actually available */
export function isDatabaseAvailable(): boolean {
  return db !== null
}
