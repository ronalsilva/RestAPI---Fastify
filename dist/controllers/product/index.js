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
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../services/product");
const productSchema_1 = require("./schema/productSchema");
function productRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.post("/", {
            preHandler: [server.authenticate],
            schema: {
                body: productSchema_1.RequestProductRoutes,
                response: {
                    201: productSchema_1.ResponseProductRoutes
                },
            },
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const product = yield (0, product_1.createProduct)(Object.assign(Object.assign({}, request.body), { ownerId: request.user.id }));
                return product;
            }
            catch (err) {
                reply.status(((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) || 500).send({ error: err.message });
            }
        }));
        server.get("/", {
            schema: {
                body: productSchema_1.RequestProductRoutes,
                response: {
                    201: productSchema_1.ResponseProductRoutes
                },
            },
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            try {
                const events = yield (0, product_1.getProducts)();
                reply.send(events);
            }
            catch (err) {
                reply.status(((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) || 500).send({ error: err.message });
            }
        }));
    });
}
exports.default = productRoutes;
