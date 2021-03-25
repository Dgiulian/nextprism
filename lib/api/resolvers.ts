import { prisma } from ".prisma/client";
import { verifyOwnership } from "../verifyOwnership";
const createFieldResolver = (modelName, parName) => ({
    [parName]: async ({ id }, args, { prisma }) => {
        const modelResponse = await prisma[modelName].findUnique({ where: { id }, include: { [parName]: true } })
        return modelResponse[parName]
    }
})
export const resolvers = {
    Feed: {
        //author: ({ authorId }, args, { prisma }) => prisma.user.findUnique({ where: { id: authorId } }),
        ...createFieldResolver('feed', 'author'),
        ...createFieldResolver('feed', 'tags'),
        ...createFieldResolver('feed', 'bundles'),
        ...createFieldResolver('feed', 'likes')
    },

    Bundle: {
        //author: ({ authorId }, args, { prisma }) => prisma.user.findUnique({ where: { id: authorId } }),
        ...createFieldResolver('bundle', 'author'),
        ...createFieldResolver('bundle', 'tags'),
        ...createFieldResolver('bundle', 'feeds'),
        ...createFieldResolver('bundle', 'likes')
    },
    BundleTag: {
        ...createFieldResolver('bundleTag', 'bundles'),
    },
    FeedTag: {
        ...createFieldResolver('feedTag', 'feeds'),
    },
    SavedArticle: {
        ...createFieldResolver('savedArticle', 'author'),
        ...createFieldResolver('savedArticle', 'feed'),
    },
    User: {
        ...createFieldResolver('user', 'bundles'),
        ...createFieldResolver('user', 'feeds'),
        ...createFieldResolver('user', 'feedLikes'),
        ...createFieldResolver('user', 'bundleLikes'),
    },
    Query: {
        hello: (parent, args, ctx) => { return "hi!" },
        feed: (parent, { data: { id } }, { prisma }) => prisma.feed.findUnique({ where: { id } }),
        feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
        bundle: (parent, { data: { id } }, { prisma }) => prisma.bundle.findUnique({ where: { id } }),
        bundles: (parent, args, { prisma }) => prisma.bundle.findMany(),
        findFeedTags: (parent, { data }, { prisma }) => prisma.feedTag.findMany({ where: { name: { contains: data.search } } }),
        findBundleTags: (parent, { data }, { prisma }) => prisma.bundleTag.findMany({ where: { name: { contains: data.search } } }),
        findFeeds: (parent, { data }, { prisma }) => prisma.feed.findMany({ where: { name: { contains: data.search } } }),
        findBundles: (parent, { data }, { prisma }) => prisma.bundle.findMany({ where: { name: { contains: data.search } } }),
        savedArticle: async (parent, { data }, { prisma, user: { id: authorId } }) => {
            const { url } = data;
            const savedArticle = await prisma.savedArticle.findMany({ where: { url, authorId: authorId ? authorId : null } });
            return savedArticle[0];
        },
        savedArticles: (parent, { data }, { prisma, user: { id: authorId } }) => {
            return prisma.savedArticle.findMany({ where: { authorId } })
        },
        me: (parent, { data }, { prisma, user: { id } }) => prisma.user.findUnique({ where: { id } })

    },
    Mutation: {
        createFeed: async (parent, { data }, { prisma, user }) => {
            const author = { author: { connect: { id: user.id } } }
            return prisma.feed.create({ data: { ...data, ...author }, })
        },
        createBundle: async (parent, { data }, { prisma, user }) => {
            const author = { author: { connect: { id: user.id } } }
            const result = await prisma.bundle.create({ data: { ...data, ...author }, })
            return result;
        },
        likeBundle: async (parent, { data }, { prisma, user }) => {
            const { bundleId, likeState } = data;
            const connectState = likeState ? 'connect' : 'disconnect'
            return prisma.bundle.update({ where: { id: bundleId }, data: { likes: { [connectState]: { id: user.id } } } })

        },
        likeFeed: (parent, { data }, { prisma, user }) => {
            const { feedId, likeState } = data;
            const connectState = likeState ? 'connect' : 'disconnect'
            return prisma.feed.update({ where: { id: feedId }, data: { likes: { [connectState]: { id: user.id } } } })
        },
        updateFeed: async (parent, { data }, { prisma, user }) => {
            const { id, ...feedUpdate } = data;
            const feed = await prisma.feed.findUnique({ where: { id }, include: { author: true } });
            verifyOwnership(feed, user);
            return prisma.feed.update({ where: { id }, data: { ...feedUpdate } })
        },
        updateBundle: async (parent, { data }, { prisma, user }) => {
            const { id, ...bundleUpdate } = data;

            const bundle = await prisma.bundle.findUnique({ where: { id }, include: { author: true } });
            verifyOwnership(bundle, user);
            return prisma.bundle.update({ where: { id }, data: { ...bundleUpdate } })
        },
        createSavedArticle: async (parent, { data }, { prisma, user }) => {
            const author = { author: { connect: { id: user.id } } }
            return prisma.savedarticle.create({ data: { ...data, ...author }, })
        },
        deleteBundle: async (parent, { data }, { prisma, user }) => {
            const { id } = data;
            const bundle = await prisma.bundle.findUnique({ where: { id }, include: { author: true } });
            verifyOwnership(bundle, user);
            await prisma.bundle.delete({ where: { id: bundle.id } });
            return bundle;
        },
        deleteFeed: async (parent, { data }, { prisma, user }) => {
            const { id } = data;
            const feed = await prisma.feed.findUnique({ where: { id }, include: { author: true } });
            verifyOwnership(feed, user);
            await prisma.feed.delete({ where: { id: feed.id } });
            return feed;
        },
        deleteSavedArticle: async (parent, { data }, { prisma, user }) => {
            const { id } = data;
            const savedarticle = await prisma.savedarticle.findUnique({ where: { id }, include: { author: true } });
            verifyOwnership(savedarticle, user);
            await prisma.savedarticle.delete({ where: { id: savedarticle.id } });
            return savedarticle;
        }
    }
}