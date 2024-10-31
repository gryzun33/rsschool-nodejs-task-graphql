import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { User } from './types/users.js';
import { MemberType, MemberTypeId } from './types/memberTypes.js';
import { Post } from './types/posts.js';
import { Profile } from './types/profiles.js';
import { UUIDType } from './types/uuid.js';

export const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  fields: {},
});
