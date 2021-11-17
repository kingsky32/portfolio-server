import * as bcryptjs from 'bcryptjs';

export type GenerateType = string | Error;

export const generate = (password: string): Promise<GenerateType> => {
  return new Promise((resolve, reject) => {
    bcryptjs.genSalt(10, (_, salt) => {
      bcryptjs.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export type CompareType = boolean | Error;

export const compare = (password, hashPassword): Promise<CompareType> => {
  return new Promise((resolve, reject) => {
    bcryptjs.compare(password, hashPassword, (err, success) => {
      if (err) {
        reject(err);
      }
      resolve(success);
    });
  });
};

const bcrypt = { generate, compare };

export default bcrypt;
