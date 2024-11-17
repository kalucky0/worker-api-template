import { sign } from 'hono/jwt';

import { JwtPayload, User } from '../types';

export const createJwt = (user: User): Promise<string> => {
    return sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            permissions: user.permissions,
        } satisfies JwtPayload,
        'sample-secret',
    );
};
