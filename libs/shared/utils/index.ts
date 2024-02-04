import crypto from 'crypto';

export class KeyGen {
  private key;
  private algorithm;
  constructor() {
    this.key = this.createKey();
    this.algorithm = 'aes-256-ctr';
  }

  createKey = () => {
    const str =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$%&/()=?^"!|[]{}*+-:.;,_@#<>';
    return str
      .split('')
      .sort(() => {
        return Math.random() - 0.5;
      })
      .join('');
  };
  cypher(str: string) {
    const sha256 = crypto.createHash('sha256');
    sha256.update(this.key);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, sha256.digest(), iv);
    const ciphertext = cipher.update(Buffer.from(str));
    const encrypted = Buffer.concat([iv, ciphertext, cipher.final()]).toString(
      'base64',
    );
    return encrypted;
  }

  decypher(enc: string) {
    const sha256 = crypto.createHash('sha256');
    sha256.update(this.key);
    const input = Buffer.from(enc, 'base64');
    const iv = input.subarray(0, 16);
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      sha256.digest(),
      iv,
    );
    const ciphertext = input.subarray(16);
    const plaintext = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]).toString();
    return plaintext;
  }
}
