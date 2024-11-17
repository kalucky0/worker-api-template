import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import { createMiddleware } from 'hono/factory';

type Env = {
    Bindings: {
        DB: D1Database;
    },
    Variables: {
        db: DrizzleD1Database
    }
};

const middleware = createMiddleware<Env>(async (c, next) => {
    const database = drizzle(c.env.DB, { logger: true });
    c.set('db', database);
    await next();
});

export default middleware;