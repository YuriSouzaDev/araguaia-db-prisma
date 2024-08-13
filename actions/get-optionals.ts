import { Optional } from '@prisma/client';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/brands`;

const getOptinals = async (): Promise<Optional[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getOptinals;
