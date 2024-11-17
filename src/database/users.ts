import { eq } from 'drizzle-orm';
import { DrizzleD1Database } from 'drizzle-orm/d1';

import { users } from './schema';
import { User } from '../types';

export const createUser = async (db: DrizzleD1Database, user: Omit<User, 'id' | 'createdAt'>): Promise<User | null> => {
    const results = await db.insert(users).values(user).returning();
    if (results.length === 0) return null;
    return results[0];
};

export const getUsers = async (db: DrizzleD1Database): Promise<User[]> => {
    const result = await db.select().from(users).all();
    return result;
};

export const getUser = async (db: DrizzleD1Database, id: number): Promise<User | null> => {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (result.length === 0) return null;
    return result[0];
};

export const getUserByEmail = async (db: DrizzleD1Database, email: string): Promise<User | null> => {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (result.length === 0) return null;
    return result[0];
};

export const updateUser = async (
    db: DrizzleD1Database, id: number, user: Partial<Omit<User, 'id' | 'createdAt'>>,
): Promise<User | null> => {
    const result = await db.update(users).set(user).where(eq(users.id, id)).returning();
    if (result.length === 0) return null;
    return result[0];
};

export const deleteUser = async (db: DrizzleD1Database, id: number): Promise<boolean> => {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result.length > 0;
};