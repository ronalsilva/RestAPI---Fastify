export const ResponseProductRoutes = {
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

export const RequestProductRoutes = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        price: { type: 'number' },
        content: { type: 'string' },
    }
}