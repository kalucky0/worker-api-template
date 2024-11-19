import { sql } from 'drizzle-orm';
import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { Permission } from '../types';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    permissions: blob({ mode: 'json' }).$type<Permission[]>().notNull().default([]),
    createdAt: integer({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const tasks = sqliteTable('tasks', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    content: text('name').notNull(),
    isComplete: integer('isComplete', { mode: 'boolean' }).notNull().default(false),
    createdAt: integer({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
});