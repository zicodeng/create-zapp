import { makeExecutableSchema } from 'apollo-server-express';

import resolvers from './resolvers';
import typeDefs from './type-defs';

const userSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default userSchema;
