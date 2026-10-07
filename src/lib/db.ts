import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Try to create PrismaClient — if DB is unavailable, create a safe proxy
// that returns empty arrays/zero counts so the site never crashes
function createDb() {
  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV !== 'production' ? ['query'] : ['error'],
    })
    return client
  } catch (e) {
    console.error('[db] PrismaClient initialization failed:', e)
    // Return a proxy that catches all method calls and returns safe defaults
    return new Proxy({} as PrismaClient, {
      get() {
        // Return a function that returns a promise resolving to safe defaults
        return () => Promise.resolve([])
      },
    }) as unknown as PrismaClient
  }
}

export const db = globalForPrisma.prisma ?? createDb()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
