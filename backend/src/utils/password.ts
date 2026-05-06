import bcrypt from "bcrypt";

// Hash the password with 10 salt rounds
const saltRounds = 10;
export async function hashPassword(password: string) : Promise<string> {
    return await bcrypt.hash(password, saltRounds);
}