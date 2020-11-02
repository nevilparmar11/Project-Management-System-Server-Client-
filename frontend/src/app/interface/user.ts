export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  issueIds: string[];
  token : string,
}
