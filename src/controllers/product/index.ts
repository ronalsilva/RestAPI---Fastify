import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createProduct, getProducts } from "../../services/product";
import { ResponseProductRoutes, RequestProductRoutes } from './schema/productSchema'
async function productRoutes(server: FastifyInstance) {
	server.post(
		"/",
		{
			preHandler: [server.authenticate],
			schema: {
				body: RequestProductRoutes,
				response: {
					201: ResponseProductRoutes
				},
			},
		},
		async (request: FastifyRequest< { Body: any } >, reply: FastifyReply) => {
            try {      
				const product = await createProduct({
					...request.body,
					ownerId: request.user.id,
				});

				return product;
            } catch (err:any) {
                reply.status(err.response?.status || 500).send({ error: err.message });
            }
        }
	);

	server.get(
		"/",
		{
			schema: {
				body: RequestProductRoutes,
				response: {
					201: ResponseProductRoutes
				},
			},
		},
		async (request: FastifyRequest, reply: FastifyReply) => {
            try {      
                const events = await getProducts();
                reply.send(events);
            } catch (err:any) {
                reply.status(err.response?.status || 500).send({ error: err.message });
            }
        }
	);
}

export default productRoutes;
