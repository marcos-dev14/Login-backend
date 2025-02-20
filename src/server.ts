import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform
} from "fastify-type-provider-zod"
import { env } from "./env"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import { registerUserRoute } from "./routes/register-user-route"
import { userLoginRoute } from "./routes/user-login-route"
import { getUserRoute } from "./routes/get-user-route"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Login',
      version: '0.0.1',
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.register(fastifyCors, {
  origin: true,
})

app.register(registerUserRoute)
app.register(userLoginRoute)
app.register(getUserRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})