# Projeto de Estudo - Backend com Node.js, Prisma, Docker, PostgreSQL e Fastify

Este é um projeto de estudo que implementa funcionalidades básicas de autenticação, incluindo:
- **Criação de usuário**
- **Login do usuário**
- **Busca de usuário**

## 🚀 Como Rodar o Projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/marcos-dev14/Login-backend.git
   cd Login-backend
   ```

2. **Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente:**
   ```sh
   cp .env.example .env
   ```

3. **Suba o banco de dados com Docker:**
   ```sh
   docker-compose up -d
   ```

4. **Instale as dependências:**
   ```sh
   npm install
   ```

5. **Execute as migrações do Prisma:**
   ```sh
   npx prisma migrate dev --name init
   ```

6. **Inicie o servidor:**
   ```sh
   npm run dev
   ```

## 📜 Documentação com Swagger
Este projeto utiliza **@fastify/swagger** e **@fastify/swagger-ui** para gerar automaticamente a documentação da API.

- Após iniciar o servidor, acesse a documentação no navegador:
  ```
  http://localhost:3333/docs
  ```
- Lá, você poderá visualizar e testar todas as rotas disponíveis de forma interativa.

## 🛠 Tecnologias Utilizadas
- Node.js
- Fastify
- Prisma ORM
- PostgreSQL
- Docker
- TypeScript
- Swagger (para documentação da API)

## 📄 Licença
Este projeto é apenas para fins de estudo e não possui licença específica.

---

Feito por [Marcos Paulo](https://github.com/marcos-dev14) 🚀

