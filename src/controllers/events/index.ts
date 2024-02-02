import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getEvents } from "../../services/events";

async function eventsRoutes(server: FastifyInstance) {
	server.get(
		"/events/:country",
		{
			schema: {
                params: { country: { type: 'string' } },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            events: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        type: { type: 'string' },
                                        id: { type: 'string' },
                                        test: { type: 'boolean' },
                                        url: { type: 'string' },
                                        locale: { type: 'string' },
                                        images: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    ratio: { type: 'string' },
                                                    url: { type: 'string' },
                                                    width: { type: 'integer' },
                                                    height: { type: 'integer' },
                                                    fallback: { type: 'boolean' },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },

			},
		},
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const params:any = request.params;
        
                const events = await getEvents(params.country);
                reply.send(events);
            } catch (err:any) {
                reply.status(err.response?.status || 500).send({ error: err.message });
            }
        }
	);
}

export default eventsRoutes;
