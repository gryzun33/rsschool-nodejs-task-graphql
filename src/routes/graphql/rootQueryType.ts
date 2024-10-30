import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { User } from './types/users.js';
import { MemberType } from './types/memberTypes.js';
import { Post } from './types/posts.js';
import { Profile } from './types/profiles.js';
import { UUIDType } from './types/uuid.js';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(User),
      resolve: async (_parent, _args, { prisma }) => {
        return await prisma.user.findMany();
      },
    },
    user: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_parent, { id }, { prisma }) => {
        return await prisma.user.findUnique({
          where: { id },
        });
      },
    },
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_parent, _args, { prisma }) => {
        return await prisma.memberType.findMany();
      },
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_parent, { id }, { prisma }) => {
        return await prisma.memberType.findUnique({
          where: { id },
        });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(Post)),
      resolve: async (_parent, _args, { prisma }) => {
        return await prisma.post.findMany();
      },
    },
    post: {
      type: Post,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, { id }, { prisma }) => {
        return await prisma.post.findUnique({
          where: { id },
        });
      },
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(Profile)),
      resolve: async (_parent, _args, { prisma }) => {
        return await prisma.profile.findMany();
      },
    },
    profile: {
      type: Profile,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, { id }, { prisma }) => {
        return await prisma.profile.findUnique({
          where: { id },
        });
      },
    },
  },
});
