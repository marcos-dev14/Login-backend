import { prisma } from "../prisma/client"

interface RegisterUserParams {
  name: string
  email: string
  password: string
}

export async function registerUser({ name, email, password }: RegisterUserParams) {
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error('Já existe um usuário com este email')
  }

  const user = await prisma.user.create({
    data: { name, email, password }
  })
  
  return { user }
}