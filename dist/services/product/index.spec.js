"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const prisma_1 = __importDefault(require("../../utils/prisma"));
jest.mock('../../utils/prisma', () => ({
    product: {
        create: jest.fn(),
        findMany: jest.fn(),
    },
}));
describe('createProduct function', () => {
    it('should create a product successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: 'Product Title', content: 'Product Content', price: 19.99, ownerId: 1 };
        yield (0, _1.createProduct)(data);
        expect(prisma_1.default.product.create).toHaveBeenCalledWith({ data });
    }));
});
describe('getProducts function', () => {
    it('should get a list of products with owner information', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProducts = [
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
        jest.spyOn(prisma_1.default.product, 'findMany').mockResolvedValue(mockProducts);
        const products = yield (0, _1.getProducts)();
        expect(products).toEqual(mockProducts);
    }));
});
