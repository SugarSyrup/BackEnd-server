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
const express_1 = __importDefault(require("express"));
const fbInstance_1 = require("../fbInstance");
const auth_1 = require("firebase/auth");
const authRouter = express_1.default.Router();
authRouter.post("/auth/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: { username, password } } = req;
    const data = yield (0, auth_1.signInWithEmailAndPassword)(fbInstance_1.authService, username, password);
    res.json({ data });
}));
authRouter.post("/auth/join", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: { username, password } } = req;
    const data = yield (0, auth_1.createUserWithEmailAndPassword)(fbInstance_1.authService, username, password);
    res.json({ data });
}));
authRouter.post("/auth/oauth/google", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new auth_1.GoogleAuthProvider();
    const data = yield (0, auth_1.signInWithPopup)(fbInstance_1.authService, provider);
    res.json({ data });
}));
authRouter.post("/auth/logout", (req, res) => {
    fbInstance_1.authService.signOut();
});
exports.default = authRouter;
