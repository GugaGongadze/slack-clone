import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers')),
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({ models, user: { id: 1 } }),
});

const app = express();

app.use(cors('*'));

server.applyMiddleware({ app });

models.sequelize.sync().then(() => {
  app.listen({ port: 4000 }, () => console.log( // eslint-disable-line no-console
    `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
  ));
});
