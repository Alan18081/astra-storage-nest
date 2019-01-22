import { AccountProfile } from './profile.interface';

export class ProjectAccount {
  constructor(
    private readonly token: string,
  ) {}

  async getProfile(): Promise<AccountProfile> {
    return null;
  }

  async remove(): Promise<void> {

  }
}