import { prisma } from ".prisma/client";
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
        ...createFieldResolver('feed', 'bundles')
    },

    Bundle: {
        //author: ({ authorId }, args, { prisma }) => prisma.user.findUnique({ where: { id: authorId } }),
        ...createFieldResolver('bundle', 'author'),
        ...createFieldResolver('bundle', 'tags'),
        ...createFieldResolver('bundle', 'feeds'),
    },
    BundleTag: {
        ...createFieldResolver('bundleTag', 'bundles'),
    },
    FeedTag: {
        ...createFieldResolver('feedTag', 'feeds'),
    },
    Query: {
        hello: (parent, args, ctx) => { return "hi!" },
        feed: (parent, { data: { id } }, { prisma }) => prisma.feed.findUnique({ where: { id } }),
        feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
        bundle: (parent, { data: { id } }, { prisma }) => prisma.bundle.findUnique({ where: { id } }),
        bundles: (parent, args, { prisma }) => prisma.bundle.findMany(),
    },
    Mutation: {
        createFeed: async (parent, { data }, { prisma, user }) => {
            const author = { author: { connect: { id: user.id } } }
            console.log({ user, author, data })
            const result = await prisma.feed.create({ data: { ...data, ...author }, })
            return result;

        },
        createBundle: async (parent, { data }, { prisma, user }) => {
            const author = { author: { connect: { id: user.id } } }
            console.log({ user, author, data })
            const result = await prisma.bundle.create({ data: { ...data, ...author }, })
            return result;
        },

    }
}