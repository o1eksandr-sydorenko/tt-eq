import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { json } from 'body-parser';
import { createServer } from 'http';
import { AppDataSource, resolvers } from './config';
import { buildSchema } from 'type-graphql';

async function startServer(): Promise<void> {
  const app = express();
  const httpServer = createServer(app);

  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers,
    validate: true,
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: '*',
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ ...req }),
    }),
  );

  app.listen(4000, () => {
    console.log('🚀 Server ready at http://localhost:4000/graphql');
  });
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
