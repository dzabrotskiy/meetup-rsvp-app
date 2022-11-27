import type { User } from 'screens/UsersScreen/types';

export function findUsersByNameAndLocality(users: User[], filter: string) {
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.locality.toLowerCase().includes(filter.toLowerCase())
  );
}
