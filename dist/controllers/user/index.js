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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../services/user");
const hash_1 = require("../../utils/hash");
const userSchema_1 = require("./schema/userSchema");
function userRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.post("/", {
            schema: {
                body: userSchema_1.RequestUser,
                response: {
                    201: userSchema_1.ResponseUser,
                },
            },
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            try {
                const user = yield (0, user_1.createUser)(body);
                return reply.code(201).send(user);
            }
            catch (e) {
                console.log(e);
                return reply.code(500).send(e);
            }
        }));
        server.post("/login", {
            schema: {
                body: userSchema_1.RequestUserLogin,
                response: {
                    200: { accessToken: { type: 'string' } },
                },
            },
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            const user = yield (0, user_1.findUserByEmail)(body.email);
            if (!user) {
                return reply.code(401).send({ message: "Invalid email or password" });
            }
            const correctPassword = (0, hash_1.verifyPassword)({
                candidatePassword: body.password,
                salt: user.salt,
                hash: user.password,
            });
            if (correctPassword) {
                const { password, salt } = user, rest = __rest(user, ["password", "salt"]);
                return { accessToken: request.jwt.sign(rest) };
            }
            return reply.code(401).send({
                message: "Invalid email or password",
            });
        }));
        server.get("/", {
            preHandler: [server.authenticate],
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const users = yield (0, user_1.findUsers)();
            return users;
        }));
    });
}
exports.default = userRoutes;
