import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider
} from "fastify-type-provider-zod"
import { z } from "zod"
import { env } from "./env"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: true,
})

app.post('/users', {
  schema: {
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

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})