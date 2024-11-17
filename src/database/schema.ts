import { sql } from 'drizzle-orm';
import { blob, integer, numeric, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { Permission } from '../types';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    permissions: blob({ mode: 'json' }).$type<Permission[]>().notNull().default([]),
    createdAt: numeric('createdAt').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const tasks = sqliteTable('tasks', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    content: text('name').notNull(),
    isComplete: integer('isComplete', { mode: 'boolean' }).notNull().default(false),
    createdAt: numeric('createdAt').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});