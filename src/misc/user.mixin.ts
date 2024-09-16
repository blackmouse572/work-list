import { faker } from '@faker-js/faker';
import type { User } from '@models/user';

export function generateUsers(amount: number = 10) {
  const users: User[] = [];

  for (let i = 0; i < amount; i++) {
    users.push({
      id: faker.database.mongodbObjectId(),
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
      createdAt: faker.date.past(),
      email: faker.internet.email(),
      role: 'user',
      status: 'active',
      updatedAt: faker.date.recent(),
    });
  }

  return users;
}
