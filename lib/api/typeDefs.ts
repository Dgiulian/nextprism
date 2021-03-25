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
}
type Mutation {
    createFeed(data: FeedCreateInput): Feed
    createBundle(data: BundleCreateInput): Bundle
    likeBundle(data: LikeBundleInput): Bundle
    likeFeed(data: LikeFeedInput): Feed
}
`;