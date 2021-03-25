export const verifyOwnership = (item, user) => {
    const { author } = item;
    if (author.auth0 !== user.auth0) {
        throw new Error('Access denied. User does not own this item');
    }
    return true;
}