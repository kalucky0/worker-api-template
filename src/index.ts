import { Hono } from 'hono';
import { jwt } from 'hono/jwt';

import { auth, tasks, users } from './handlers';

const app = new Hono<{ Bindings: Env }>();

app.route('/auth', auth);

app.use('/*', (c, next) => {
    const jwtMiddleware = jwt({
        secret: c.env.JWT_SECRET,
    });
    return jwtMiddleware(c, next);
});

app.route('/tasks', tasks);
app.route('/users', users);

export default app;
