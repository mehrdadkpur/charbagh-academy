import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string): Promise<string | null> => {
    if (!password) return null
    return await bcrypt.hash(password, 10)
}

export const verifyPassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
}
