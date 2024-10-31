type CreateUserInput = {
  name: string;
  balance: number;
};

type ChangeUserInput = {
  name?: string;
  balance?: number;
};

type CreatePostInput = {
  title: string;
  content: string;
  authorId: UUID;
};

type ChangePostInput = {
  title?: string;
  content?: string;
};

type CreateProfileInput = {
  isMale: boolean;
  yearOfBirth: number;
  userId: UUID;
  memberTypeId: MemberTypeId;
};

type ChangeProfileInput = {
  isMale?: boolean;
  yearOfBirth?: number;
  memberTypeId?: MemberTypeId;
};

enum MemberTypeId {
  BASIC = 'BASIC',
  BUSINESS = 'BUSINESS',
}

type UUID = string;
