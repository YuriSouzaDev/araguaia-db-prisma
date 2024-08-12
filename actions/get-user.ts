import { User } from '@prisma/client';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/brands`;

const getBrands = async (): Promise<User[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getBrands;
