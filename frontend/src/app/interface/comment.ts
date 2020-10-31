import { User } from './user';

export class Comment {
  constructor(issueId: string, user: User) {
    const now = new Date();
    this._id = `${now.getTime()}`;
    this.issueId = issueId;
    this.user = user;
    this.createdAt = now.toISOString();
    this.updatedAt = now.toISOString();
  }

  _id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  issueId: string;
  userId: string;
  // mapped to display by userId
  user: User;
}
