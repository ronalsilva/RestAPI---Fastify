import { object } from "zod"

export const ResponseUser = {
    email: { type: 'string'},
    password: { type: 'string'},
    name: { type: 'string'},
}

export const RequestUser = {
    id: { type: 'number'},
    email: { type: 'string'},
    name: { type: 'string'},
}

export const RequestUserLogin = {
    email: { type: 'string'},
    password: { type: 'string'}
}