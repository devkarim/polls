import bcrypt, { compare } from 'bcrypt';

export const hashString = (str: string) => {
  return bcrypt.hash(str, 10);
};

export const compareString = (str: string, hash: string) => {
  return bcrypt.compare(str, hash);
};

export const checkOneHashInHashes = async (str: string, hashes: string[]) => {
  for (const hash of hashes) {
    const success = await compareString(str, hash);
    if (success) return true;
  }
  return false;
};
