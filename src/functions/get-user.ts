import { prisma } from "../prisma/client"

interface GetUserParams {
  id: string
}

export async function getUser({ id }: GetUserParams) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true }
  })

  if (!user) {
    throw new Error("Não foi possível encontrar o usuário.")
  }

  return { user}
}