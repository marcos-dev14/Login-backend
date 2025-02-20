import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import bcrypt from 'bcrypt'
import { userLogin } from "../functions/user-login"

export const userLoginRoute: FastifyPluginAsyncZod = async (app) => {
  app.post('/login', {
    schema: {
      summary: 'Rotas do usuário',
      description: 'Rota para criação de um novo usuário',
      tags: ['user'],
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(4),
      }),
      response: {
        201: z.object({
          userToken: z.string()
        }),
      }
    }
  }, async (request, reply) => {
    const { name, email, password } = request.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const { userToken } = await userLogin({ name, email, password: hashedPassword })

    return reply.status(201).send({ userToken })
  })
}