import { GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType } from './memberTypes.js';

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (parent, _args, { prisma }) =>
        await prisma.memberType.findUnique({ where: { id: parent.memberTypeId } }),
    },
  },
});
