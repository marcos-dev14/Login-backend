import { prisma } from "../prisma/client"

interface RegisterUserParams {
  name: string
  email: string
  password: string
}

export async function registerUser({ name, email, password }: RegisterUserParams) {
  const user = await prisma.user.create({
    data: { name, email, password }
  })
  
  return { user }
}