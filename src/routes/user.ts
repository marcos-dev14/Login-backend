import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

export const user: FastifyPluginAsyncZod = async (app) => {
  app.post('/users', {
    schema: {
      summary: 'Rotas do usuário',
      description: 'Rota para criação de um novo usuário',
      tags: ['user'],
      body: z.object({
        name: z.string(),
        email: z.string().email(),
      }),
      response: {
        201: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
      }
    }
  }, async (request, reply) => {
    const { name, email } = request.body
  
    // Criação da inscrição no banco de dados
  
    return reply.status(201).send({ name, email })
  })
}