import { gql } from "apollo-server-micro";

export const typeDefs = gql`
type Feed {
    id: String
    name: String
    url: String
    author: User
    tags: [FeedTag]
    bundles: [Bundle]
    likes: [User]
    savedArticles: [SavedArticle]
}
type FeedTag {
    id: String
    name: String
    feeds: [Feed]
}
type BundleTag {
    id: String
    name: String
    bundles: [Bundle]
}
input FeedInput {
    id: String
}
input FeedCreateInput {
    id: String
    name: String
    url: String
    tags: NestedFeedTagCreateInput
}
input NestedFeedTagCreateInput {
     create: [FeedTagCreateInput]
     connect: [ FeedTagWhereUniqueInput ]
}
input FeedTagCreateInput {
    id: String
    name: String
}
input FeedTagWhereUniqueInput {
    id: String
    name: String
}
type Bundle {
    id: String
    name: String
    description: String
    author: User
    tags: [BundleTag]
    feeds: [Feed]
    likes: [User]
}
type User {
    id: String
    auth0: String
    nickname: String
    picture: String
    bundles: [Bundle]
    feeds:  [Feed]
    feedLikes: [Feed]
    bundleLikes: [Feed]
}
type SavedArticle {
    id: String
    author: User
    url: String
    content: JSON
    feed: Feed
}

input SavedArticleInput {
    url: String
}
scalar JSON
input SavedArticleCreateInput {
    id: String
    feed: NestedFeedCreateInput
    content: JSON
    url: String
}
input NestedFeedCreateInput {
    connect: FeedWhereUniqueInput
}

input LikeBundleInput {
    bundleId: String
    likeState: Boolean
}
input LikeFeedInput {
    feedId: String
    likeState: Boolean
}
input BundleInput {
    id: String
}
input BundleCreateInput {
    id: String
    name: String
    description: String
    tags: NestedBundleTagCreateInput
    feeds: NestedBundleFeedCreateInput
}
input NestedBundleTagCreateInput {
     create: [BundleTagCreateInput]
     connect: [ BundleTagWhereUniqueInput ]
}
input BundleTagCreateInput {
    id: String
    name: String
}
input BundleTagWhereUniqueInput {
    id: String
    name: String
}
input NestedBundleFeedCreateInput {
    create: [FeedCreateInput]
     connect: [ FeedWhereUniqueInput ]
}
input FeedWhereUniqueInput {
    id: String
    url: String
}
input FindFeedTagInput {
    search: String
}
input FindBundleTagInput {
    search: String
}
input FindFeedsInput {
    search: String
}
input FindBundlesInput {
    search: String
}
input FeedUpdateInput {
    id: String
    url: String
    name: String
    tag: NestedFeedTagUpdateInput
}
input NestedFeedTagUpdateInput {
    create: [FeedTagCreateInput]
    connect: [FeedTagWhereUniqueInput]
    disconnect: [ FeedTagWhereUniqueInput]
}
input BundleUpdateInput {
    id: String
    name: String
    description: String
    tag: NestedBundleTagUpdateInput
    feeds: NestedBundleFeedUpdateInput
}
input NestedBundleTagUpdateInput {
    create: [BundleTagCreateInput]
    connect: [BundleTagWhereUniqueInput]
    disconnect: [ BundleTagWhereUniqueInput]
}
input NestedBundleFeedUpdateInput {
    create: [FeedCreateInput]
    connect: [FeedWhereUniqueInput]
    disconnect: [ FeedWhereUniqueInput]
}

input DeleteSavedArticleInput {
    id: String
}
type Query {
    hello: String
    feed(data: FeedInput): Feed
    bundle(data: BundleInput): Bundle
    feeds: [Feed]
    bundles: [Bundle]
    findFeedTags(data: FindFeedTagInput): FeedTag
    findBundleTags(data: FindBundleTagInput): BundleTag
    findFeeds(data: FindFeedsInput): [Feed]
    findBundles(data: FindBundlesInput):[Bundle]
    savedArticle(data: SavedArticleInput): SavedArticle
    savedArticles: [SavedArticle]

    me: User
}
type Mutation {
    createFeed(data: FeedCreateInput): Feed
    createBundle(data: BundleCreateInput): Bundle
    likeBundle(data: LikeBundleInput): Bundle
    likeFeed(data: LikeFeedInput): Feed
    createSavedArticle(data: SavedArticleCreateInput):SavedArticle
    updateFeed(data: FeedUpdateInput): Feed
    updateBundle(data: BundleUpdateInput): Bundle
    deleteBundle(data: BundleInput): Bundle
    deleteFeed(data: FeedInput): Feed
    deleteSavedArticle(data: DeleteSavedArticleInput): SavedArticle
}
`;