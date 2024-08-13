import { User } from '@prisma/client';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/brands`;

const getUser = async (): Promise<User[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getUser;
