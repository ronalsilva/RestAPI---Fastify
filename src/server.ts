import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt, { JWT } from "fastify-jwt";
import swagger from "fastify-swagger";
import { withRefResolver } from "fastify-zod";
import userRoutes from "./controllers/user";
import productRoutes from "./controllers/product";
import eventsRoutes from "./controllers/events";
// import { userSchemas } from "./schemas/user";
// import { productSchemas } from "./schemas/product";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "fastify-jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

function buildServer() {
  const server = Fastify();

  server.register(fjwt, {
    secret: "ndkandnan78duy9sau87dbndsa89u7dsy789adb",
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });

  // for (const schema of [...userSchemas, ...productSchemas]) {
  //   server.addSchema(schema);
  // }

  server.register(
    swagger,
    withRefResolver({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Fastify API",
          description: "API for some products",
          version: '1.0.0',
        },
      },
    })
  );

  server.register(userRoutes, { prefix: "api/users" });
  server.register(productRoutes, { prefix: "api/products" });
  server.register(eventsRoutes, { prefix: "api/events" });

  return server;
}

export default buildServer;
