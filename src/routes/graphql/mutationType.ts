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
  ChangeUserInput,
  ChangeProfileInput,
  ChangePostInput,
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
    deleteUser: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_parent, { id }, { prisma }) => {
        await prisma.user.delete({
          where: { id },
        });
        return `User with ID ${id} removed successfully`;
      },
    },
    deletePost: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_parent, { id }, { prisma }) => {
        await prisma.post.delete({
          where: { id },
        });
        return `Post with ID ${id} removed successfully`;
      },
    },
    deleteProfile: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_parent, { id }, { prisma }) => {
        await prisma.profile.delete({
          where: { id },
        });
        return `Profile with ID ${id} removed successfully`;
      },
    },
    changeUser: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (_parent, { id, dto }, { prisma }) => {
        const user = await prisma.user.update({
          where: { id },
          data: {
            ...dto,
          },
        });
        return user;
      },
    },
    changeProfile: {
      type: Profile,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (_parent, { id, dto }, { prisma }) => {
        const profile = await prisma.profile.update({
          where: { id },
          data: {
            ...dto,
          },
        });
        return profile;
      },
    },
    changePost: {
      type: Post,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: async (_parent, { id, dto }, { prisma }) => {
        const post = await prisma.post.update({
          where: { id },
          data: {
            ...dto,
          },
        });
        return post;
      },
    },
  },
});
