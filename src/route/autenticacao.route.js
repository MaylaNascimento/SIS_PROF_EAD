import { Router } from "express";
import { login, logoff } from "../controller/autenticacao.controller.js";

const auth = Router();

auth.post("/login", login);
auth.post("/logoff", logoff);

export default auth;