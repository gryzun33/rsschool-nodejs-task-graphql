import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import { User } from './types/users.js';
import { MemberType } from './types/memberTypes.js';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(User),
      resolve: async (_parent, _args, { prisma }) => {
        return await prisma.user.findMany();
      },
    },
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_parent, _args, { prisma }) => {
        return await prisma.memberType.findMany();
      },
    },
  },
});
