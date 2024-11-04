import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLSchema, validate, parse } from 'graphql';
import { RootQueryType } from './types/rootQueryType.js';
import { MutationType } from './types/mutationType.js';
import depthLimit from 'graphql-depth-limit';

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req, reply) {
      const { query, variables } = req.body;
      const parsedQuery = parse(query);
      const validationErrors = validate(schema, parsedQuery, [depthLimit(5)]);

      if (validationErrors.length > 0) {
        return reply.status(400).send({ errors: validationErrors });
      }

      const result = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: { prisma },
      });

      if (result.errors) {
        reply.status(500).send({ errors: result.errors });
      } else {
        reply.send(result);
      }
    },
  });
};

export default plugin;
