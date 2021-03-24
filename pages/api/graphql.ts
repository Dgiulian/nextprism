import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-micro";
import { applyMiddleware } from "graphql-middleware";
import Cors from 'micro-cors';
import { log } from "../../lib/api/log";
import { permissions } from "../../lib/api/permissions";
import { resolvers } from "../../lib/api/resolvers";
import { typeDefs } from "../../lib/api/typeDefs";
import { context } from '../../lib/api/context';

const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }), log, permissions)
const handler = new ApolloServer({
    schema,
    context
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