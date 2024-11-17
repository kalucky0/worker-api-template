import { eq } from 'drizzle-orm';
import { DrizzleD1Database } from 'drizzle-orm/d1';

import { tasks } from './schema';
import { Task } from '../types';

export const createTask = async (db: DrizzleD1Database, task: Pick<Task, 'content'>): Promise<Task | null> => {
    const results = await db.insert(tasks).values(task).returning();
    if (results.length === 0) return null;
    return results[0];
};

export const getTasks = async (db: DrizzleD1Database): Promise<Task[]> => {
    const result = await db.select().from(tasks).all();
    return result;
};

export const getTask = async (db: DrizzleD1Database, id: number): Promise<Task | null> => {
    const result = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
    if (result.length === 0) return null;
    return result[0];
};

export const updateTask = async (
    db: DrizzleD1Database, id: number, task: Partial<Omit<Task, 'id' | 'createdAt'>>,
): Promise<Task | null> => {
    const result = await db.update(tasks).set(task).where(eq(tasks.id, id)).returning();
    if (result.length === 0) return null;
    return result[0];
};

export const deleteTask = async (db: DrizzleD1Database, id: number): Promise<boolean> => {
    const result = await db.delete(tasks).where(eq(tasks.id, id)).returning();
    return result.length > 0;
};