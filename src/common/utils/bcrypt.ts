import * as bcryptjs from 'bcryptjs';

export const generate = (password: string): Promise<string> => {
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

export const compare = (password, hashPassword): Promise<boolean> => {
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
