import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  password: text('password'),
});
