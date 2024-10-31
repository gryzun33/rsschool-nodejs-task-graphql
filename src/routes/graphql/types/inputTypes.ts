import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeId } from './memberTypes.js';

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

export const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});
// export type ChangeUserInput = {
//   name?: string;
//   balance?: number;
// };

// export type CreatePostInput = {
//   title: string;
//   content: string;
//   authorId: UUID;
// };

// export type ChangePostInput = {
//   title?: string;
//   content?: string;
// };

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
  },
});

// export type ChangeProfileInput = {
//   isMale?: boolean;
//   yearOfBirth?: number;
//   memberTypeId?: MemberTypeId;
// };

// enum MemberTypeId {
//   BASIC = 'BASIC',
//   BUSINESS = 'BUSINESS',
// }

type UUID = string;
