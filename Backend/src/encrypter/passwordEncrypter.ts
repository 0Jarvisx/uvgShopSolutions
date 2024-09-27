const bcrypt = require('bcrypt')

export const hashPassword = async (password: string): Promise<any> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}
