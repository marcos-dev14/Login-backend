import { prisma } from "../prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { env } from "../env"

interface UserLoginParams {
  name: string
  email: string
  password: string
}

export async function userLogin({ name, email, password }: UserLoginParams) {
  const user = await prisma.user.findUnique({
    where: {
      name,
      email
    },
  })

  if (!user || !(bcrypt.compare(password, user.password))) {
    throw new Error("Credenciais inválidas")
  }

  const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: '1h' })

  const userData = {
    name: user.name,
    email: user.email,
    userId: user.id,
    userToken: token
  }

  return {
    userData
  }
}