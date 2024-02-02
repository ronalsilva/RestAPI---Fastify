import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
// import { CreateProductInput } from "../../schemas/product";
import { createProduct, getProducts } from "../../services/product";
async function productRoutes(server: FastifyInstance) {
	server.post(
		"/",
		{
			preHandler: [server.authenticate],
			schema: {
				body: {
					type: 'object',
					properties: {
						title: { type: 'string' },
						price: { type: 'number' },
						content: { type: 'string' },
					}
				},
				response: {
					201: {
						type: 'object',
						properties: {
							title: { type: 'string' },
							price: { type: 'number' },
							content: { type: 'string' },
							id: { type: 'number' },
							createdAt: { type: 'number' },
							updatedAt: { type: 'number' },
						}
					}
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
				body: {
					type: 'object',
					properties: {
						title: { type: 'string' },
						price: { type: 'number' },
						content: { type: 'string' },
					}
				},
				response: {
					201: {
						type: 'object',
						properties: {
							title: { type: 'string' },
							price: { type: 'number' },
							content: { type: 'string' },
							id: { type: 'number' },
							createdAt: { type: 'number' },
							updatedAt: { type: 'number' },
						}
					}
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
