import { findUsersByNameAndLocality } from '../findUsersByNameAndLocality';
import users from '../../../mock/users.json';

it('should find correct user by name', () => {
  const [filteredUser] = findUsersByNameAndLocality(users, 'laureen');
  expect(filteredUser.name).toBe('Laureen Cutten');
});

it('should find correct user by full name', () => {
  const [filteredUser] = findUsersByNameAndLocality(users, 'laureen cutten');
  expect(filteredUser.name).toBe('Laureen Cutten');
});

it('should find correct user by first name (all capital)', () => {
  const [filteredUser] = findUsersByNameAndLocality(users, 'LAUREEN');
  expect(filteredUser.name).toBe('Laureen Cutten');
});

it('should find correct user by last name (all capital)', () => {
  const [filteredUser] = findUsersByNameAndLocality(users, 'CUTTEN');
  expect(filteredUser.name).toBe('Laureen Cutten');
});

it('should find correct users by locality and name', () => {
  const filteredUsers = findUsersByNameAndLocality(users, 'United');
  // 30 is from the United States and 1 name
  expect(filteredUsers.length).toBe(31);
});

it('should find users by locality', () => {
  const filteredUsers = findUsersByNameAndLocality(users, 'Poland');
  filteredUsers.forEach(user => {
    expect(user.locality).toBe('Poland');
  })
})
