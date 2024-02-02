# Descrição
Este é um projeto de APIs REST baseado em Fastify, Prisma, PostgreSQL, Swagger, TypeScript, Docker e Jest. O objetivo é fornecer uma estrutura sólida para o desenvolvimento de APIs escaláveis e de fácil manutenção.

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Arquitetura

- src
- - controllers
- - - Events
- - - Users
- - services
- - - Events
- - - Users
- - utils
- - integration
- - server.ts
- - app.ts

- src: O diretório principal do código-fonte.
- controllers: Contém pastas para cada controlador.
- services: Contém pastas para cada serviço.
- utils: Utilitários compartilhados.
- schemas: Definições de esquemas de dados.
- integration: Testes de integração.
- index.ts: Ponto de entrada do aplicativo.
- app.ts: Configuração do aplicativo Fastify.

## Pré-requisitos

Certifique-se de ter o Node.js, Docker instalados no seu sistema.

## Instalação

```sh
npm install
docker-compose up -d
npx prisma db push (caso nao tenha o prisma instalado, rodar o comando - npm install @prisma/client)
```

### Rodar o projeto

```sh
.vscode configurado, pode rodar precisonando o F5, o projeto iria realizar o build.
npm run dev
npm run build
npm run start
```

Abrir a URL para rodar o swagger - http://localhost:3000/docs

## ENV

```sh
DATABASE_URL="postgresql://postgres:admin@localhost:5432/database"
TICKETMASTER_KEY="4sKN9vuw7fEwxb65GLA2bYLSXkDC7FR9"
```

