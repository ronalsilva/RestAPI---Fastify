import { createProduct, getProducts } from './';
import prisma from '../../utils/prisma';

jest.mock('../../utils/prisma', () => ({
    product: {
        create: jest.fn(),
        findMany: jest.fn(),
    },
}));

describe('createProduct function', () => {
    it('should create a product successfully', async () => {
        const data = { title: 'Product Title', content: 'Product Content', price: 19.99, ownerId: 1 };
        await createProduct(data);
        expect(prisma.product.create).toHaveBeenCalledWith({ data });
    });
});

describe('getProducts function', () => {
    it('should get a list of products with owner information', async () => {
        const mockProducts:any = [
            {
                id: 1,
                title: 'Product1',
                content: 'Content1',
                price: 19.99,
                createdAt: new Date(),
                updatedAt: new Date(),
                owner: {
                    id: 1,
                    name: 'OwnerName',
                },
            },
        ];

        jest.spyOn(prisma.product, 'findMany').mockResolvedValue(mockProducts);

        const products = await getProducts();
        expect(products).toEqual(mockProducts);
    });
});