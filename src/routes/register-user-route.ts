import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { registerUser } from "../functions/register-user"
import bcrypt from 'bcrypt'

export const registerUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.post('/register', {
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
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(4),
        }),
      }
    }
  }, async (request, reply) => {
    const { name, email, password } = request.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const { user } = await registerUser({ name, email, password: hashedPassword })

    return reply.status(201).send(user)
  })
}