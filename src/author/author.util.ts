import * as argon2 from 'argon2';

export const generateRandomNumber = (
    min: number,
    max: number
): number => Math.floor(Math.random() * (max + 1) + min);

export const generateSalt = (
    saltLength: number = 8
): string => {
    const salt: string[] = [];
    if (saltLength !== 0) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!?@#$%&^*()[]{}_-+<>';
      for (let index = 0; index < saltLength; index++) {
        salt.push(chars[generateRandomNumber(0, chars.length - 1)]);
      }
    }
    return salt.join('');
}
  
export const hashPassword = (
    password: string,
    saltLength: number = 8
): Promise<{ hash:string, salt:string }> => {
    return new Promise((resolve, reject) => {
        if (!password) reject('No password passed');
        const salt = generateSalt(saltLength);
        argon2.hash(password + salt, { type: argon2.argon2i })
        .then((hash) => {
            resolve({ hash, salt });
        })
        .catch((error) => {
            reject(error);
        })
    });
};

export const verifyHashedPassword = (hash: string, password: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (!hash || !password) reject('there is empty required arguments');
        argon2.verify(hash, password, { type: argon2.argon2i })
        .then(resolve)
        .catch(reject)
    });
};
