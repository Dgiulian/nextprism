import { CallbackOptions } from '@auth0/nextjs-auth0/dist/auth0-session';
import auth0 from '../../lib/auth0';

export default async function callback(req, res) {
    try {
        await auth0.handleCallback(req, res, { redirectUri: '/' })
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).end(error.message);
    }
}