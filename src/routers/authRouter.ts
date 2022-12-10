import express, { Router, Request, Response } from 'express';

import { authService } from '../fbInstance';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from'firebase/auth';

const authRouter: Router = express.Router();

authRouter.post("/auth/login", async ( req:Request, res:Response ) => {
    const {body : {username, password}} = req;
    const data = await signInWithEmailAndPassword(authService, username, password);
    res.json({data});
});

authRouter.post("/auth/join", async ( req:Request, res:Response ) => {
    const {body: {username, password}} = req;
    const data = await createUserWithEmailAndPassword(authService, username, password);
    res.json({data});
})

authRouter.post("/auth/oauth/google", async ( req:Request, res:Response ) => {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(authService, provider);
    res.json({data});
})

authRouter.post("/auth/logout", ( req:Request, res:Response ) => {
    authService.signOut();
})

export default authRouter;