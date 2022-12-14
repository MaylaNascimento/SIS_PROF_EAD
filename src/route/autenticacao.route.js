import { Router } from "express";
import app from "../app";
import { login, logoff } from "../controller/autenticacao.controller.js";

const auth = Router();

app.post("/login", login);
app.post("/logoff", logoff);

export default auth;