import { makeExecutableSchema } from "@graphql-tools/schema"
import { ApolloServer } from "apollo-server-micro"
import { resolvers } from "../../lib/api/resolvers"
import { typeDefs } from "../../lib/api/typeDefs"
import Cors from 'micro-cors';

const schema = makeExecutableSchema({ typeDefs, resolvers })
const handler = new ApolloServer({
    schema
}).createHandler({ path: '/api/graphql' })
const cors = Cors();
export const config = {
    api: {
        bodyParser: false
    }
}
export default cors((req, res) => {
    if (req.method === 'OPTIONS') {
        return res.status(200).send();
    }
    return handler(req, res)
});
// export default handler;