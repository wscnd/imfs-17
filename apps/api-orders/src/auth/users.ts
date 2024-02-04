// TODO: create user

export type TUsers = {
  id: number;
  username: string;
  password: string;
};

export const Users: Array<TUsers> = [
  { id: 1337, username: 'user', password: 'user' },
  { id: 2496, username: 'user2', password: 'user2' },
];
