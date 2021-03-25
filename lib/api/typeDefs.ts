import { gql } from "apollo-server-micro";

export const typeDefs = gql`
type Feed {
    id: String
    name: String
    url: String
}
input FeedInput {
    id: String
}
input FeedCreateInput {
    id: String
    name: String
    url: String
}
type Bundle {
    id: String
    name: String
    description: String
}
input BundleInput {
    id: String
}
input BundleCreateInput {
    id: String
    name: String
    description: String
}
type Query {
    hello: String
    feed(data: FeedInput): Feed
    bundle(data: BundleInput): Bundle
    feeds: [Feed]
    bundles: [Bundle]
}
type Mutation {
    createFeed(data: FeedCreateInput): Feed
    createBundle(data: BundleCreateInput): Bundle
}
`;