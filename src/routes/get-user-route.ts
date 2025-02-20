import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { getUser } from "../functions/get-user"

export const getUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.get('/user/:id', {
    schema: {
      summary: 'Rotas do usuário',
      description: 'Rota para buscar os dados usuário',
      tags: ['user'],
      params: z.object({
        id: z.string(),
      }),
      response: {
        200: z.object({
          id: z.string(),
          name: z.string(),
          email: z.string().email(),
        }),
      }
    }
  }, async (request, reply) => {
    const { id } = request.params

    const { user } = await getUser({ id })

    return reply.send(user)
  })
}