import bcrypt from 'bcrypt';

export default class PasswordHasher {
  async hash(password, rounds = 9) {
    return bcrypt.hash(password, rounds);
  }

  async compare(password, hashed) {
    return bcrypt.compare(password, hashed);
  }
}
