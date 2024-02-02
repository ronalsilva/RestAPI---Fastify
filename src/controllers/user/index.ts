import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createUser, findUserByEmail, findUsers } from "../../services/user";
import { verifyPassword } from "../../utils/hash";
import { ResponseUser, RequestUser, RequestUserLogin } from './schema/userSchema'

async function userRoutes(server: FastifyInstance) {
	server.post(
		"/",
		{
			schema: {
				body: RequestUser,
				response: {
					201: ResponseUser,
				},
			},
		},
		async (request: FastifyRequest< { Body: any } >, reply: FastifyReply) => {
			const body = request.body;

			try {
				const user = await createUser(body);
		
				return reply.code(201).send(user);
			} catch (e) {
				console.log(e);
				return reply.code(500).send(e);
			}
        }
	);

	server.post(
		"/login",
		{
			schema: {
				body: RequestUserLogin,
				response: {
					200: { accessToken: { type: 'string'} },
				},
			},
		},
		async (request: FastifyRequest< { Body: any } >, reply: FastifyReply) => {
			const body = request.body;
			const user = await findUserByEmail(body.email);
		
			if (!user) {
				return reply.code(401).send({ message: "Invalid email or password" });
			}

			const correctPassword = verifyPassword({
				candidatePassword: body.password,
				salt: user.salt,
				hash: user.password,
			});
		
			if (correctPassword) {
				const { password, salt, ...rest } = user;
				return { accessToken: request.jwt.sign(rest) };
			}
		
			return reply.code(401).send({
				message: "Invalid email or password",
			});
        }
	);

	server.get(
		"/",
		{
			preHandler: [server.authenticate],
		},
		async (request: FastifyRequest< { Body: any } >, reply: FastifyReply) => {
			const users = await findUsers();

			return users;
        }
	);
}

export default userRoutes;
