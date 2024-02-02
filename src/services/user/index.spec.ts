import { createUser, findUserByEmail, findUsers } from './';
import prisma from '../../utils/prisma';

// Mockar o objeto prisma para evitar chamadas reais ao banco de dados
jest.mock('../../utils/prisma', () => ({
    user: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
    },
}));

describe('createUser function', () => {
    it('should create a user successfully', async () => {
        const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
        await createUser(userData);
        expect(prisma.user.create).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({
                    name: 'John Doe',
                    email: 'john@example.com',
                }),
            })
        );
    });
});

describe('findUserByEmail function', () => {
    it('should find a user by email', async () => {
        const userEmail = 'john@example.com';
        const mockUser:any = { id: 1, name: 'John Doe', email: userEmail };
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);

        const user = await findUserByEmail(userEmail);
        expect(user).toEqual(mockUser);
    });
});

describe('findUsers function', () => {
    it('should find a list of users with specified fields', async () => {
        const mockUsers:any = [
            { id: 1, name: 'User1', email: 'user1@example.com' },
            { id: 2, name: 'User2', email: 'user2@example.com' },
            // Add more mock users as needed
        ];
        jest.spyOn(prisma.user, 'findMany').mockResolvedValue(mockUsers);

        const users = await findUsers();
        expect(users).toEqual(mockUsers);
    });
});