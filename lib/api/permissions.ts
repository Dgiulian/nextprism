import { rule, shield } from "graphql-shield";
import * as _ from 'lodash';
const rules = {
    isAuthenticated: rule()(async (_parent, _args, _ctx) => _.isEmpty(_ctx.user) ? false : true)
}
export const permissions = shield({
    Query: {
        hello: rules.isAuthenticated
    }
})