import { eq } from 'drizzle-orm';
import db from '../config/db';
import { users } from '../db/schema';
import { publicProcedure, router } from './trpc';
import { z } from 'zod'
import { createHTTPServer } from '@trpc/server/adapters/standalone';

export const appRouter = router({
  getUserList: publicProcedure.query(async () => {
    const userList = await db.select().from(users)
    return userList;
  }),
  getUserById: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;
      const user = await db.select().from(users).where(eq(users.id, +input))
      return user
    }),
  createUser: publicProcedure
    .input(z.object({
      username: z.string(),
      email: z.string().includes('@'),
      password: z.string().min(8)
    }))
    .mutation(async (opts) => {
      const { input } = opts;
      const hashPassword = await Bun.password.hash(input.password)
      const user = await db.insert(users).values({
        username: input.username,
        email: input.email,
        password: hashPassword
      })
        .returning()
      return user
    }),
  updateUser: publicProcedure
    .input(z.object({
      id: z.string(),
      email: z.string().includes('@'),
      password: z.string().min(8)
    }))
    .mutation(async (opts) => {
      const { input } = opts
      const hashPassword = await Bun.password.hash(input.password)
      const user = await db.update(users).set({
        email: input.email,
        password: hashPassword
      })
        .where(eq(users.id, +input.id))
        .returning({ updatedId: users.id })

      return user;
    })
  ,
  removeUser: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;
      const user = await db.delete(users).where(eq(users.id, +input)).returning()
      if (!user) return `User with give id not Found`
      return user
    })
});

export type AppRouter = typeof appRouter

const server = createHTTPServer({
  router: appRouter,
})

server.listen(3000)