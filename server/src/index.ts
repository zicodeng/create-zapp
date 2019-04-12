import { ApolloServer, mergeSchemas } from 'apollo-server-express';
import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import blogSchema from './blog/schema';

const NODE_ENV = process.env.NODE_ENV as string;
const CLIENT_ADDR = process.env.CLIENT_ADDR as string;
const SERVER_ADDR = process.env.SERVER_ADDR as string;

(() => {
  const [clientHost, clientPort] = CLIENT_ADDR.split(':');
  const clientPortNum = parseInt(clientPort, 10);
  const clientURL = `http://${clientHost}:${clientPortNum}`;

  const [serverHost, serverPort] = SERVER_ADDR.split(':');
  const serverPortNum = parseInt(serverPort, 10);
  const serverURL = `http://${serverHost}:${serverPortNum}`;

  // Create an express server
  const app = express();

  // Apply express server middleware
  app.use(helmet());
  app.use(
    cors({
      origin: [clientURL],
    }),
  );

  // Create an Apollo server wrapper
  const server = new ApolloServer({
    schema: mergeSchemas({
      schemas: [blogSchema],
    }),
  });
  server.applyMiddleware({
    app,
  });

  app.listen(
    {
      host: serverHost,
      port: serverPortNum,
    },
    () => {
      console.log(chalk.green('🚀  Server ready at ') + chalk.blue(serverURL));
      if (NODE_ENV === 'development') {
        console.log(
          chalk.green('GraphQL Playground ready at ') +
            chalk.blue(`${serverURL}/graphql`),
        );
      }
    },
  );
})();
