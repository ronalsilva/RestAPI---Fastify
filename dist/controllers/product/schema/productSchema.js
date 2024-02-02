"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestProductRoutes = exports.ResponseProductRoutes = void 0;
exports.ResponseProductRoutes = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        price: { type: 'number' },
        content: { type: 'string' },
        id: { type: 'number' },
        createdAt: { type: 'number' },
        updatedAt: { type: 'number' },
    }
};
exports.RequestProductRoutes = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        price: { type: 'number' },
        content: { type: 'string' },
    }
};
