import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLFloat,
  GraphQLInputObjectType,
} from 'graphql';
import { User } from './types/users.js';
import { MemberType, MemberTypeId } from './types/memberTypes.js';
import { Post } from './types/posts.js';
import { Profile } from './types/profiles.js';
import { UUIDType } from './types/uuid.js';
import {
  CreateUserInput,
  CreatePostInput,
  CreateProfileInput,
} from './types/inputTypes.js';
import { randomUUID } from 'crypto';
import { title } from 'process';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: new GraphQLNonNull(User),
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInput) },
      },
      resolve: async (_parent, { dto }, { prisma }) => {
        const user = await prisma.user.create({
          data: {
            name: dto.name,
            balance: dto.balance,
          },
        });
        return user;
      },
    },
    createPost: {
      type: new GraphQLNonNull(Post),
      args: {
        dto: { type: new GraphQLNonNull(CreatePostInput) },
      },
      resolve: async (_parent, { dto }, { prisma }) => {
        const post = await prisma.post.create({
          data: {
            title: dto.title,
            content: dto.content,
            authorId: dto.authorId,
          },
        });
        return post;
      },
    },
    createProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInput) },
      },
      resolve: async (_source, { dto }, { prisma }) => {
        const profile = await prisma.profile.create({
          data: {
            ...dto,
          },
        });
        return profile;
      },
    },
  },
});
