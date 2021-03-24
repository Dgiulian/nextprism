import auth0 from '../../lib/auth0';

export default async function login(req, res) {
    try {
        await auth0.handleLogout(req, res, {
            returnTo: '/'
        });
    } catch (error) {
        res.status(error.status || 500).end(error.message);
    }
}