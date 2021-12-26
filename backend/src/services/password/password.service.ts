import {randomBytes, scrypt} from "crypto";
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export default class PasswordService {
  static async toHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    const hashedPassword = [buf.toString("hex"), salt].join(".")

    return hashedPassword;
  }

  static async compare(storedPassword: string, suppliedPassword: string): Promise<Boolean> {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}